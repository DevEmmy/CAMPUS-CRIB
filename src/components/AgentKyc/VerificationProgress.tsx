import React from 'react'

const VerificationProgress: React.FC = () => {
  return (
   <section className='h-[100vh] w-full flex items-center justify-center p-5'>
    <div>
        <h2 className='text-dark font-bold text-[26px] leading-[32px]'>1%</h2>
        <p>Your documents are being verified</p>
    </div>
   </section>
  )
}

export default VerificationProgress