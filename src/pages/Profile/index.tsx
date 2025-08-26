"use client"

import TitleHead from "../../components/Ui/TitleHead"
import {
  ArrowRight2,
  Logout,
  Notification,
  User,
  // Crown,
  Headphone,
  Eye,
  Star,
  Building,
  Clock,
  Shield,
  Edit,
  Eye as EyeIcon,
  Moon,
  Sun1,
} from "iconsax-react"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useHostelStore } from "../../store/useHostelsStore"
import { useUserStore } from "../../store/UseUserStore"
import { useConversationStore } from "../../store/useConversationStore"
import { friendlyTimeAgo } from "../../utils/dateFormat"
import ImageModal from "../../components/Ui/ImageModal"
import ShareButton from "../../components/Reuseables/ShareButton"
import { useThemeStore } from "../../store/useThemeStore"

const Profile = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useThemeStore()
  const [userProfile, setUserProfile] = useState<any | null>(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  const { user } = useUserStore()
  const { clearConversations } = useConversationStore()
  const { clearHostels } = useHostelStore()

  const localUser = localStorage.getItem("user")

  useEffect(() => {
    setUserProfile(user || (localUser ? JSON.parse(localUser) : null))
  }, [user, localUser])

  const profileItems = [
    {
      title: "Personal Details",
      link: "/personal-details",
      icon: <User size={20} />,
      description: "Manage your account information",
    },
    // {
    //   title: "My Bookings",
    //   link: "/my-bookings",
    //   icon: <Calendar size={20} />,
    //   description: "View your booking history",
    // },
    // {
    //   title: "Saved Hostels",
    //   link: "/saved-hostels",
    //   icon: <ArchiveBook size={20} />,
    //   description: "Your favorite hostels",
    // },
    // {
    //   title: "Notifications",
    //   link: "/notifications",
    //   icon: <Notification size={20} />,
    //   description: "Manage your notifications",
    // },
    // {
    //   title: "App Settings",
    //   link: "/setting/app",
    //   icon: <Setting3 size={20} />,
    //   description: "Customize your experience",
    // },
    {
      title: "Contact Support",
      link: "/contact-support",
      icon: <Headphone size={20} />,
      description: "Get help when you need it",
    },
  ]

  const agentProfileItems = [
    {
      title: "Personal Details",
      link: "/personal-details",
      icon: <User size={20} />,
      description: "Manage your account information",
    },
    {
      title: "My Listings",
      link: "/",
      icon: <Building size={20} />,
      description: "Manage your hostel listings",
    },
    // {
    //   title: "Recent Transactions",
    //   link: "/recent-transactions",
    //   icon: <CardPos size={20} />,
    //   description: "Track your earnings",
    // },
    {
      title: "Notifications",
      link: "/notifications",
      icon: <Notification size={20} />,
      description: "Manage your notifications",
    },
    // {
    //   title: "App Settings",
    //   link: "/setting/app",
    //   icon: <Setting3 size={20} />,
    //   description: "Customize your experience",
    // },
    {
      title: "Contact Support",
      link: "/contact-support",
      icon: <Headphone size={20} />,
      description: "Get help when you need it",
    },
  ]

  const handleLogout = async () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("accountType")

    useUserStore.getState().clearUser()
    clearConversations()
    clearHostels()
    navigate("/account-type", { replace: true })
  }

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    setIsImageModalOpen(true)
  }

  const profileUrl = `${window.location.origin}/agent/${userProfile?._id}`
  const isAgent = userProfile?.userType === "AGENT"

  return (
    <div className="min-h-dvh dark:bg-theme">
      <TitleHead title="Profile" />
    

      <section className="p-6 pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  <img
                    src={
                      userProfile?.profilePicture ||
                      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" 
                    }
                    alt="Profile"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        userProfile?.profilePicture ||
                          "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
                      )
                    }
                  />
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Edit size={16} className="text-white" />
                </button>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-2xl font-bold text-dark dark:text-white mb-1">
                    {userProfile?.firstName} {userProfile?.lastName}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 truncate" title={userProfile?.email}>
                    {userProfile?.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isAgent
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {isAgent ? "Agent" : "Student"}
                  </div>
                  {/* {isAgent && (
                    <Link 
                      to="/pricing" 
                      className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all"
                    >
                      <Crown size={14} />
                      Upgrade
                    </Link>
                  )} */}
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  {userProfile?.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock size={16} />
                      <span>{userProfile.phone}</span>
                    </div>
                  )}
                  {userProfile?.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Building size={16} />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock size={16} />
                    <span>Member since {friendlyTimeAgo(userProfile?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-[#222] rounded-lg flex items-center justify-center">
                  <Eye size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark dark:text-white">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Profile Views</p>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Star size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark dark:text-white">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Profile Actions */}
          {isAgent && (
            <div className="bg-white dark:bg-theme rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">Profile Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <ShareButton text={profileUrl} variant="button" className="w-full">
                  Share Profile
                </ShareButton>

                <Link
                  to={`/agent/${userProfile?._id}`}
                  className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#222] text-gray-700 dark:text-gray-300 py-4 px-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <EyeIcon size={20} />
                  View Preview
                </Link>
              </div>
            </div>
          )}

          {/* Account Details */}
          <div className="">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">Account Details</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-[#222] rounded-lg flex items-center justify-center">
                    <Shield size={16} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-dark dark:text-white">Account Status</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-[#222] rounded-lg flex items-center justify-center">
                    <Clock size={16} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-dark dark:text-white">Email Verified</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userProfile?.emailVerified ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`w-3 h-3 rounded-full ${userProfile?.emailVerified ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                </div>
              </div>

              {/* <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Calendar size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-dark">Last Login</p>
                    <p className="text-sm text-gray-500">{friendlyTimeAgo(userProfile?.lastLogin)}</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Menu Items */}
          <div className="">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-1">
              {(isAgent ? agentProfileItems : profileItems).map((item, index) => (
                <Link key={index} to={item.link} className="block">
                  <div className="flex items-center gap-4 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-[#222] transition-all group">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-[#222] rounded-xl flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-all">
                      <div className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark dark:text-white group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                    <ArrowRight2
                      size={20}
                      className="text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors"
                    />
                  </div>
                </Link>
              ))}
               <button
      onClick={toggleTheme}
      className="w-full flex items-center gap-4 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-[#111] transition-all group"
    >
      <div className="w-12 h-12 bg-gray-100 dark:bg-[#222] rounded-xl flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-all">
        <div className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">
          {theme === "light" ? <Moon size={20} /> : <Sun1 size={20} />}
        </div>
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-dark dark:text-white group-hover:text-primary transition-colors">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Switch to {theme === "light" ? "dark" : "light"} theme
        </p>
      </div>
      <ArrowRight2
        size={20}
        className="text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors"
      />
    </button>
            </div>
          </div>

          {/* Logout Section */}
          <div className="">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 py-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group"
            >
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-all">
                <Logout size={20} className="text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-red-600 dark:text-red-400">Log Out</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sign out of your account</p>
              </div>
              <ArrowRight2 size={20} className="text-red-400 dark:text-red-500" />
            </button>
          </div>

          {/* Agent Wallet Section */}
          {/* {isAgent && (
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Wallet Balance</h3>
                <Wallet size={24} />
              </div>
              <div className="text-3xl font-bold mb-4">{formatPrice(58000)}</div>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl font-medium transition-all">
                  View Report
                </button>
                <button className="bg-white hover:bg-gray-100 text-orange-600 py-3 px-4 rounded-xl font-medium transition-all">
                  Withdraw
                </button>
              </div>
            </div>
          )} */}
        </div>
        {/* Image Modal */}
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageSrc={selectedImage}
          imageAlt="Profile Picture"
        />
      </section>
    </div>
  )
}

export default Profile
