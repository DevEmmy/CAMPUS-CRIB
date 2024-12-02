import React from "react";
import TitleHead from "../Ui/TitleHead";
import { MdOutlineBed } from "react-icons/md";
import { FaChevronRight, FaWifi } from "react-icons/fa6";
import { PiDesk } from "react-icons/pi";
import { BiTransfer } from "react-icons/bi";
import { BsCreditCard2Front } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";

const Checkout = () => {
  return (
    <section className="h-full w-full p-5">
      <TitleHead href={"/"} title="checkout" />
      <div className="bg-white  overflow-hidden mb-4">
        <img
          src="https://placehold.co/600x400"
          alt="Campus Haven Lodge"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Campus Haven Lodge</h2>
              <p className="text-[#64748B] flex items-center">
              <IoLocationOutline size={20}/>
                12 Sunrise Avenue</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold">₦ 120,000</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-[#64748B]">
            <div className="flex items-center space-x-2 bg-[#E5E5E54D] rounded-lg p-2 px-3">
              <MdOutlineBed size={18} />
              <span className="text-gray-500">2 Beds</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#E5E5E54D] rounded-lg p-2 px-3">
              <FaWifi size={18} />
              <span className="text-gray-500">Free Wifi</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#E5E5E54D] rounded-lg p-2 px-3">
              <PiDesk size={18} />
              <span className="text-gray-500">Desk</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
      <div className="space-y-4">
        <Link to={'/payment/bank-transfer'} className="w-full flex items-center justify-between p-4 border border-[#A64e1b] rounded-lg text-left">
          <span className="flex items-center space-x-2">
            <BiTransfer size={18} />
            <span>Pay With Bank Transfer</span>
          </span>
          <div className="bg-primary size-6 rounded-full flex items-center justify-center">
            <FaChevronRight size={15} className="text-white m-2" />
          </div>
        </Link>

        <Link to={'/payment'} className="w-full flex items-center justify-between p-4 border border-[#A64e1b] rounded-lg text-left">
          <span className="flex items-center space-x-2">
            <BsCreditCard2Front size={18} />
            <span>Pay With Card</span>
          </span>
          <div className="bg-primary size-6 rounded-full flex items-center justify-center">
            <FaChevronRight size={15} className="text-white m-2" />
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button className="w-1/2 py-2 border bg-[#E6CDBF] border-[#A64e1b] text-brown-500 rounded-lg mr-2">
          Cancel
        </button>
        <button className="w-1/2 p-3 bg-primary text-white rounded-lg ml-2">
          Proceed Payment
        </button>
      </div>
    </section>
  );
};

export default Checkout;
