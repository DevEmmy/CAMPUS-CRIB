import { useState } from "react";
import TitleHead from "../../components/Ui/TitleHead";
import { TbInvoice } from "react-icons/tb";
import { Fa1, Fa2 } from "react-icons/fa6";
import CustomInput from "../../components/Reuseables/CustomInput";
import { PiLock } from "react-icons/pi";
import { useNavigate } from "react-router";

const HostelName = () => {
  return (
    <div
      className={` flex items-center p-0.5 px-3 border-0 rounded-lg bg-[#EDEDED66]`}
    >
      <input
        type="text"
        defaultValue={"Campus Haven Lodge"}
        className="grow w-full py-3 font-light rounded-lg text-dark"
        disabled
      />
      <PiLock size={18} className="text-dark" />
    </div>
  );
};

const Index = ({ handleChange }: { handleChange: () => void }) => {
  return (
    <div className="grid place-items-center gap-7 ">
      <div className="flex flex-col gap-3 py-3 items-center justify-center">
        <TbInvoice size={36} className="text-dark mb-3" />
        <p className="text-center text-dark">
          Finish setting up your hostel details by creating an invoice for your
          hostel
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-[#1BA68C] rounded-xl flex flex-col gap-2 text-white p-2 rotate-[-7deg]">
          <div className="bg-white p-1.5 rounded size-fit">
            <Fa1 size={10} className="text-primary" />
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold">
              Inspection Fee Invoice
            </h3>
            <p className="text-xs">
              Create a detailed invoice for the inspection fee with payment.
            </p>
          </div>
        </div>

        <div className="bg-[#5B1BA6] rounded-xl flex flex-col gap-2 text-white p-2 rotate-[7deg]">
          <div className="bg-white p-1.5 rounded size-fit">
            <Fa2 size={10} className="text-primary" />
          </div>
          <h3 className="text-white text-sm font-semibold">
            Hostel Fee Invoice
          </h3>
          <p className="text-xs">
            Easily generate and send invoices for hostel fees with ease.
          </p>
        </div>
      </div>

      <button
        onClick={handleChange}
        className="bg-primary text-white py-3 px-5 font-bold text-base leading-5 text-center my-5 rounded-lg w-full"
      >
        Continue
      </button>
    </div>
  );
};

const InspectionFee = ({ handleChange }: { handleChange: () => void }) => {
  return (
    <div className="flex flex-col gap-2">
      <HostelName />
      <CustomInput
        type={"text"}
        name={"fee"}
        placeholder={"Inspection fee amount"}
      />
      <CustomInput
        type={"select"}
        name={"fixedTime"}
        placeholder={"Fixed time"}
        options={["1 month", "2 month"]}
      />
      <CustomInput
        type={"date"}
        name={"dateTime"}
        placeholder={"e.g, Every Monday & Wednesday at 10 AM"}
      />

      <button
        onClick={handleChange}
        className="bg-primary text-white py-3 px-5 font-bold text-base leading-5 text-center my-5 rounded-lg w-full"
      >
        Continue
      </button>
    </div>
  );
};

const HostelFee = ({
  handleGoBack,
  handleChange,
}: {
  handleChange: () => void;
  handleGoBack: () => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <HostelName />
      <CustomInput
        type={"text"}
        name={"monthlyRent"}
        placeholder={"Monthly Rent amount"}
      />
      <CustomInput
        type={"select"}
        name={"fixedTime"}
        placeholder={"Available Payment Plans"}
        options={["One time payment", "Installmental options"]}
      />

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleGoBack}
          className="bg-[#FCFCFC] text-[#636363] py-3 px-5 font-bold text-base leading-5 text-center my-5 rounded-lg w-full"
        >
          Back
        </button>

        <button
          onClick={handleChange}
          className="bg-primary text-white py-3 px-5 font-bold text-base leading-5 text-center my-5 rounded-lg w-full"
        >
          Done
        </button>
      </div>
    </div>
  );
};

const CreateInvoice = () => {
  const [activeTabs, setActiveTabs] = useState<number>(0);
  const navigate = useNavigate();
  return (
    <main className="flex-1">
      {
        activeTabs == 0 ? <TitleHead title="Invoice" /> : activeTabs == 1 ? <TitleHead title="Inspection fee" handleClick={() => setActiveTabs(0)} /> : <TitleHead title="Hostel fee" handleClick={() => setActiveTabs(1)} />
      }

      <section className="p-5 pt-20 ">
        {activeTabs == 0 ? (
          <Index handleChange={() => setActiveTabs(1)} />
        ) : activeTabs == 1 ? (
          <InspectionFee handleChange={() => setActiveTabs(2)} />
        ) : (
          <HostelFee
            handleChange={() => navigate('/successful/invoice')}
            handleGoBack={() => setActiveTabs(1)}
          />
        )}
      </section>
    </main>
  );
};

export default CreateInvoice;