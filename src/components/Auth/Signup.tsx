import React from 'react'
import ControlledInput from '../Reuseables/ControlledInputs'
import {User} from '../../types/User'
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod'
import { useForm } from 'react-hook-form';
import line from '/onboarding/Line.svg'
import google from '/onboarding/google.svg'
import cap from '/onboarding/cap.svg'
import { Link } from 'react-router';

const userSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(6, 'Password must at least be 6 characters'),
  })

const Signup: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<User>({
        resolver: zodResolver(userSchema),
      });

      const handleSignup = async (data: User) => {
        try {
          console.log(123)
        //   const response = await login(data);
          console.log(data);
          reset();
          
        } catch (error) {
          console.log(error);
        }
      };
  return (
  <section className='h-full w-full p-5'>
    <div className='bg-[#E6CDBF4D] p-5 rounded-xl my-5'>
        <div>
            <h2 className='text-primary text-[24px] font-bold leading-7'>Create Account</h2>
            <p className='text-dark text-[14px] leading-5 font-normal my-2'>Join us to find the perfect hostel for your campus life</p>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit(handleSignup)}>
        <div className="w-full">
            <ControlledInput register={register} errors={errors} type="fullName" placeholder="fullName" />
          </div>
          <div className="w-full">
            <ControlledInput register={register} errors={errors} type="email" placeholder="Email Address" />
          </div>

          <div className="w-full">
            <ControlledInput register={register} errors={errors} type="password" placeholder="Password" />
          </div>
          <div className="w-full">
            <ControlledInput register={register} errors={errors} type="password" placeholder="Confirm Password" />
          </div>
          <div>
            <button className='bg-primary text-white p-3 w-full font-bold rounded-lg text-[16px] text-center leading-5' disabled={isSubmitting} type="submit">Create Account</button>
          </div>

          <div className='flex items-center justify-around gap-2 w-full'>
            <img width={80} src={line} alt="line" />
            <small className='text-nowrap text-primary leading-[14px] text-[12px]'>or register with</small>
            <img width={80} src={line} alt="line" />
          </div>

          <div className='space-y-3'>
            <div className='flex items-center gap-2 border border-primary rounded-lg p-3 w-full'>
                <img src={google} alt="" />
                <p className='text-dark text-[14px] leading-5 font-normal'>Continue with Google</p>
            </div>
            <div className='flex items-center gap-2 border border-primary rounded-lg p-3 w-full'>
                <img src={cap} alt="" />
                <p className='text-dark text-[14px] leading-5 font-normal'>Continue with Student ID</p>
            </div>
          </div>
        </form>
    </div>

    <div className='flex items-center justify-center my-10'>
        <small className='text-dark text-[14px] leading-5 text-center'>Already have account?{" "}
            <Link className='text-primary' to={'/'}>Log In</Link>
        </small>
    </div>
  </section>
  )
}

export default Signup