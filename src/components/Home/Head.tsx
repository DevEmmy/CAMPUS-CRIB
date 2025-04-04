/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect} from 'react'
import notification from '/icons/notification.svg';
import { useNavigate } from 'react-router';




const Head = ( {user, isAgent} : { user: any, isAgent: boolean}) => {
  const navigate = useNavigate()
  const [hasShadow, setHasShadow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`flex items-center justify-between px-5 pt-4 pb-3 top-0 fixed w-full bg-white z-20  transition-shadow duration-300  ${hasShadow ? "shadow-sm" : ""}`}>
        <div className="flex gap-2 items-center">
            <img src={user?.profilePicture} className='size-12 rounded-xl'/>
            <div className='flex-row gap-0'>
                <p className='font-bold text-dark'>{isAgent ? "Welcome " : "Hello "}{user?.firstName}</p>
                <p className='text-sm text-[#64748B]'>
                  {
                    isAgent ? `Let's connect` : 'explore the best hostel!'
                  }
                </p>
            </div>
        </div>
        
        <img onClick={() => navigate('/notifications')} src={notification} alt="notifications" />
    </div>
  )
}

export default Head