/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import AgentHome from "../pages/AgentHome";
import StudentHome from "../pages/StudentHome";
// import { useNavigate } from 'react-router';
import Loader from "../components/Ui/Loader";
import { useUserStore } from "../store/UseUserStore";
import { useNavigate } from "react-router";

const HomepageLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  useEffect(() => {
    if (user?.userType === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {user?.userType === "AGENT" ? (
        <AgentHome user={user} />
      ) : (
        <StudentHome user={user} />
      )}
    </div>
  );
};

export default HomepageLayout;
