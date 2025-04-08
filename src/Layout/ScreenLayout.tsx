/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Tabs from "../components/Reuseables/Tabs";
import { Outlet, useNavigate } from "react-router";
import Loader from "../components/Ui/Loader";
import { useUserStore } from "../store/UseUserStore";


const ScreenLayout: React.FC = () => {
  const navigate = useNavigate();


  const { user } = useUserStore();

  useEffect(() => {
    console.log("User details", user);

    if (user?.userType === null) { navigate('/login') }
  }, [user, navigate]);

  // useEffect(() => {
  //   if (!loading && userType === null) {
  //     navigate("/login");
  //   }
  // }, [userType, loading, navigate]);

  if (user?.userType === null) {
    return <div className='h-screen w-full flex items-center justify-center'><Loader/>.</div>;
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