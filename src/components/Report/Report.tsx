/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TitleHead from "../Ui/TitleHead";
import paymentHand from "/icons/payment-neutral.png";
import folderLibrary from "/icons/folder-library.png";

const ReportResult = ({ item }: any) => {
  return (
    <div className="bg-[#FCFCFC] flex-col gap-2 my-4 p-2.5 rounded-xl ">
      <div className=" flex items-center gap-2">
        <div className="bg-[#F6F6F6] p-3 rounded-xl">
          <img src={paymentHand} className="" />
        </div>

        <div>
          <div className="flex gap-3 items-center justify-end text-sm text-variant-500">
            <div className="flex gap-1">
              <p>{item?.date}</p>
              <p>{item?.transactionId}</p>
            </div>
            <div>
              {item?.isSuccess ? (
                <p className="text-green-700">Successful</p>
              ) : (
                <p className="text-[#B90000]">Failed</p>
              )}
            </div>
          </div>
          <p
            className={`${
              item?.isCredit ? "text-green-900" : "text-[#B90000]"
            } font-medium text-sm`}
          >
            Amount: {item?.isCredit ? item?.amount : `- ${item?.amount}`}$
          </p>
        </div>
      </div>
      <p className="text-xs text-dark italic mt-2">{item?.description}</p>
    </div>
  );
};

const Report = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isResult, setIsResult] = useState<boolean>(true);
  useEffect(() => {
    setIsResult(true)
  }, [])
  const transactions = [
    {
      date: "2025-02-09",
      transactionId: "TXN123456",
      isSuccess: true,
      amount: 150.0,
      description: "Payment received from client",
      isCredit: true,
    },
    {
      date: "2025-02-08",
      transactionId: "TXN123457",
      isSuccess: false,
      amount: 200.0,
      description: "Failed withdrawal attempt",
      isCredit: false,
    },
    {
      date: "2025-02-07",
      transactionId: "TXN123458",
      isSuccess: true,
      amount: 75.5,
      description: "Purchase of office supplies",
      isCredit: false,
    },
    {
      date: "2025-02-06",
      transactionId: "TXN123459",
      isSuccess: true,
      amount: 500.0,
      description: "Freelance project payment",
      isCredit: true,
    },
    {
      date: "2025-02-05",
      transactionId: "TXN123460",
      isSuccess: true,
      amount: 100.0,
      description: "Subscription fee deduction",
      isCredit: false,
    },
  ];

  return (
    <main>
      <TitleHead title="Report" />
      <section className="p-5 h-full w-full mt-14">
        <div className="flex">
          <p>Total Earnings: &nbsp;</p>
          <p className="text-primary font-semibold">$00:00</p>
        </div>

        <div className="flex">
          <p>Withdrawable Balance: &nbsp;</p>
          <p className=" ">$00:00</p>
        </div>

        <div className="py-5 flex-col gap-2">
          <h3 className="text-dark">Statment Period</h3>
          <input
            type="date"
            name=""
            className="border w-full rounded-xl p-2"
            id=""
          />
        </div>

        {isResult ? (
          <div className="flex-col gap-2">
            <h3 className="text-dark">Result</h3>

            <div className="flex-row gap-2.5 h-[60vh] overflow-y-scroll">
              {transactions.map((item, i) => (
                <ReportResult key={i} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[50vh] grid place-items-center">
            <div className="grid place-items-center">
              <img src={folderLibrary} className="" />
              <p className="text-variant-500 font-light text-sm ">
                No transactions meet your selected criteria
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Report;
