/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import filter from '/icons/filter-horizontal.svg';
import search from '/icons/search.svg';
import thumbs from '/icons/thumbs-up.svg';
import award from '/icons/award-04.svg';
import location from '/icons/map-pinpoint-01.svg'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Search = () => {
    const [type, setType] = useState<number>(0); 
    useEffect(() => {
        console.log(setType(1))
    })
    const searchType  = [
        {
            title: 'recommended',
            source: thumbs
        },
        {
            title: 'featured',
            source: award
        },
        {
            title: 'nearby',
            source: location
        },
        {
            title: 'Affordable',
            source: location
        }
    ]
  return (
    <div className='mt-6'>
        <div className='flex gap-1.5 '>
            <div className='flex items-center border gap-1 border-variant-400 grow rounded-lg p-0.5'>
                <img src={search} className='size-5' />
                <input type="search" name="" className='outline-0 grow h-full' placeholder='Search for Hostels, locations' id="" />
            </div>
            <button className='bg-primary rounded-xl p-1.5'>
                <img src={filter} />
            </button>
        </div>

        <div className='flex overflow-scroll gap-1 py-5'>
            {
                searchType?.map((item: any, i : number) => (
                    <button key={i} className={`flex gap-1 min-w-fit items-center rounded-lg text-xs py-1 px-3 border ${type == i ? 'bg-[#1B85A6] text-white' : 'border-variant-500 text-variant-500'} `}>
                        {item?.title}
                        <img src={item?.source} className='size-5' />
                    </button>
                ))
            }
        </div>
    </div>
  )
}

export default Search