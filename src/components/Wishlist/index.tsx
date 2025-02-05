import React from 'react'
import hostel from '/wishlist/Image.svg'
import location from '/wishlist/location.svg'
import { FiEye } from "react-icons/fi";
import { TiHeartFullOutline } from "react-icons/ti";
import SearchInputs from '../Reuseables/SearchInputs';
import CustomReturn from '../Reuseables/CustomReturn';

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
     <CustomReturn title='Favourites' />

{/* search input */}
    <div className='my-10'>
       <SearchInputs />

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
        <div className='p-2'>
            <div className='flex gap-5 items-start'>
                <img className='size-28' src={hostel} alt="hostel" />
                <div className='space-y-2'>
                    <h2 className='text-dark font-bold leading-5'>Aspire Stay Inn</h2>
                    <div className='flex items-center justify-start gap-2'>
                        <img src={location} alt="location icon" />
                        <p className='text-dark text-[12px] leading-4'>123 Harmony Estate</p>
                    </div>
                    <p className='text-[#64748B] text-[10px] leading-4'>A cozy and affordable hostel offering free Wi-Fi, 24/7 security, and a study loun....</p>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <FiEye color='#7D8A9E' size={25}/>
                            <small className='text-[#525252] text-[12px] leading-4'>121.1k</small>
                        </div>
                        <div className='flex items-center gap-1'>
                            <TiHeartFullOutline color='#C80F0F' size={25}/>
                            <small className='text-[#525252] text-[12px] leading-4'>100</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </section>
  )
}

export default Wishlist