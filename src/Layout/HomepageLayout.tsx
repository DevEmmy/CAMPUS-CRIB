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

    console.log("User details" , user)
    setLoggedUser(user || (localUser ? JSON.parse(localUser) : null));
  }, []);
  
  return (
    <div>
      {loggedUser?.userType === "AGENT" ? (
        <AgentHome user={loggedUser} />
      ) : (
        <StudentHome user={loggedUser} />
      ) }
    </div>
  );
};

export default HomepageLayout;
