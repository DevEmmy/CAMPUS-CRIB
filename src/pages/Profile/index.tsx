/* eslint-disable @typescript-eslint/no-explicit-any */
import TitleHead from "../../components/Ui/TitleHead";
import {
  // ArchiveBook,
  ArrowRight2,
  CardPos,
  Headphone,
  // Calendar1,
  // CardPos,
  // Headphone,
  Logout,
  // Setting3,
  Notification,
  Setting3,
} from "iconsax-react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import { TbReportAnalytics } from "react-icons/tb";
import { PiHandWithdrawBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";

import { useUserStore } from "../../store/UseUserStore";

const Profile = () => {
  const navigate = useNavigate();
  const { userType } = useUserContext();
  const [userProfile, setUserProfile] = useState<any | null>(null);

  const { user } = useUserStore();

  const localUser = localStorage.getItem("user");

  useEffect(() => {
    console.log("User details" , localUser)
    setUserProfile(user || (localUser ? JSON.parse(localUser) : null));
  }, []);

  const profileItems = [
    {
      title: "Personal Details",
      link: "/personal-details",
      image: <FaRegUser size="22" color="#0E0F1D" />,
    },
    // {
    //   title: "My Bookings",
    //   link: "/my-bookings",
    //   image: <Calendar1 size="22" color="#0E0F1D" />,
    // },
    // {
    //   title: "Payment Details",
    //   link: "/payment-history",
    //   image: <CardPos size="22" color="#0E0F1D" />,
    // },
    // {
    //   title: "Saved Hostels",
    //   link: "/saved-hostels",
    //   image: <ArchiveBook size="22" color="#0E0F1D" />,
    // },
    {
      title: "Notifications",
      link: "/notifications",
      image: <Notification size="22" color="#0E0F1D" />,
    },
    // {
    //   title: "App Settings",
    //   link: "/app-settings",
    //   image: <Setting3 size="22" color="#0E0F1D" />,
    // },
    // {
    //   title: "Contact Support",
    //   link: "/contact-support",
    //   image: <Headphone size="22" color="#0E0F1D" />,
    // },
    // {
    //   title: "Log Out",
    //   link: "/log-out",
    //   image: <Logout size="22" color="#B90000" />,
    // },
  ];

  const agentProfileItems = [
    {
      title: "Personal Details",
      link: "/personal-details",
      image: <FaRegUser size="22" color="#0E0F1D" />,
    },
    // {
    //   title: "My Bookings",
    //   link: "/my-bookings",
    //   image: <Calendar1 size="22" color="#0E0F1D" />,
    // },
    {
      title: "Recent Transactions",
      link: "/recent-transactions",
      image: <CardPos size="22" color="#0E0F1D" />,
    },
    // {
    //   title: "Saved Hostels",
    //   link: "/saved-hostels",
    //   image: <ArchiveBook size="22" color="#0E0F1D" />,
    // },
    {
      title: "Notifications settings",
      link: "/setting/notification",
      image: <Notification size="22" color="#0E0F1D" />,
    },
    {
      title: "App Settings",
      link: "/setting/app",
      image: <Setting3 size="22" color="#0E0F1D" />,
    },
    {
      title: "Contact Support",
      link: "/contact-support",
      image: <Headphone size="22" color="#0E0F1D" />,
    },
    // {
    //   title: "Log Out",
    //   link: "/log-out",
    //   image: <Logout size="22" color="#B90000" />,
    // },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("accountType");
    navigate("/account-type", { replace: true });
  };

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <main>
      <TitleHead title={"profile"} />

      <section className="p-5 py-20">
        <div className="flex items-center gap-x-2 mb-3">
          <img src={userProfile?.profilePicture} className="size-16 rounded-full" />
          <div className="flex-row gap-0 justify-center">
            <h2 className="text-dark font-semibold text-lg">
              {userProfile?.firstName as string} {userProfile?.lastName as string}
            </h2>
            <span className="text-variant-500 text-sm -mt-4">
              {userProfile?.email as string}
            </span>
          </div>
          {userType == "AGENT" && (
            <p className=" text-blue-300 text-xs">Verified Agent</p>
          )}
        </div>

        {/* <hr /> */}
        {userType == "AGENT" && (
          <div className="bg-[#A64E1B] p-3 my-3 rounded-3xl flex flex-col gap-2">
            <div className="text-center flex flex-col gap-1.5">
              <h4 className="text-xs text-white">Wallet balance</h4>
              <h4 className="text-2xl font-semibold text-white">$ 58,000</h4>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#E6CDBF4D] gap-1 p-2 rounded-2xl flex items-center justify-center">
                <h4 className="text-white">View Report</h4>{" "}
                <TbReportAnalytics className="text-white" />
              </div>
              <div className="bg-white p-2  gap-1 rounded-2xl flex items-center justify-center text-primary">
                <h4 className="font-medium">Withdraw</h4>{" "}
                <PiHandWithdrawBold className="font-semibold" />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1 mt-4">
          {userType == "AGENT"
            ? agentProfileItems?.map((item: any, i: number) => {
                return (
                  <Link key={i} to={item?.link} className="">
                    <div className="flex items-center justify-between gap-x-2 my-3">
                      <span className="bg-[#F5F5F5] rounded-xl p-2">
                        {item?.image}
                      </span>

                      <div
                        className={`grow font-medium ${
                          i > 6 && "text-[#B90000]"
                        }`}
                      >
                        {item?.title}
                      </div>

                      {i < 7 && <ArrowRight2 size={20} />}
                    </div>
                  </Link>
                );
              })
            : profileItems?.map((item: any, i: number) => {
                return (
                  <Link key={i} to={item?.link} className="my-3">
                    <div className="flex items-center justify-between gap-x-2 my-3">
                      <span className="bg-[#F5F5F5] rounded-xl p-2">
                        {item?.image}
                      </span>

                      <div
                        className={`grow font-medium ${
                          i > 6 && "text-[#B90000]"
                        }`}
                      >
                        {item?.title}
                      </div>

                      {i < 7 && <ArrowRight2 size={20} />}
                    </div>
                  </Link>
                );
              })}
          <div
            onClick={handleLogout}
            className="flex items-center justify-between gap-x-2 my-3"
          >
            <span className="bg-[#F5F5F5] rounded-xl p-2">
              <Logout size="22" color="#B90000" />
            </span>
            <div className="grow font-medium text-[#B90000] flex-1">
              Log Out
            </div>
            <ArrowRight2 size={20} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
