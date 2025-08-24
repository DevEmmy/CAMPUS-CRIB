"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Notification, User } from "iconsax-react"

const Head = ({ user, isAgent }: { user: any; isAgent: boolean }) => {
  const navigate = useNavigate()
  const [hasShadow, setHasShadow] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`flex items-center justify-between px-6 pt-6 pb-4 top-0 fixed w-full bg-white/95 dark:bg-theme backdrop-blur-sm z-20 transition-all duration-300 ${hasShadow ? "shadow-lg dark:shadow-gray-800/20" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture || "/placeholder.svg"}
              className="w-12 h-12 rounded-xl object-cover border-2 border-gray-100 dark:border-gray-700"
              alt="Profile"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="font-bold text-dark dark:text-white text-lg">
            {isAgent ? "Welcome back, " : "Hello, "}
            {user?.firstName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isAgent ? "Let's manage your properties" : "Explore the best hostels!"}
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/notifications")}
        className="relative p-3 bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
      >
        <Notification size={20} className="text-gray-700 dark:text-gray-300" />
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      </button>
    </div>
  )
}

export default Head
