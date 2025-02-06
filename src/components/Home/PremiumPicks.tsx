/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router";
import mapMarker from "/icons/location.svg";
import { Hostel } from "../../types/Hostel";

interface PremiumPicksProps {
  hostels: Hostel[];
}

const PremiumPicks: React.FC<PremiumPicksProps> = ({ hostels }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-6 w-full">
      <h2 className="text-dark font-semibold my-4">Premium Picks</h2>
      <div className="flex flex-1 w-full overflow-x-scroll gap-x-1.5 mb-2 no-scrollbar">
        {hostels && hostels?.map((hostel: Hostel) => (
          <div onClick={() => navigate(`/hostel/${hostel._id}`)} className="bg-white min-w-[80vw]" key={hostel._id}>
            <div className="relative w-[90%] h-[230px]">
              <img
                src={hostel.images[0]}
                alt="Modern building with trees"
                className="rounded-xl w-full h-full object-cover"
                onClick={() => navigate(`/hostel/${hostel._id}`)}
              />
              <button className="absolute top-2 right-2 bg-white/80 bg-opacity-25  rounded-xl p-2 shadow-md">
                {/* <RiHeart2Line /> */}
                <IoIosHeartEmpty className="size-5" />
              </button>
            </div>
            <h3
              className="font-semibold mt-4 text-dark"
            >
              {hostel.hostelName}
            </h3>
            <div className="text-gray-500 flex mt-1 items-center">
              <img src={mapMarker} className="size-5 mr-1" />
              <span>{hostel.location}</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm text-[#64748B]">
              {hostel.description}
            </p>
          </div>
        ))}
        {
          hostels?.length == 0 && (
            <div className="text-center w-full flex items-center justify-center py-10">No hostels available</div>
          )
        }
      </div>
    </div>
  );
};

export default PremiumPicks;
