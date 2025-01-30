/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import StudentHome from "../StudentHome";
import AgentHome from "../AgentHome";
// import { useQuery } from "@tanstack/react-query";
// import { fetchUser } from "../../lib/fetchUser";

const Home: React.FC = () => {
    const [accountType, setAccountType] = useState<"AGENT" | "BASIC">("BASIC");

    useEffect(() => {
      setAccountType(accountType);
    }, [])

    // const user = useQuery({ queryKey: ['todos'], queryFn: fetchUser })
  return (
    <section>
      {accountType === "AGENT" ? <AgentHome /> : <StudentHome />}
    </section>
  );
};

export default Home;
