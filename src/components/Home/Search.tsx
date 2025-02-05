/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import filter from '/icons/filter-horizontal.svg';
import search from '/icons/search.svg';
import thumbs from '/icons/thumbs-up.svg';
import award from '/icons/award-04.svg';
import location from '/icons/map-pinpoint-01.svg'
import { useNavigate } from 'react-router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Search = () => {
    const navigate = useNavigate()
    const [type, setType] = useState<number>(0); 

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
        <div onClick={() => navigate('/search')} className='flex gap-1.5 '>
            <div className='flex items-center border gap-1 border-variant-400 grow rounded-lg p-3'>
                <img src={search} className='size-7' />
                <input type="search" name="" className='outline-0 grow h-full' placeholder='Search for Hostels, locations' id="" />
            </div>
            <button onClick={() => navigate('/search')} className='bg-primary rounded-xl p-3'>
                <img src={filter} />
            </button>
        </div>

        <div className='flex overflow-scroll gap-2 py-5 no-scrollbar'>
            {
                searchType?.map((item: any, i : number) => (
                    <button onClick={() => setType(i)} key={i} className={`flex gap-1 min-w-fit items-center rounded-lg capitalize justify-center text-[14px] py-2 px-3 border ${type == i ? 'bg-[#1B85A6] text-white' : 'border-variant-500 text-variant-500'} `}>
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