import React, { useState } from "react";
import TitleHead from "../../components/Ui/TitleHead";
import { FaSortAmountDown } from "react-icons/fa";
import { CardPos } from "iconsax-react";
import { useNavigate } from "react-router";

const RecentTransactions = () => {
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const navigate  = useNavigate();
  return (
    <main>
      <TitleHead title={"Recent Transactions"} />
      <section className="p-5 pt-20 flex flex-col gap-1">
        <div className="">
          {/* Filter & Sort Row */}
          <div className="grid grid-cols-2 gap-2 justify-between items-center mb-4">
            <select
              className="p-2 rounded-lg text-sm bg-white text-[#636363] border"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>

            <button className="p-2 border text-sm text-center text-[#636363] rounded-lg flex items-center justify-center gap-2">
              Sort By <FaSortAmountDown />
            </button>
            
          </div>

          {/* Apply Filter Button */}
          <button className="w-full py-2.5 bg-[#E6CDBF] text-white rounded-md cursor-not-allowed">
            Apply Filter
          </button>

          {/* Transaction List */}
          <div className="mt-10">
            <p className="text-gray-500 text-sm">Monday, December 22nd</p>

            <div className="flex items-center gap-2 bg-[#FCFCFC] p-3 rounded-lg border mt-2" onClick={() => navigate('/payment-details')}>
              {/* Icon */}
              {/* <div className="p-2 bg-white shadow-sm rounded-md">
                <img src="https://via.placeholder.com/24" alt="icon" />
              </div> */}

              <CardPos />

              {/* Transaction Details */}
              <div className="flex-1 grow">
                <p className="font-semibold">frm Clinton Sandra</p>
                <p className="text-gray-400 text-sm">Transfer</p>
              </div>

              {/* Amount */}
              <p className="text-green-600 font-semibold text-sm">+₦120,000.00</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecentTransactions;
