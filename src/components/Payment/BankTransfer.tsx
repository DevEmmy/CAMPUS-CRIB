import {  useNavigate, } from "react-router";
import { IoCopyOutline } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";

const BankTransfer = () => {
  const navigate = useNavigate();
  
  return (
    <section className="size-full p-5">
      <button
        onClick={() => navigate(-1)}
        className="border border-primary rounded-lg"
      >
        <RiCloseLine className="size-8  text-primary" />
      </button>


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
            <IoCopyOutline size={16} className="text-primary" />
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
