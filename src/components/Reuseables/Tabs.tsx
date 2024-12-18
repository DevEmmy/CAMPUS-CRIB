import React, { useState } from "react";
import home from "/icons/home-02.svg";
import appointment from "/icons/appointment-02.svg";
import favourite from "/icons/favourite-square.svg";
import search from "/icons/search-02.svg";
import user from "/icons/user.svg";
import comment from "/icons/comment-01.svg";
import store from "/icons/store-01.svg";
import { NavLink } from "react-router";

interface tabsProps {
  isAgent?: boolean;
}

const Tabs = ({ isAgent }: tabsProps) => {
  const [activeTab, setActiveTab] = useState<number>();
  const tabList = [
    { title: "Home", icon: home, route: 'student' },
    { title: "search", icon: search, route: 'search' },
    { title: "appointment", icon: appointment, route: 'appointment' },
    { title: "favourite", icon: favourite, route: 'wishlist' },
    { title: "user", icon: user, route: 'profile' },
  ];

  const agentTabList = [
    { title: "Home", icon: home, route: 'agent' },
    { title: "Comments", icon: comment, route: 'comments' },
    { title: "store", icon: store, route: 'store' },
    { title: "user", icon: user, route: 'profile' },
  ];
  return (
    <div className="bg-white px-5 py-2.5 shadow z-[999999]  bottom-0 fixed w-full flex items-center justify-between">
      {isAgent
        ? agentTabList?.map((item, i: number) => (
            <div
              key={i}
              onClick={() => setActiveTab(i)}
              className={`p-3 ${
                activeTab == i &&
                "bg-primary flex items-center gap-x-1 text-white rounded-xl"
              }`}
            >
              {activeTab == i && <p>{item?.title}</p>}
              <img src={item?.icon} className="size-5" />
            </div>
          ))
        : tabList?.map((item, i: number) => (
            <NavLink
            to={`/${item.route}`}
              key={i}
              onClick={() => setActiveTab(i)}
              className={`p-3 ${
                activeTab == i &&
                "bg-primary flex items-center gap-x-1 text-white rounded-xl"
              }`}
            >
              {activeTab == i && <p>{item?.title}</p>}
              <img src={item?.icon} className="size-5" />
            </NavLink>
          ))}
    </div>
  );
};

export default Tabs;
