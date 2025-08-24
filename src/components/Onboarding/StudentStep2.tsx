import React from 'react'
import { Link } from 'react-router'
import { ArrowRight2, Location, Filter, Star1 } from 'iconsax-react';

interface Props {
    handleNextStep: () => void
}

const StudentStep2: React.FC<Props> = ({handleNextStep}) => {
  return (
    <section className='min-h-dvh w-full flex items-center justify-center p-6 bg-white dark:bg-theme transition-colors duration-300'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-orange-600 rounded-full mb-6 shadow-lg'>
            <Location size={40} className="text-white" />
          </div>
          <h1 className='text-3xl font-bold text-dark dark:text-white mb-4'>
            Find Hostels Tailored for You
          </h1>
          <p className='text-gray-600 dark:text-gray-400 text-lg leading-relaxed'>
            Easily search and filter hostels based on your preferences
          </p>
        </div>

        {/* Features */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl border-2 border-primary/30 dark:border-primary/20 px-4 py-8 mb-8 transition-colors duration-300'>
          <div className='space-y-6'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-xl flex items-center justify-center'>
                <Filter size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className='font-semibold text-dark dark:text-white mb-1'>Smart Filters</h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Filter by location, price, amenities, and proximity to campus
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-yellow-100 dark:bg-yellow-900/40 rounded-xl flex items-center justify-center'>
                <Star1 size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className='font-semibold text-dark dark:text-white mb-1'>Top Recommendations</h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Get personalized recommendations based on your preferences
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center'>
                <Location size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className='font-semibold text-dark dark:text-white mb-1'>Campus Proximity</h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Find hostels close to your university or college
                </p>
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
            className='block text-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 font-medium'
          >
            Skip for now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default StudentStep2
