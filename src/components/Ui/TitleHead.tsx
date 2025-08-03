/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "iconsax-react";

interface TitleHeadProps {
  title?: string,
  handleClick?: () => void
}

const TitleHead = ({title, handleClick} : TitleHeadProps) => {
  const navigate = useNavigate();
  const [hasShadow, setHasShadow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoBack = () => {
    if (handleClick) {
      handleClick(); 
    } else {
      navigate(-1); 
    }
  };
  
  return (
    <div className={`sticky top-0 z-10 bg-white border-b border-gray-100 transition-shadow duration-300 ${hasShadow ? "shadow-sm" : ""}`}>
      <div className="flex items-center gap-3 px-4 py-5">
        <button 
          onClick={handleGoBack} 
          className="flex items-center justify-center w-8 h-8"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        
        <h1 className="text-lg font-semibold text-gray-900 flex-1">
          {title}
        </h1>
        
        <div className="w-8"></div>
      </div>
    </div>
  );
};

export default TitleHead;