import { useState } from 'react'
import { FilterIcon, SortIcon } from "@/shared/icons"
import SearchInput from "./ui/SearchInput"
import Table from "./ui/Table"

import { useGetRequestsQuery } from "@/shared/store/requests"

const Requests = () => {
  const [query, setQuery] = useState('');
  const { data } = useGetRequestsQuery();

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-end md:items-center justify-between gap-4 md:gap-28">
        <SearchInput value={query} onChange={e => setQuery(e.currentTarget.value)} />
        <div className="flex items-center gap-8">
          <SortIcon />
          <FilterIcon />
        </div>
      </div>
      <Table data={data} inputText={query} onChange={setQuery} />
    </>
  )
}

export default Requests