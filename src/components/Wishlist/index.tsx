import React from 'react'
import { VscChevronLeft } from "react-icons/vsc";
import { IoMdMore } from "react-icons/io";
import search from '/wishlist/search.svg'
import hostel from '/wishlist/Image.svg'

const Wishlist: React.FC = () => {
    const history = [
        'Harmony hostel',
        '2bedroom flat',
        'Selfcon',
        '1bedroom flat',
        'School hostel'
    ]
  return (
   <section className='w-full p-2'>
    <div className='flex items-center justify-between w-full my-2 gap-2'>
        <button className='text-primary border border-primary p-2 rounded-lg cursor-pointer'>
        <VscChevronLeft size={30} />
        </button>
        <h2 className='text-dark font-bold leading-6 flex-1'>Favourites</h2>
        <button>
        <IoMdMore size={24} />
        </button>
    </div>

{/* search input */}
    <div className='my-10'>
        <div className='flex items-center gap-3 p-2 border border-[#96A0B0] shadow shadow-[#00000017] rounded-lg w-full'>
            <input className='flex-1 focus:outline-none  text-[#96A0B0]' type="text" placeholder='Enter Keyword' />
            <img className='bg-[#B46A3F] p-3 rounded-xl' src={search} alt="search icon" />
        </div>

        {/* Search history */}
        <div className='my-8'>
            <h2 className='font-bold text-[22px] leading-7'>Search History</h2>

            <div className='flex items-center gap-5 flex-wrap my-5'>
                {history.map((search, idx) => (
                    <small className='bg-white shadow shadow-[#00000017] p-3 rounded-xl text-[14px] leading-5 text-[#96A0B0] font-normal' key={idx}>{search}</small>
                ))}
            </div>
        </div>
    </div>

    {/* Favourites */}
    <div>
        <div className='flex items-center justify-between w-full my-2'>
            <h2 className='font-bold text-[22px] leading-7'>Favorites</h2>
            <button className='text-[14px] leading-5 text-[#525252] font-normal'>View all</button>
        </div>
        <div>
            <div>
                <img src={hostel} alt="hostel" />
                <div>
                    <h2 className='text-dark font-bold leading-6'>Aspire Stay Inn</h2>
                </div>
            </div>
        </div>
    </div>
   </section>
  )
}

export default Wishlist