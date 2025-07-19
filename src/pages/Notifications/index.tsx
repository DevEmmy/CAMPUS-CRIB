import React, { useState } from "react";
import TitleHead from "../../components/Ui/TitleHead";
import AllNotifications from "../../components/Notifications/AllNotifications";
import NewListingNotifications from "../../components/Notifications/NewListingNotifications";
import { Notification, Home } from "iconsax-react";

const NotificationsAlert: React.FC = () => {
  const notificationRoutes = [
    { 
      type: "All", 
      component: <AllNotifications />,
      icon: <Notification size={20} />,
      count: 12
    },
    // { 
    //   type: "Bidding Result", 
    //   component: <BiddingResultNotifications />,
    //   icon: <Star size={20} />,
    //   count: 3
    // },
    { 
      type: "New Listing", 
      component: <NewListingNotifications />,
      icon: <Home size={20} />,
      count: 5
    },
    // { 
    //   type: "Payments", 
    //   component: <PaymentNotifications />,
    //   icon: <Wallet size={20} />,
    //   count: 4
    // },
  ];

  const [selectedTab, setSelectedTab] = useState("All");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <TitleHead title="Notifications" />
      
      <section className="p-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-dark mb-2">Notifications</h1>
                <p className="text-gray-600">Stay updated with your latest activities</p>
              </div>
              {/* <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                <Filter size={16} />
                Filter
              </button> */}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100">
              <div className="flex">
                {notificationRoutes.map((route) => (
                  <button
                    key={route.type}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-all relative ${
                      selectedTab === route.type
                        ? "text-primary border-b-2 border-primary bg-primary/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => handleTabChange(route.type)}
                  >
                    <div className={selectedTab === route.type ? "text-primary" : "text-gray-500"}>
                      {route.icon}
                    </div>
                    <span>{route.type}</span>
                    {route.count > 0 && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedTab === route.type 
                          ? "bg-primary text-white" 
                          : "bg-gray-200 text-gray-600"
                      }`}>
                        {route.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {notificationRoutes.find((route) => route.type === selectedTab)?.component}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotificationsAlert;
