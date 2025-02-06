import React, { useState } from "react";
import CustomReturn from "../../components/Reuseables/CustomReturn";
import AllNotifications from "../../components/Notifications/AllNotifications";
import BiddingResultNotifications from "../../components/Notifications/BiddingResultNotifications";
import NewListingNotifications from "../../components/Notifications/NewListingNotifications";
import PaymentNotifications from "../../components/Notifications/PaymentNotifications";

const NotificationsAlert: React.FC = () => {
  const notificationRoutes = [
    { type: "All", component: <AllNotifications /> },
    { type: "Bidding Result", component: <BiddingResultNotifications /> },
    { type: "New Listing", component: <NewListingNotifications /> },
    { type: "Payments", component: <PaymentNotifications /> },
  ];

  const [selectedTab, setSelectedTab] = useState("All");

  const activeTab =
    "bg-primary py-2 px-5 rounded-md text-white text-[14px] leading-5 font-normal text-nowrap capitalize";
  const normalTab =
    "text-[#7D8A9E] text-[14px] leading-5 font-normal text-nowrap capitalize";


    const handleTabChange = (tab: string) => {
      setSelectedTab(tab);
    };
  return (
    <section className="h-dvh w-full p-2">
      <CustomReturn title="Notification Alerts" />

      <div className="p-2">
        <p className="leading-6 text-[16px] font-normal text-black">
          Stay updated on new listing, bidding result and payment confirmation
        </p>

        <div className="my-5">
          {/* <SearchInputs /> */}
          <div className="h-full">
            <div className="flex items-center gap-5 p-2 justify-center">
            {notificationRoutes.map((route) => (
                <button
                  key={route.type}
                  className={
                    selectedTab === route.type ? activeTab : normalTab
                  }
                  onClick={() => handleTabChange(route.type)}
                >
                  {route.type}
                </button>
              ))}
            </div>

            <div className="h-full w-full mt-5">
              {notificationRoutes.find((route) => route.type === selectedTab)
                ?.component}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationsAlert;
