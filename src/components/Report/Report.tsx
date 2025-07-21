/* eslint-disable @typescript-eslint/no-explicit-any */
import TitleHead from "../Ui/TitleHead";

const ReportResult = ({ item }: any) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded-lg mb-2">
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full ${
            item.isSuccess ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <div>
          <p className="text-sm font-medium text-dark">
            {item.description}
          </p>
          <p className="text-xs text-variant-500">{item.transactionId}</p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-semibold ${
            item.isCredit ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.isCredit ? "+" : "-"}${item.amount.toFixed(2)}
        </p>
        <p className="text-xs text-variant-500">{item.date}</p>
      </div>
    </div>
  );
};

const Report = () => {
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

        <div className="flex-col gap-2">
          <h3 className="text-dark">Result</h3>

          <div className="flex-row gap-2.5 h-[60vh] overflow-y-scroll">
            {transactions.map((item, i) => (
              <ReportResult key={i} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Report;
