import React from 'react'

interface ControlledButtonProps {
    title: string;
}

const ControlledButton: React.FC<ControlledButtonProps> = ({title}) => {
  return (
    <div>
    <button className='bg-primary text-white p-3 w-full font-bold rounded-lg text-[16px] text-center leading-5'  type="submit">{title}</button>
  </div>
  )
}

export default ControlledButton