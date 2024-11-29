import React from 'react'
import { Link } from 'react-router'
import cap from '/onboarding/cap.svg'
import mentoring from '/onboarding/mentoring.svg'

const AccountType: React.FC = () => {
  return (
    <main className='flex justify-center gap-10 flex-col h-[100vh] w-full'>
       <div>
        <h1 className='text-[22px] leading-7 p-3 font-medium'>How Would You Like to Get Started?</h1>
       </div>
        <div className='flex items-center justify-around gap-5'>
          <Link className='border border-dark rounded-lg py-8 px-2 flex items-center justify-center flex-col gap-2' to={'/onboarding'}>
          <img src={cap} alt="Cap" />
          <p className='text-center text-dark font-bold text-[14px] leading-5'>Continue as A Student</p>
          </Link>
          <Link className=' rounded-lg py-8 px-2 flex items-center justify-center flex-col bg-primary gap-2' to={'/'}>
          <img src={mentoring} alt="mentoring" />
          <p className='text-center text-white font-bold text-[14px] leading-5'>Continue as An Agent</p>
          </Link>
        </div>
    </main>
  )
}

export default AccountType