import React, { useEffect, useState } from "react";
import Tabs from "../components/Reuseables/Tabs";
import { Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../lib/fetchUser";
import { useUserStore } from "../store/UseUserStore";

const ScreenLayout: React.FC = () => {
  const [accountType, setAccountType] = useState<"AGENT" | "BASIC">();
  const { setUserData } = useUserStore();
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  useEffect(() => {
    if (user) {
      setUserData(user)
      setAccountType(user.userType);
      return;
    }
    return;
  }, []);

  return (
    <section className="h-dvh">
      <div>
        <Outlet />
      </div>
      {accountType === "AGENT" ? <Tabs isAgent /> : <Tabs />}
    </section>
  );
};

export default ScreenLayout;
