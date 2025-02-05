/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { VscChevronLeft } from "react-icons/vsc";

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
    <div className={`flex items-center gap-3 mb-4 pt-5 px-5 pb-3  top-0 fixed z-[9999] bg-white w-full transition-shadow duration-300  ${hasShadow ? "shadow-sm" : ""}`}>
      <button onClick={() => navigate(-1)} className="text-primary border border-primary p-1 rounded-lg cursor-pointer">
          <VscChevronLeft size={25} />
        </button>
      <h1 className="font-semibold text-[18px] text-[#0E0F1D] leading-6 capitalize">
        {title}
      </h1>
      <div className="w-6"></div>
    </div>
  );
};

export default TitleHead;
