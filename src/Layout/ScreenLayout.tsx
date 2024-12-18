import React, { useState } from 'react'
import Tabs from '../components/Reuseables/Tabs';
import { Outlet } from 'react-router';

const ScreenLayout: React.FC = () => {
    const [accountType, setAccountType] = useState<"AGENT" | "BASIC">("BASIC");
  return (
   <section className='h-dvh'>
        <div>
            <Outlet/>
        </div>
        {
            accountType === 'AGENT' ? <Tabs isAgent/> : <Tabs />
        }
   </section>
  )
}

export default ScreenLayout