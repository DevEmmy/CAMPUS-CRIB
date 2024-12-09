/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router";
import mapMarker from "/icons/location.svg";

const PremiumPicks = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-6">
      <h2 className="text-dark font-semibold my-4">Premium Picks</h2>
      <div className="flex w-full overflow-x-scroll gap-x-1.5 mb-1.5">
        {[1, 2, 3, 4, 5]?.map((item) => (
          <div className="bg-white min-w-[80vw]" key={item}>
            <div className="relative">
              <img
                src="https://placehold.co/320x180"
                alt="Modern building with trees"
                className="rounded-2xl w-full h-40 object-cover"
                onClick={() => navigate('/hostel/89765')}
              />
              <button className="absolute top-2 right-2 bg-white/80 bg-opacity-25  rounded-xl p-2 shadow-md">
                {/* <RiHeart2Line /> */}
                <IoIosHeartEmpty className='size-5' />
              </button>
            </div>
            <h3 className="font-semibold mt-4 text-dark" onClick={() => navigate('/hostel/5676')}>Aspire Stay Inn</h3>
            <div className="text-gray-500 flex mt-1 items-center">
              <img src={mapMarker} className="size-5 mr-1" />
              <span>123 Harmony Estate</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm text-[#64748B]">
              A cozy and affordable hostel offering free Wi-Fi, 24/7 security,
              and a study loun...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumPicks;
