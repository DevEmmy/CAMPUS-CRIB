import tick from "/icons/successTick.svg";
import { GoDownload } from "react-icons/go";

const SuccessfulPayment = () => {
  return (
    <section className="h-[100vh] w-full p-5 grid place-items-center">
      <div className="">
        <img src={tick} className="mx-auto" />
        <p className="mb-2.5 text-xl text-center">Successful</p>
        <p className="text-[#7d8a9e] text-center my-3">
          Your Purchase of Campus Haven Lodge has been successful. Send a
          downloaded receipt to the agent.
        </p>
        <button className="p-3 w-full bg-primary flex justify-center items-center rounded-lg text-white">
          <GoDownload size={18} /> <p>Download receipt.</p>
        </button>
      </div>
    </section>
  );
};

export default SuccessfulPayment;
