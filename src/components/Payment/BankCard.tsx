import card1 from "/icons/bankCardDesign1.svg";
import card2 from "/icons/bankCardDesign2.svg";
import card3 from "/icons/bankCardDesign3.svg";

const BankCard = () => {
  return (
    <div className="bg-[#1B85A6] rounded-lg p-4 mb-4 text-white min-w-[94%] relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="bg-[#44B1D3] rounded-full w-6 h-6 flex items-center justify-center" />
          <div className="bg-white -ml-3 rounded-full w-6 h-6 flex items-center justify-center" />
        </div>

        <div className="bg-[#000] ">
          <img src={card1} className="size-5 absolute top-0 right-0" />
          <img
            src={card2}
            className="size-9 absolute top-3 right-3 -mr-3 -mt-3"
          />
          <img
            src={card3}
            className="size-12 absolute top-5 right-5 -mr-5 -mt-5"
          />
        </div>
      </div>

      <div className="text-white text-lg font-bold tracking-widest my-2 flex items-center w-full">
        **** **** **** 3457
      </div>
      <div className="flex justify-between text-gray-300">
        <div className="text-center">
          <p className="tex text-[#bbb]">Expiry Date</p>
          <p className="text-lg font-bold">06/24</p>
        </div>
        <div>
          <p className="text text-[#cbc]">Card Holder Name</p>
          <p className="text-lg font-bold">Bello Abdulmalik</p>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
