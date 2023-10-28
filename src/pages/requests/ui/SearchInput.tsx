import React from 'react'
import { SearchIcon } from "@/shared/icons"

const SearchInput = React.forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>((props, ref) => (
  <div className="relative rounded-lg bg-my-body h-8 flex items-center flex-1 w-full">
    <input
      ref={ref}
      className=" bg-inherit block w-full rounded-lg border-0 py-2 pl-2 pr-10 text-gray-900 ring-1 ring-inset ring-my-blue placeholder:text-[#969696] focus:ring-2 focus:ring-inset focus:ring-blue-600"
      placeholder="Поиск"
      {...props}
    />
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <SearchIcon />
    </div>
  </div>
))

export default SearchInput;
