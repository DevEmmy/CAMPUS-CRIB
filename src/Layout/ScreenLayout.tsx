import React, { useEffect } from "react";
import Tabs from "../components/Reuseables/Tabs";
import { Outlet, useNavigate } from "react-router";
import { useUserContext } from "../contexts/UserContext";
import Loader from "../components/Ui/Loader";


const ScreenLayout: React.FC = () => {
  const { userType, loading } = useUserContext();  // Get userType from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && userType === null) {
      navigate("/login");
    }
  }, [userType, loading, navigate]);

  if (loading) {
    return <div className='h-screen w-full flex items-center justify-center'><Loader/>.</div>;
  }

  return (
    <section className="h-dvh">
      <div>
        <Outlet />
      </div>
      {userType === "AGENT" ? <Tabs isAgent /> : <Tabs />}
    </section>
  );
};

export default ScreenLayout;