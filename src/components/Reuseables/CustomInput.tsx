/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface inputProps {
  type: "text" | "number" | "textarea" | "select" | "checkbox" | "toggle";
  onChange: any;
  options?: string[];
  placeholder?: string;
  notBordered?: boolean;
  value?: any;
}

const CustomInput = ({ type, placeholder, options, notBordered, value, onChange}: inputProps) => {
    const style = 'grow w-full outline-none border-0 p-3 text-dark';
    const [isOn,setIsOn] = useState(true)
  return (
    <div className={` flex  p-0.5 ${!notBordered && 'rounded-lg border border-primary'} `}>
      {(type == "text" || type ==  "number") && (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`${style}`}
          placeholder={placeholder}
        />
      )}

      {type == "select" && (
        <select className={`${style} bg-white`}>
          <option className="text-variant-500">
            <span className="text-dark/70">{placeholder}</span>
          </option>

          {options?.map((item) => (
            <option className="">
              <span className="text-dark/60">{item}</span>
            </option>
          ))}
        </select>
      )}

      {
        type == "textarea" && (
            <textarea placeholder={placeholder} rows={6} maxLength={150} className={`${style}`} />
        )
      }

      {
        type == 'checkbox' && (
            <div className="flex gap-x-1 items-center">
                <input type="checkbox" name="" id="" className="size-4" />
                <p className="text-xs text-dark">{placeholder}</p>
            </div>
        )
      }

      {
        type == 'toggle' && (
            <div className="flex items-center justify-center">
            <div
              onClick={() => setIsOn(!isOn)}
              className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${
                isOn ? 'bg-[#e8d0c5]' : 'bg-variant-400/60'
              }`}
            >
              <div
                className={`absolute w-4 h-4 rounded-full transition-transform ${
                  isOn ? 'bg-primary right-1 top-0.5' : 'bg-white left-1 top-0.5'
                }`}
              ></div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CustomInput;
