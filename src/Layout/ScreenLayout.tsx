import React from 'react'
import Tabs from '../components/Reuseables/Tabs';

const ScreenLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
   <section className='h-dvh'>
        <div>
            {children}
        </div>
        <div>
            <Tabs/>
        </div>
   </section>
  )
}

export default ScreenLayout