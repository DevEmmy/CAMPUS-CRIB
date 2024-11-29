import React from 'react'

interface OTPInputProps {
    otp: string[];
    setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  }

const OTPInput: React.FC<OTPInputProps> = ({otp, setOtp}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        if(isNaN(e.target.value)) return false
    
        setOtp([...otp.map((digit,index) => (index === idx ? e.target.value:digit))])
    
        if(e.target.value && e.target.nextSibling){
          e.target.nextSibling.focus()
        }
      }
  return (
    <div  className="flex items-center justify-center gap-5 w-full my-10">
       {otp.map((digit, idx) => (
        <input
          key={idx}
        //   ref={(ref) => inputRefs.current[idx] = ref}
        className="w-[40px] h-[40px] text-dark focus:outline-none text-center border border-[#E6CDBF]"
          onChange={e => handleChange(e, idx)}
          value={otp[idx]}
          maxLength={1}
          type='number'
        />
      ))} 
    </div>
  )
}

export default OTPInput