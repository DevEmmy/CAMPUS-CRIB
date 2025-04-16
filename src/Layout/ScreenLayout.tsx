/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Tabs from "../components/Reuseables/Tabs";
import { Outlet, useNavigate } from "react-router";
import Loader from "../components/Ui/Loader";
import { useUserStore } from "../store/UseUserStore";

const ScreenLayout: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<any | null>(null);
  const navigate = useNavigate();
  const { user } = useUserStore();
  const localUser = localStorage.getItem("user");

  useEffect(() => {
    console.log("User details local", localUser);
    setLoggedUser(user || (localUser ? JSON.parse(localUser) : null));
  }, []);

  useEffect(() => {
    // console.log("logged User details in screen layout", loggedUser);
    if (loggedUser) {
      console.log("logged User details in screen layout", loggedUser);
    } else {
      const timeout = setTimeout(() => {
        navigate("/account-type");
      }, 3000); // 3000ms = 3 seconds

      // Clean up the timeout if the component unmounts before navigation
      return () => clearTimeout(timeout);
    }
  }, [loggedUser, navigate]);

  if (loggedUser == null) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  } else {
    return (
      <section className="h-dvh">
        <div>
          <Outlet />
        </div>
        {loggedUser?.userType === "AGENT" ? <Tabs isAgent /> : <Tabs />}
      </section>
    );
  }
};

export default ScreenLayout;
