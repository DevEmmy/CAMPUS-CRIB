import React from 'react'
import indicator from '/onboarding/indicator.svg'
import { Link } from 'react-router';

interface Props {
  handleNextStep: () => void;  
}

const StudentStep1: React.FC<Props> = ({handleNextStep}) => {
  return (
    <section className='h-dvh w-full flex items-center justify-end flex-col p-4'>
        <div className='bg-primary rounded-xl p-6 flex flex-col items-center justify-between gap-5 text-white'>
            <img src={indicator} alt="indicator" />
            <div className='flex flex-col items-center justify-center gap-2'>
                <h2 className='text-center text-[24px] font-bold leading-7 p-2'>Welcome to Hostel!</h2>
                <p className='text-[14px] font-normal leading-5 text-center p-2'> Your go-to platform for finding the best hostels near your campus.
                Simplify your search, compare options, and book with ease.</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-5'>
                <button onClick={handleNextStep} className='bg-white text-primary py-2 px-14 rounded-lg font-bold'>Continue</button>
                <Link to={'/student/signup'} className='text-white font-normal text-[14px] leading-5 text-center'>skip</Link>
            </div>
        </div>
    </section>
  )
}

export default StudentStep1