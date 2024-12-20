/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router";
import mapMarker from "/icons/location.svg";
import { fetchAllHostels } from "../../lib/fetchHostels";
import { Hostel } from "../../types/Hostel";

const PremiumPicks: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>()
  const fetchHostels = async () => {
    const response = await fetchAllHostels()
    if(response) setHostels(response)
  }
  useEffect(() => {
    fetchHostels()
  }, [])
  const navigate = useNavigate();
  return (
    <div className="mb-6">
      <h2 className="text-dark font-semibold my-4">Premium Picks</h2>
      <div className="flex w-full overflow-x-scroll gap-x-1.5 mb-1.5">
        {hostels?.map((hostel: Hostel) => (
          <div className="bg-white min-w-[80vw]" key={hostel._id}>
            <div className="relative">
              <img
                // src="https://placehold.co/320x180"
                src={hostel.images[0]}
                alt="Modern building with trees"
                className="rounded-2xl w-full h-40 object-cover"
                onClick={() => navigate('/hostel/89765')}
              />
              <button className="absolute top-2 right-2 bg-white/80 bg-opacity-25  rounded-xl p-2 shadow-md">
                {/* <RiHeart2Line /> */}
                <IoIosHeartEmpty className='size-5' />
              </button>
            </div>
            <h3 className="font-semibold mt-4 text-dark" onClick={() => navigate('/hostel/5676')}>{hostel.hostelName}</h3>
            <div className="text-gray-500 flex mt-1 items-center">
              <img src={mapMarker} className="size-5 mr-1" />
              <span>{hostel.location}</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm text-[#64748B]">
            {hostel.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumPicks;
