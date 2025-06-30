/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import AgentHome from "../pages/AgentHome";
import StudentHome from "../pages/StudentHome";
// import { useNavigate } from 'react-router';
// import Loader from "../components/Ui/Loader";
import { useUserStore } from "../store/UseUserStore";
// import { useNavigate } from "react-router";

const HomepageLayout: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<any | null>(null);
  // const navigate = useNavigate();
  const { user } = useUserStore();
  const localUser = localStorage.getItem("user");

  useEffect(() => {

    const localUserDetails = localUser ?  JSON.parse(localUser) : null

    console.log("local User details typr" , typeof localUserDetails  )
    console.log("use store type", typeof user)
    setLoggedUser(user || localUserDetails);
  }, []);


  useEffect(() => {
    console.log("logged User details" , loggedUser)
  }, [loggedUser]);
  
  return (
    <div>
      {loggedUser?.userType === "AGENT" ? (
        <AgentHome user={loggedUser} />
      ) : (
        <StudentHome />
      ) }
    </div>
  );
};

export default HomepageLayout;
