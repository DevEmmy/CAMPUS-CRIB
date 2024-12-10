import React from "react";
import { IoMdMore } from "react-icons/io";
import { VscChevronLeft } from "react-icons/vsc";

interface CustomReturnProps {
    title: string;
}

const CustomReturn: React.FC<CustomReturnProps> = ({title}) => {
  return (
    <div className="my-2 p-2">
      <div className="flex items-center justify-between w-full my-2 gap-2">
        <button className="text-primary border border-primary p-1 rounded-lg cursor-pointer">
          <VscChevronLeft size={25} />
        </button>
        <h2 className="text-dark font-bold leading-6 flex-1">{title}</h2>
        <button>
          <IoMdMore size={24} />
        </button>
      </div>
    </div>
  );
};

export default CustomReturn;
