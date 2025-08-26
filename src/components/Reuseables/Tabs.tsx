"use client"

import { useState, useEffect } from "react"
import { Home, MessageSquare, MessageText1, Profile, SearchNormal } from "iconsax-react"
import { NavLink, useLocation } from "react-router"

interface tabsProps {
  isAgent?: boolean
}

const Tabs = ({ isAgent }: tabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const location = useLocation()

  const tabList = [
    {
      title: "Home",
      icon: <Home size="22" />,
      route: "",
    },
    {
      title: "search",
      icon: <SearchNormal size="22" />,
      route: "search",
    },
    {
      title: "chats",
      icon: <MessageText1 size="22" />,
      route: "chat",
    },
    {
      title: "favourite",
      icon: <MessageSquare size="22" />,
      route: "wishlist",
    },
    {
      title: "user",
      icon: <Profile size="22" />,
      route: "profile",
    },
  ]

  const agentTabList = [
    { title: "Home", icon: <Home size="22" />, route: "" },
    {
      title: "messages",
      icon: <MessageText1 size="22" />,
      route: "chat",
    },
    // {
    //   title: "bookings",
    //   icon: <Shop size="28" />,
    //   route: "bookings",
    // },
    {
      title: "user",
      icon: <Profile size="22" />,
      route: "profile",
    },
  ]

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1]
    const currentList = isAgent ? agentTabList : tabList
    const activeIndex = currentList.findIndex((item) => item.route === currentPath)
    setActiveTab(activeIndex !== -1 ? activeIndex : 0)
  }, [location.pathname, isAgent])

  return (
    <div className="bg-white dark:bg-theme px-5 py-2.5 shadow dark:shadow-gray-800/20 z-[999999] bottom-0 fixed w-full flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
      {(isAgent ? agentTabList : tabList)?.map((item, i: number) => (
        <NavLink
          to={`/${item.route}`}
          key={i}
          onClick={() => setActiveTab(i)}
          className={`p-[10px] capitalize transition-colors duration-200 ${
            activeTab === i
              ? "bg-primary flex items-center gap-x-1 text-white rounded-xl"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          {item.icon}
          {activeTab === i && <p className="text-[14px]">{item.title}</p>}
        </NavLink>
      ))}
    </div>
  )
}

export default Tabs
