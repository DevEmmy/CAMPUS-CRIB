import React from "react";
import TitleHead from "../Ui/TitleHead";
import paymentHand from "/icons/payment-02.png";
import { Link } from "react-router";

const PaymentCard = () => {
  return (
    <Link to={'/payment-details'} className="bg-[#fafafa]/50 my-2 shadow-sm p-2 rounded-xl gap-x-2 flex items-center justify-between">
      <div className="bg-[#E6CDBF]/60 rounded-xl w-fit p-2">
        <img src={paymentHand} className="" />
      </div>
      <div className="grow">
        <h3 className="text-dark font-semibold">to: Aremu Davies</h3>
        <p>Transfer</p>
      </div>
      <div>
        <p className="text-dark text-lg font-semibold">-₦120,000.00</p>
      </div>
    </Link>
  );
};
const PaymentHistory = () => {
  return (
    <main>
      <TitleHead title="Payment History" />
      <section className="p-5 pt-20 flex flex-col gap-1">
        <p className="text-variant-500">Monday, December 22nd</p>

        <PaymentCard />

        <p className="text-variant-500">Monday, December 21nd</p>

        {
            [1,2,3]?.map((item) => {
                return (
                    <PaymentCard key={item} />
                )
            })
        }
        
      </section>
    </main>
  );
};

export default PaymentHistory;
