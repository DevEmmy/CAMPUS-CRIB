/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect} from 'react'
import notification from '/icons/notification.svg';


interface HeadProps { 
  name: string,
  profilePic?: any,
  isAgent: boolean
}

const Head = ({name, profilePic, isAgent} : HeadProps) => {
  const [hasShadow, setHasShadow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`flex items-center justify-between px-5 py-5 top-0 fixed w-full bg-white z-20  transition-shadow duration-300  ${hasShadow ? "shadow-sm" : ""}`}>
        <div className="flex gap-2 items-center">
            <img src={profilePic} className='size-12 rounded-xl'/>
            <div className='flex-row gap-0'>
                <p className='font-bold text-dark'>{isAgent ? "Welcome " : "Hello "}{name}</p>
                <p className='text-sm text-[#64748B]'>
                  {
                    isAgent ? `Let's connect` : 'explore the best hostel!'
                  }
                </p>
            </div>
        </div>
        
        <img src={notification} alt="notifications" />
    </div>
  )
}

export default Head