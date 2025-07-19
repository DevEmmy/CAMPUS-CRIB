import React from 'react'
import { Link } from 'react-router';
import { ArrowRight2, Building, User, TrendUp } from 'iconsax-react';

interface Props {
  handleNextStep: () => void;
}

const AgentStep1: React.FC<Props> = ({handleNextStep}) => {
  return (
    <section className='min-h-dvh w-full flex items-center justify-center p-6'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-orange-600 rounded-full mb-6 shadow-lg'>
            <Building size={40} className="text-white" />
          </div>
          <h1 className='text-3xl font-bold text-dark mb-4'>
            Welcome to Campus Crib
          </h1>
          <p className='text-gray-600 text-lg leading-relaxed'>
            Join our network and showcase your hostels to thousands of students
          </p>
        </div>

        {/* Features */}
        <div className='bg-white rounded-2xl border-2 border-primary/30 px-4 py-8 mb-8'>
          <div className='space-y-6'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                <Building size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className='font-semibold text-dark mb-1'>List Properties</h3>
                <p className='text-gray-600 text-sm'>Showcase your hostels with detailed listings and photos</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
                <User size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className='font-semibold text-dark mb-1'>Reach Students</h3>
                <p className='text-gray-600 text-sm'>Connect with thousands of students looking for accommodation</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center'>
                <TrendUp size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className='font-semibold text-dark mb-1'>Grow Business</h3>
                <p className='text-gray-600 text-sm'>Simplify bookings and manage properties effortlessly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='space-y-4'>
          <button 
            onClick={handleNextStep} 
            className='w-full bg-primary hover:bg-primary/90 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-custom'
          >
            Continue
            <ArrowRight2 size={20} />
          </button>
          
          <Link 
            to='/signup' 
            className='block text-center text-gray-600 hover:text-primary transition-colors duration-200 font-medium'
          >
            Skip for now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AgentStep1