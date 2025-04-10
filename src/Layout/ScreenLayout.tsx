/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Tabs from "../components/Reuseables/Tabs";
import { Outlet } from "react-router";
import Loader from "../components/Ui/Loader";
import { useUserStore } from "../store/UseUserStore";


const ScreenLayout: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<any | null>(null);
  // const navigate = useNavigate();
  const { user } = useUserStore();
  const localUser = localStorage.getItem("user");

  useEffect(() => {

    console.log("User details" , user)
    setLoggedUser(user || (localUser ? JSON.parse(localUser) : null));

    if (loggedUser === null) {
      // navigate("/account-type");
      // navigate(0)
    }
  }, []);

  // useEffect(() => {
  //   if (loggedUser === null) {
  //     navigate("/account-type");
  //     // navigate(0)
  //   }
  //   console.log("user first", loggedUser?.firstName);
  // }, [loggedUser]);

  // useEffect(() => {
  //   if (!loading && userType === null) {
  //     navigate("/login");
  //   }
  // }, [userType, loading, navigate]);

  if (loggedUser === null) {
    return <div className='h-screen w-full flex items-center justify-center'><Loader/></div>;
  }

  return (
    <section className="h-dvh">
      <div>
        <Outlet />
      </div>
      {user?.userType === "AGENT" ? <Tabs isAgent /> : <Tabs />}
    </section>
  );
};

export default ScreenLayout;