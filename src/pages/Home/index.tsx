/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import StudentHome from "../StudentHome";
import AgentHome from "../AgentHome";
import { useUserStore } from "../../store/UseUserStore";
// import { useQuery } from "@tanstack/react-query";
// import { fetchUser } from "../../lib/fetchUser";

const Home: React.FC = () => {
    const [accountType, setAccountType] = useState<"AGENT" | "BASIC">("BASIC");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [loggedUser, setLoggedUser] = useState<any | null>(null);

    const { user  } = useUserStore();
    const localUser = localStorage.getItem("user");

    useEffect(() => {
      setLoggedUser(user || (localUser ? JSON.parse(localUser) : null));
    }, [user, localUser, accountType])

    useEffect(() => {},[loggedUser])

    // const user = useQuery({ queryKey: ['todos'], queryFn: fetchUser })
  return (
    <section>
      {loggedUser?.userType === "AGENT" ? <AgentHome user={loggedUser} /> : <StudentHome user={loggedUser} />}
    </section>
  );
};

export default Home;
