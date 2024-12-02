import React from "react";
import back from "/icons/back.svg";
import { Link } from "react-router";
import { IoCopyOutline } from "react-icons/io5";

const BankTransfer = () => {
  return (
    <section className="size-full p-5">
      <div className="flex items-center justify-between mb-4 pt-5 pb-3">
        <Link
          to={"/payment"}
          className="rounded-full bg-primary size-7 flex items-center justify-center"
        >
          <img src={back} alt="back" className="size-3.5" />
        </Link>
        <h1 className="text-xl font-bold">Bank Transfer</h1>
        <div className="w-6"></div>
      </div>

      <div className="p-4">
        <p className="text-center mb-4">
          Transfer <span className="text-primary font-bold">₦ 120,000</span>
        </p>
        <div className="border-2 border-dashed border-primary text-dark p-4 rounded-md mb-4">
          <div className="mb-2">
            <p className="font-bold">BANK NAME</p>
            <p className="text-sm">Access Bank</p>
          </div>
          <div className="mb-2">
            <p className="font-bold">ACCOUNT NAME</p>
            <p className="text-sm">Aremu Davies</p>
          </div>
          <div className="mb-2 flex justify-between items-center">
            <div>
              <p className="font-bold">Account Number</p>
              <p className="text-sm">26781908734</p>
            </div>
            <IoCopyOutline size={16} className="text-primary" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">Amount</p>
              <p className="text-sm">₦ 120,000</p>
            </div>
            {/* <i className="fas fa-copy text-primary"></i> */}
            <IoCopyOutline size={16} className="text-primary"/>
          </div>
        </div>
        <button className="bg-primary text-white py-2 px-4 rounded-md w-full mb-4">
          i've sent the money
        </button>
        <p className="text-dark text-sm text-center">Change Payment Method</p>
      </div>
    </section>
  );
};

export default BankTransfer;
