/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import back from '/icons/back.svg'
import { useNavigate } from "react-router";

const TitleHead = ({title} : any) => {
  const navigate = useNavigate();
  const [hasShadow, setHasShadow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`flex items-center justify-between mb-4 pt-5 px-5 pb-3  top-0 fixed z-[9999999] bg-white w-full transition-shadow duration-300  ${hasShadow ? "shadow-sm" : ""}`}>
      <button
        onClick={() => navigate(-1)}
        className="rounded-full bg-primary size-7 flex items-center justify-center"
      >
        <img src={back} alt="back" className="size-3.5" />
      </button>
      <h1 className="text-xl font-bold">
        {title}
      </h1>
      <div className="w-6"></div>
    </div>
  );
};

export default TitleHead;
