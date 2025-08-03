import React, { useEffect, useState } from "react";
import AgentHome from "../pages/AgentHome";
import StudentHome from "../pages/StudentHome";
import { useUserStore } from "../store/UseUserStore";

const HomepageLayout: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<any | null>(null);
  const { user } = useUserStore();
  const localUser = localStorage.getItem("user");

  useEffect(() => {
    const localUserDetails = localUser ? JSON.parse(localUser) : null;
    setLoggedUser(user || localUserDetails);
  }, [user, localUser]);
  
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
