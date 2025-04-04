/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import AgentHome from '../pages/AgentHome';
import StudentHome from '../pages/StudentHome';
// import { useNavigate } from 'react-router';
import { useUserContext } from '../contexts/UserContext';
import Loader from '../components/Ui/Loader';
import { useUserStore } from '../store/UseUserStore';

const HomepageLayout: React.FC = () => {
    const { userType, loading } = useUserContext(); 
    // const navigate = useNavigate();
  

    // useEffect(() => {
    //     if (!loading && userType === null) {
    //       navigate("/login");
    //     }
    //   }, [userType, loading, navigate]);

    const [loggedUser, setLoggedUser] = useState<any | null>(null);

    const { user } = useUserStore();
  
    const localUser = localStorage.getItem("user");
  
    useEffect(() => {
      console.log("User details" , localUser)
      setLoggedUser(user || (localUser ? JSON.parse(localUser) : null));
    }, []);
    
      if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'><Loader/></div>;
      }

    
  return (
    <div>
        {userType === "AGENT" ? <AgentHome user={loggedUser} /> : <StudentHome user={loggedUser} />}
    </div>
  )
}

export default HomepageLayout