import React from "react";
import Tabs from "../components/Reuseables/Tabs";
import { Outlet, Navigate } from "react-router";
// import Loader from "../components/Ui/Loader";
import { useUserStore } from "../store/UseUserStore";

const ScreenLayout: React.FC = () => {
  const { user } = useUserStore();
  const localUser = localStorage.getItem("user");
  const parsedUser = user || (localUser ? JSON.parse(localUser) : null);
  const accountType = localStorage.getItem("accountType");

  // Only redirect if user is null and we have an account type (meaning user should be logged in)
  if (parsedUser === null && accountType) {
    return <Navigate to="/account-type" replace />;
  }

  return (
    <section className="h-dvh">
      <div>
        <Outlet context={{ user: parsedUser }} />
      </div>
      {parsedUser?.userType === "AGENT" ? <Tabs isAgent /> : <Tabs />}
    </section>
  );
};

export default ScreenLayout;
