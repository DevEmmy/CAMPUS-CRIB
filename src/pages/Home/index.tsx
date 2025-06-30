
import React, { useEffect, useState } from "react";
import StudentHome from "../StudentHome";
import AgentHome from "../AgentHome";
import { useUserStore } from "../../store/UseUserStore";
const Home: React.FC = () => {
    const [loggedUser, setLoggedUser] = useState<any | null>(null);

    const { user  } = useUserStore();
    const localUser = localStorage.getItem("user");

    useEffect(() => {
      setLoggedUser(user || (localUser ? JSON.parse(localUser) : null));
    }, [user, localUser]);

    useEffect(() => {},[loggedUser])


  return (
    <section>
      {loggedUser?.userType === "AGENT" ? <AgentHome user={loggedUser} /> : <StudentHome />}
    </section>
  );
};

export default Home;
