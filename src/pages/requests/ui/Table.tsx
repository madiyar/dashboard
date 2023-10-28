import dayjs from 'dayjs'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  FilterFn,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import { IRequest } from "@/shared/store/types"
import { useGetCitiesQuery } from '@/shared/store/requests';
import { useEffect, useMemo } from 'react';
import { EditIcon, TrashIcon } from '@/shared/icons';

interface TableProps {
  data?: IRequest[];
  inputText: string;
  onChange: (s: string) => void;
}

const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const Table: React.FC<TableProps> = ({ data, inputText, onChange }) => {
  const table = useReactTable({
    columns,
    data: data ?? [],
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter: inputText
    },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: onChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageSize(20);
  }, [data, table]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <table className="min-w-full">
            <thead className="hidden lg:table-header-group">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th scope="col" className="whitespace-nowrap px-3 py-4 text-sm text-my-blue text-left font-normal" key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <footer className="flex flex-col md:flex-row items-start md:items-center justify-between my-5 md:mt-10">
            <div className="flex items-center gap-4 text-base md:text-lg">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={`p-2 ${!table.getCanPreviousPage() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                {'<'} <span className="md:hidden">Назад</span>
              </button>
              <span>
                {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={`p-2 ${!table.getCanNextPage() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                <span className="md:hidden">Вперед</span> {'>'}
              </button>
            </div>
            <div className="flex items-center gap-3 px-2">
              Перейти на страницу
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border-b p-1 border-b-[#969696] text-center w-14"
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

const columnHelper = createColumnHelper<IRequest>()

const columns = [
  columnHelper.accessor('id', {
    header: () => "ID",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('fullName', {
    header: () => 'ФИО',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('phone', {
    header: () => 'Номер телефона',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('type', {
    header: () => 'Тип заявки',
    cell: () => "Классический",
    // cell: info => info.renderValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: () => 'Дата',
    cell: info => dayjs(info.renderValue()).format('DD.MM.YYYY'),
  }),
  columnHelper.accessor('quantity', {
    header: () => 'Кол-во',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('cityId', {
    header: () => 'Город',
    cell: info => <CityName id={info.renderValue()} />,
  }),
  columnHelper.accessor('call', {
    header: () => 'Звонок',
    cell: info => info.getValue() ? 'Да': 'Нет',
  }),
  columnHelper.accessor('id', {
    id: 'edit',
    header: () => <span className="sr-only">Edit</span>,
    cell: info => <Actions id={info.getValue()} />,
  }),
];

const CityName: React.FC<{ id: number | null }> = ({ id }) => {
  const { data } = useGetCitiesQuery();

  const cityName = useMemo(() => {
    if (Array.isArray(data)) {
      return data.find(city => String(city.id) === String(id))?.cityName ?? 'Алматы'
    }

    return 'Алматы'
  }, [id, data]);

  return cityName;
}

const Actions: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="flex items-center gap-4" id={id}>
      <EditIcon />
      <TrashIcon />
    </div>
  );
}

export default Table