import React from 'react'
import indicator from '/onboarding/indicator-2.svg'
import illustration from '/onboarding/onboard.svg'

const AgentStep2: React.FC = () => {
  return (
    <section className='h-[100vh] w-full flex items-center justify-end flex-col p-4 gap-5'>
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
        <button className='bg-white text-primary py-2 px-14 rounded-lg font-bold'>Continue</button>
        <button className='text-white font-normal text-[14px] leading-5 text-center'>skip</button>
    </div>
</div>
</section>
  )
}

export default AgentStep2