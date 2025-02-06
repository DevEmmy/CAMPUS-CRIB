import React, { useEffect } from 'react'
import AgentHome from '../pages/AgentHome';
import StudentHome from '../pages/StudentHome';
import { useNavigate } from 'react-router';
import { useUserContext } from '../contexts/UserContext';
import Loader from '../components/Ui/Loader';

const HomepageLayout: React.FC = () => {
    const { userType, loading } = useUserContext(); 
    const navigate = useNavigate();
  

    useEffect(() => {
        if (!loading && userType === null) {
          navigate("/login");
        }
      }, [userType, loading, navigate]);
    
      if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'><Loader/></div>;
      }

      useEffect(() => {}, [])
    
  return (
    <div>
        {userType === "AGENT" ? <AgentHome /> : <StudentHome />}
    </div>
  )
}

export default HomepageLayout