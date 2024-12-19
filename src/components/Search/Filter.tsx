import React from "react";
import { RiCloseFill } from "react-icons/ri";

const Filter = () => {
  return (
    // <div>

      <div className="">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Your Location"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B85A6]"
            />
            <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-500"></i>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price Range
          </label>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#1B85A6] font-bold">₦500</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <input type="range" min="0" max="500" className="w-full text-[#1B85A6]" />
          </div>
          <div className="flex items-center justify-between gap-x-2">
            <input
              type="text"
              placeholder="₦0"
              className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B85A6]"
            />
            <input
              type="text"
              placeholder="₦500"
              className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B85A6]"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Room Type
          </label>
          <div className="flex space-x-2">
            <button className="w-1/2 px-3 py-2 bg-[#1B85A6] text-white rounded-md">
              Single Room
            </button>
            <button className="w-1/2 px-3 py-2 border rounded-md">
              Shared Room
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amenities
          </label>
          <div className="flex space-x-2 flex-wrap">
            <button className="px-3 py-2 border rounded-md">Wi-Fi</button>
            <button className="px-3 py-2 border rounded-md">Laundry</button>
            <button className="px-3 py-2 border rounded-md">
              24/7 Security
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Availability
          </label>
          <div className="flex space-x-2">
            <button className="w-1/2 px-3 py-2 border rounded-md">
              Available Now
            </button>
            <button className="w-1/2 px-3 py-2 border rounded-md">
              Available in
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="w-1/2 px-3 py-2 bg-gray-300 text-gray-700 rounded-md">
            Reset Filters
          </button>
          <button className="w-1/2 px-3 py-2 bg-primary text-white rounded-md">
            Apply Filter
          </button>
        </div>
      </div>
    // </div>
  );
};

export default Filter;