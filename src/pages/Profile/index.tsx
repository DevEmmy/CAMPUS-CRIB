import TitleHead from "../../components/Ui/TitleHead";
import {
  ArrowRight2,
  Logout,
  Notification,
  User,
  Calendar,
  CardPos,
  ArchiveBook,
  Setting3,
  Headphone,
  Wallet,
  Crown,
} from "iconsax-react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useHostelStore } from "../../store/useHostelsStore";
import { useUserStore } from "../../store/UseUserStore";
import { useConversationStore } from "../../store/useConversationStore";

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any | null>(null);

  const { user } = useUserStore();
  const { clearConversations } = useConversationStore();
  const { clearHostels } = useHostelStore();

  const localUser = localStorage.getItem("user");

  useEffect(() => {
    console.log("User details", localUser);
    setUserProfile(user || (localUser ? JSON.parse(localUser) : null));
  }, []);

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
    //   title: "Payment History",
    //   link: "/payment-history",
    //   icon: <CardPos size={20} />,
    //   description: "Track your transactions",
    // },
    // {
    //   title: "Saved Hostels",
    //   link: "/saved-hostels",
    //   icon: <ArchiveBook size={20} />,
    //   description: "Your favorite hostels",
    // },
    {
      title: "Notifications",
      link: "/notifications",
      icon: <Notification size={20} />,
      description: "Manage your notifications",
    },
    // {
    //   title: "App Settings",
    //   link: "/app-settings",
    //   icon: <Setting3 size={20} />,
    //   description: "Customize your experience",
    // },
    // {
    //   title: "Contact Support",
    //   link: "/contact-support",
    //   icon: <Headphone size={20} />,
    //   description: "Get help when you need it",
    // },
  ];

  const agentProfileItems = [
    {
      title: "Personal Details",
      link: "/personal-details",
      icon: <User size={20} />,
      description: "Manage your account information",
    },
    {
      title: "My Bookings",
      link: "/my-bookings",
      icon: <Calendar size={20} />,
      description: "View your booking history",
    },
    {
      title: "Recent Transactions",
      link: "/recent-transactions",
      icon: <CardPos size={20} />,
      description: "Track your earnings",
    },
    {
      title: "Saved Hostels",
      link: "/saved-hostels",
      icon: <ArchiveBook size={20} />,
      description: "Your listed properties",
    },
    {
      title: "Notifications",
      link: "/setting/notification",
      icon: <Notification size={20} />,
      description: "Manage your notifications",
    },
    {
      title: "App Settings",
      link: "/setting/app",
      icon: <Setting3 size={20} />,
      description: "Customize your experience",
    },
    {
      title: "Contact Support",
      link: "/contact-support",
      icon: <Headphone size={20} />,
      description: "Get help when you need it",
    },
  ];

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("accountType");

    useUserStore.getState().clearUser();
    clearConversations();
    clearHostels();
    navigate("/account-type", { replace: true });
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="min-h-dvh bg-gray-50">
      <TitleHead title="Profile" />
      
      <section className="p-6 pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  src={
                    userProfile?.profilePicture ||
                    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-dark mb-1">
                  {userProfile?.firstName} {userProfile?.lastName}
                </h1>
                <p className="text-gray-600 mb-2">{userProfile?.email}</p>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    userProfile?.userType === "AGENT" 
                      ? "bg-purple-100 text-purple-700" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {userProfile?.userType === "AGENT" ? "Agent" : "Student"}
                  </div>
                  {userProfile?.userType === "AGENT" && (
                    <Link 
                      to="/pricing" 
                      className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-xs font-medium hover:bg-primary/90 transition-all"
                    >
                      <Crown size={12} />
                      Upgrade
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-dark mb-4">Account</h2>
              <div className="space-y-1">
                {(userProfile?.userType === "AGENT" ? agentProfileItems : profileItems).map((item, index) => (
                  <Link key={index} to={item.link} className="block">
                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-all">
                        <div className="text-gray-600 group-hover:text-primary transition-colors">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-dark group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <ArrowRight2 size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Logout Section */}
            <div className="border-t border-gray-100 p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-all group"
              >
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-all">
                  <Logout size={20} className="text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-red-600">Log Out</h3>
                  <p className="text-sm text-gray-500">Sign out of your account</p>
                </div>
                <ArrowRight2 size={20} className="text-red-400" />
              </button>
            </div>
          </div>

          {/* Agent Wallet Section (if agent) */}
          {userProfile?.userType === "AGENT" && (
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Wallet Balance</h3>
                <Wallet size={24} />
              </div>
              <div className="text-3xl font-bold mb-4">₦58,000</div>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl font-medium transition-all">
                  View Report
                </button>
                <button className="bg-white hover:bg-gray-100 text-orange-600 py-3 px-4 rounded-xl font-medium transition-all">
                  Withdraw
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
