import { useState } from "react";
import TitleHead from "../../components/Ui/TitleHead";
import { FaSortAmountDown } from "react-icons/fa";
import { CardPos } from "iconsax-react";
import { useNavigate } from "react-router";
import { formatPrice } from "../../utils/formatPrice";

const RecentTransactions = () => {
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-dvh text-gray-900 dark:text-gray-100">
      <TitleHead title={"Recent Transactions"} />
      <section className="p-5 pt-20 flex flex-col gap-1">
        <div className="">
          {/* Filter & Sort Row */}
          <div className="grid grid-cols-2 gap-2 justify-between items-center mb-4">
            <select
              className="p-2 rounded-lg text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[#636363] dark:text-gray-300"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>

            <button className="p-2 border border-gray-300 dark:border-gray-700 text-sm text-center text-[#636363] dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center gap-2">
              Sort By <FaSortAmountDown />
            </button>
          </div>

          {/* Apply Filter Button */}
          <button className="w-full py-2.5 bg-[#E6CDBF] text-white rounded-md cursor-not-allowed opacity-80 dark:opacity-60">
            Apply Filter
          </button>

          {/* Transaction List */}
          <div className="mt-10">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Monday, December 22nd
            </p>

            <div
              className="flex items-center gap-2 bg-[#FCFCFC] dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mt-2 cursor-pointer"
              onClick={() => navigate("/payment-details")}
            >
              {/* Transaction Icon */}
              <CardPos className="text-gray-700 dark:text-gray-300" />

              {/* Transaction Details */}
              <div className="flex-1 grow">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  frm Clinton Sandra
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  Transfer
                </p>
              </div>

              {/* Amount */}
              <p className="text-green-600 font-semibold text-sm">
                +{formatPrice(120000)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecentTransactions;
