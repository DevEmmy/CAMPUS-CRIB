import React from "react";
import CustomReturn from "../../components/Reuseables/CustomReturn";
import SearchInputs from "../../components/Reuseables/SearchInputs";
import { NavLink, Outlet } from "react-router";

const NotificationsAlert: React.FC = () => {
  const notificationRoutes = [
    {
      type: "all",
      route: "/notifications",
    },
    {
      type: "bidding result",
      route: "bidding-result",
    },
    {
      type: "New listing",
      route: "new-listing",
    },
    {
      type: "payments",
      route: "payments",
    },
  ];

  const activeLink =
    "bg-primary py-2 px-5 rounded-md text-white text-[14px] leading-5 font-normal text-nowrap capitalize";
  const normalLink =
    "text-[#7D8A9E] text-[14px] leading-5 font-normal text-nowrap capitalize";
  return (
    <section className="h-dvh w-full p-2">
      <CustomReturn title="Notification Alerts" />

      <div className="p-2">
        <p className="leading-6 text-[16px] font-normal text-black">
          Stay updated on new listing, bidding result and payment confirmation
        </p>

        <div className="my-5">
          <SearchInputs />
          <div className="h-full">
            <div className="flex items-center gap-5 p-2 justify-center">
              {notificationRoutes.map((route, idx) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  key={idx}
                  to={route.route}
                >
                  {route.type}
                </NavLink>
              ))}
            </div>

            <div className="h-full w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationsAlert;
