import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import cap from "/onboarding/cap.svg";
import mentoring from "/onboarding/mentoring.svg";
import { fetchUser } from "../../lib/fetchUser";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store/UseUserStore";

const AccountType: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserStore();

  const [accountType, setAccountType] = useState<"AGENT" | "BASIC">();
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  useEffect(() => {
    if (user) {
      setUserData(user)
      setAccountType(user.userType);
      return
    }
    return
  }, []);

  useEffect(() => {
    if (user && accountType === "AGENT") {
      navigate("/agent");
    } else if (user && accountType === "BASIC") {
      navigate("/student");
    }
    return
  }, [user]);

  const handleChoice = (choice: string) => {
    localStorage.setItem("accountType", choice);
  };
  return (
    <main className="flex justify-center gap-10 flex-col h-dvh w-full">
      <div>
        <h1 className="text-[22px] leading-7 p-3 font-medium">
          How Would You Like to Get Started?
        </h1>
      </div>
      <div className="flex flex-col items-center justify-around gap-5 p-3">
        <Link
          onClick={() => handleChoice("BASIC")}
          className="border w-full border-dark rounded-lg py-8 px-2 flex items-center justify-center flex-col gap-2"
          to={"/student/onboarding"}
        >
          <img src={cap} alt="Cap" />
          <p className="text-center text-dark font-bold text-[14px] leading-5">
            Continue as A Student
          </p>
        </Link>
        <Link
          onClick={() => handleChoice("AGENT")}
          className=" w-full  rounded-lg py-8 px-2 flex items-center justify-center flex-col bg-primary gap-2"
          to={"/agent/onboarding"}
        >
          <img src={mentoring} alt="mentoring" />
          <p className="text-center text-white font-bold text-[14px] leading-5">
            Continue as An Agent
          </p>
        </Link>
      </div>
    </main>
  );
};

export default AccountType;
