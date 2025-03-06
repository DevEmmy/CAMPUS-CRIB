import React from "react";
import TitleHead from "../../components/Ui/TitleHead";
import {  useParams } from "react-router";
import { IoCopyOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5";



const ViewInvoice: React.FC = () => {
  const { invoiceType } = useParams();
  return (
    <main>
      <TitleHead title="" />

      <section className="p-5 mt-14">
        <h3
          className={` font-medium capitalize text-xl ${
            invoiceType == "hostel" ? "text-[#5B1BA6]" : "text-[#1BA68C]"
          }`}
        >
          {invoiceType} Fee invoice
        </h3>
        <p className="text-dark font-medium">Campus Haven Lodge</p>

        <section className="mt-4 flex flex-col gapx-1.5 py-2.5">
          <div className="flex flex-col gap-1.5">
            <label className="capitalize text-dark">
              {invoiceType} fee amount
            </label>
            <div className="bg-[#FCFCFC]  flex items-center rounded-xl px-1">
              <input
                type="text"
                className="grow px-1.5 py-2.5 rounded-xl bg-[#FCFCFC] text-dark"
                value={"$5000"}
              />
              <IoCopyOutline size={18} className="text-dark" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="capitalize text-dark">
              {invoiceType} Time/Plans
            </label>
            <div className="bg-[#FCFCFC]  flex items-center rounded-xl px-1">
              <input
                type="text"
                className="grow px-1.5 py-2.5 rounded-xl bg-[#FCFCFC] text-dark"
                value={"One time payment"}
              />
              <IoCopyOutline size={18} className="text-dark" />
            </div>
          </div>
        </section>
      </section>

      <section className="mt-2 px-5">
        <h3 className="text-dark font-semibold text-lg">
          Non-Editable by Agents
        </h3>

        <div className="flex flex-col gap-1.5">
          <label className="capitalize text-dark">Service fee</label>
          <div className="bg-[#FCFCFC]  flex items-center rounded-xl px-1">
            <input
              type="text"
              className="grow px-1.5 py-2.5 rounded-xl bg-[#FCFCFC] text-dark"
              value={"$100"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="capitalize text-dark">Invoice date</label>
          <div className="bg-[#FCFCFC]  flex items-center rounded-xl px-1">
            <input
              type="text"
              className="grow px-1.5 py-2.5 rounded-xl bg-[#FCFCFC] text-dark"
              value={"Auto-filled with the current date"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="capitalize text-dark">Invoice number</label>
          <div className="bg-[#FCFCFC]  flex items-center rounded-xl px-1">
            <input
              type="text"
              className="grow px-1.5 py-2.5 rounded-xl bg-[#FCFCFC] text-dark"
              value={"Auto-generated"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="capitalize text-dark">Account number</label>
          <div className="bg-[#FCFCFC]  flex items-center rounded-xl px-1">
            <input
              type="text"
              className="grow px-1.5 py-2.5 rounded-xl bg-[#FCFCFC] text-dark"
              value={"https/paystacktitan/Pay"}
            />
            <IoCopyOutline size={18} className="text-dark" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-[#D62F2F33] text-[#D62F2F] flex items-center justify-center p-3 rounded-xl">
            delete <IoTrashOutline className="text-[#D62F2F]"/>
          </button>

          <button className="bg-primary text-white flex items-center justify-center p-3 rounded-xl">
            Edit  <IoPencilOutline />
          </button>
        </div>
      </section>
    </main>
  );
};

export default ViewInvoice;
