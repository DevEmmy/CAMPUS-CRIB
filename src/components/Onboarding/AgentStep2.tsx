import React from 'react'
import indicator from '/onboarding/indicator-2.svg'
import illustration from '/onboarding/onboard.svg'
import { Link } from 'react-router';

interface Props {
    handleNextStep: () => void;
}

const AgentStep2: React.FC<Props> = ({handleNextStep}) => {
  return (
    <section className='h-dvh w-full flex items-center justify-end flex-col p-4 gap-5'>
    <div>
        <img src={illustration} alt="" />
    </div>
<div className='bg-primary rounded-xl p-6 flex flex-col items-center justify-between gap-7 text-white'>
    <img src={indicator} alt="indicator" />
    <div className='flex flex-col items-center justify-center gap-1'>
        <h2 className='text-center text-[24px] font-bold leading-7'>Why Partner With Us?</h2>
        <p className='text-[14px] font-normal leading-5 text-center'>Gain access to a seamless platform designed for agents. List properties, track inquiries, and connect with students.</p>
    </div>
    <div className='flex flex-col items-center justify-center gap-5'>
        <button onClick={handleNextStep} className='bg-white text-primary py-2 px-14 rounded-lg font-bold'>Continue</button>
        <Link to={'/agent/signup'} className='text-white font-normal text-[14px] leading-5 text-center'>skip</Link>
    </div>
</div>
</section>
  )
}

export default AgentStep2