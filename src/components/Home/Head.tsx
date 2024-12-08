import React from 'react'
import notification from '/icons/notification.svg';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Head = ({name, profilePic} : any) => {
  return (
    <div className='flex items-center justify-between'>
        <div className="flex gap-2 items-center">
            <img src={profilePic} className='size-12 rounded-xl'/>
            <div className='flex-row gap-0'>
                <p className='font-bold text-dark'>Hello {name}</p>
                <p className='text-sm text-[#64748B]'>explore the best hostel!</p>
            </div>
        </div>
        
        <img src={notification} alt="notifications" />
    </div>
  )
}

export default Head