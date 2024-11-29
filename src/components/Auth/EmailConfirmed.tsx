import React from 'react'
import { BiCheck } from 'react-icons/bi'

const EmailConfirmed: React.FC = () => {
    const user = '@philipiorbee'
  return (
   <section className='h-[100vh] w-full flex items-center justify-center p-5'>
    <div className='flex flex-col items-center gap-2'>
        <BiCheck size={100} color='#A64E1B' />
        <h2 className='text-dark text-[26px] leading-7 font-normal'>Verified</h2>
        <small className='text-[#7D8A9E] text-[14px] leading-5 font-normal text-center'>Hi {user} you have successfully verified your account</small>

<div className='w-full'>
    <button className='bg-primary text-white py-3 px-5 text-[14px] leading-5 w-full font-bold text-center rounded-lg my-5'>Go To Home</button>
</div>
    </div>
   </section>
  )
}

export default EmailConfirmed