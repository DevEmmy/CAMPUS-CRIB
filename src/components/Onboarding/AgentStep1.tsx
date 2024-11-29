import React from 'react'
import indicator from '/onboarding/indicator.svg'
import { Link } from 'react-router';

interface Props {
  handleNextStep: () => void;
}

const AgentStep1: React.FC<Props> = ({handleNextStep}) => {
  return (
    <section className='h-[100vh] w-full flex items-center justify-end flex-col p-4'>
    <div className='bg-primary rounded-xl p-5 flex flex-col items-center justify-between gap-7 text-white'>
        <img src={indicator} alt="indicator" />
        <div className='flex flex-col items-center justify-center gap-1'>
            <h2 className='text-center text-[24px] font-bold leading-7'>Welcome to Campus Crib</h2>
            <p className='text-[14px] font-normal leading-5 text-center'>Join our network and showcase your hostels to thousands of students. Simplify bookings, manage properties, and grow your business effortlessly.</p>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
            <button onClick={handleNextStep} className='bg-white text-primary py-2 px-14 rounded-lg font-bold'>Continue</button>
            <Link to={'/agent/signup'} className='text-white font-normal text-[14px] leading-5 text-center'>skip</Link>
        </div>
    </div>
</section>
  )
}

export default AgentStep1