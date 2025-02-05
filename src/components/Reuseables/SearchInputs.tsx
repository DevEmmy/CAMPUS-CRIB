import React from 'react'
import search from '/wishlist/search.svg'

const SearchInputs: React.FC = () => {
  return (
    <div className='flex items-center gap-3 py-[6px] px-3 border border-[#96A0B0] shadow shadow-[#00000017] rounded-lg w-full'>
    <input className='flex-1 focus:outline-none  text-[#96A0B0]' type="text" placeholder='Enter Keyword' />
    <img className='bg-[#B46A3F] p-2 rounded-lg' src={search} alt="search icon" />
</div>
  )
}

export default SearchInputs