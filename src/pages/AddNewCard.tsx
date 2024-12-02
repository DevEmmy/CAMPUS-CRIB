import React, { ChangeEvent } from "react";
import back from "/icons/back.svg";
import BankCard from "../components/Payment/BankCard";
import mastercard from "/icons/mastercard.png";
import { Link } from "react-router";

const AddNewCard = () => {
  const formatCardNumber = (cardNo: string) => {
    return cardNo
      .replace(/\W/gi, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  return (
    <section className="size-full p-5">
      <div className="flex items-center justify-between mb-4 pt-5 pb-3">
        <Link to={'/payment'} className="rounded-full bg-primary size-7 flex items-center justify-center">
          <img src={back} alt="back" className="size-3.5" />
        </Link>
        <h1 className="text-xl font-bold">Add New Card</h1>
        <div className="w-6"></div>
      </div>

      <BankCard />

      <div className="flex-row gap-y-5">
        <div>
          <label>Card Holder's name</label>
          <input
            type="text"
            value="Bello Abdulmalik"
            className="w-full outline-[#DFBFAD] flex items-center justify-between border-[0.5px] border-[#777] rounded-lg p-3"
          />
        </div>

        <div className="my-2">
          <label>Card Number</label>
          <div className="flex items-center hover:outline-[#DFBFAD] justify-between border border-[#777]   rounded-lg">
            <input
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = formatCardNumber(e.target.value);
              }}
              maxLength={19}
              placeholder="XXXX XXXX XXXX XXXX"
              className="p-3 flex-grow outline-none"
            />
            <img src={mastercard} className="w-fit h-6 mr-3" />
          </div>
        </div>

        <div className="grid grid-cols-2  gap-2 justify-between items-center">
          <div className="items-center ">
            <label className="text-gray-500 mb-2">Expiry Date</label>
            <input
              type="month"
              className="w-full p-3 border border-[#777] outline-[#DFBFAD] rounded-lg"
            />
          </div>
          <div className="">
            <label className="text-gray-500 mb-2">CVV</label>
            <input
              type="password"
              maxLength={3}
              placeholder="***"
              className="w-full p-3 border border-[#777] rounded-lg hover:outline-[#DFBFAD]"
            />
          </div>
        </div>
      </div>

        <button className="min-w-full w-full bg-primary text-white p-3 my-9  rounded-lg font-bold bottom-10 ">
          Add new card
        </button>
    </section>
  );
};

export default AddNewCard;
