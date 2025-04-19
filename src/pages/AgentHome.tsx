/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Head from "../components/Home/Head";
// import PremiumPicks from "../components/Home/PremiumPicks";
// import MyCarousel from "../components/Ui/MyCarousel";
import home from "/icons/home-13.svg";
// import { useQuery } from "@tanstack/react-query";
// import { fetchAllHostels } from "../lib/fetchHostels";
import { Link } from "react-router";
// import PremiumPicks from "../components/Home/PremiumPicks";
// import MyCarousel from "../components/Ui/MyCarousel";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../lib/fetchUser";
import search from "/icons/search.svg";
import mapMarker from "/icons/location.svg";

import { IoFilterOutline } from "react-icons/io5";

import { friendlyTimeAgo } from "../utils/dateFormat";
import { FaPlus } from "react-icons/fa6";

const AgentHome = ({ user }: { user: any }) => {
  const [userProfile] = useState<any | null>(user);
  const [hostels, setHostels] = useState([]);
  // const { user } = useUserStore();
  const { data: userDet } = useQuery({
    queryKey: ["userDetails", user?._id],
    queryFn: () => fetchUserById(user?._id),
  });

  useEffect(() => {
    console.log("User det", userDet?.hostels);
    setHostels(userDet?.hostels);
  }, [userDet]);

  // const { data: userDetails } = useQuery({
  //   queryKey: ["hostels"],
  //   queryFn: fetchUserById(user?._id),
  // });

  const userDetails = fetchUserById(user?._id)
    .then((userDetails) => {
      setHostels(userDetails?.hostels);
      console.log(userDetails);
    })
    .catch((err) => {
      console.error(err);
    });

  useEffect(() => {
    // console.log("fetch users byu id", userDetails);
  }, [userDetails]);

  // const localUser = localStorage.getItem("user");

  // useEffect(() => {
  //   setUserProfile(user || (localUser ? JSON.parse(localUser) : null));
  // }, []);

  return (
    <main className="">
      {/* Pass the User name and his profile picture into the component */}
      <Head
        // name={userProfile?.firstName as string}
        // profilePic={profile}
        user={userProfile}
        isAgent
      />

      <section className="bg p-5 pb-20 ">
        {/* Check if the agent has hostels then render it */}
        {hostels && hostels.length > 0 ? (
          <>
            <div className="my-6  flex items-center space-x-2">
              <h3 className="text-dark text-lg font-semibold">Your Listings</h3>
              <hr className="grow textprimary text-primary text-lg" />
            </div>

            <div className="flex flex-row gap-2">
              <div className="flex items-center justify-between border gap-1 border-variant-400 rounded-lg p-3 relative flex-1 min-w-0">
                <img src={search} className="size-5" alt="search icon" />
                <input
                  type="text"
                  className="outline-none h-full bg-transparent flex-1"
                  placeholder="Search for Hostels, locations"
                />
              </div>
              <button className="bg-primary rounded-xl py-1 px-2">
                <IoFilterOutline className="text-white size-5" />
              </button>
            </div>

            <h3 className="text-dark text-lg font-semibold my-1.5 ">
              Your Listings
            </h3>

            <div className="flex flex-col gap-4">
            {hostels?.map((item: any, i: number) => (
              <div key={i} className="flex flex-col gap-1">
                <img
                  src={item?.images[0]}
                  className="w-full max-h-[230px] object-cover rounded-xl border shadow"
                />

                <h3 className="text-lg text-dark">{item?.hostelName}</h3>

                <div className="flex gap-2">
                  {/* <div> */}
                  <img src={mapMarker} className="size-5" />
                  {/* </div> */}
                  <p className="text-left text-[15px]">{item?.location}</p>
                </div>

                <h3 className="font-semibold text-lg">
                  Price: # {item?.price}
                </h3>

                <p>last updated: {friendlyTimeAgo(item?.updatedAt)} </p>

                <div className="flex gap-1 items-center">
                  <div
                    className={`size-2 rounded-full ${
                      item?.isAvailable ? "bg-green-800" : "bg-red-600"
                    }`}
                  />
                  <span
                    className={` my-1.5 text-sm ${
                      item?.isAvailable ? "text-green-800" : "text-red-600"
                    }`}
                  >
                    {item?.isAvailable ? "Available" : "Not Available"}
                  </span>
                </div>

                <Link
                  to={`/hostels/${item?._id}`}
                  className="bg-primary text-center text-white font-semibold py-3 rounded-xl"
                >
                  View details
                </Link>
              </div>
            ))}
            </div>

            {/* <PremiumPicks hostels={hostels} bookmarkedIds={[]} />
            <MyCarousel hostels={hostels} bookmarkedIds={[]} /> */}

            <Link
              to={"/hostels/create"}
              className=" bg-blue-400 size-10 grid place-items-center text-white rounded-lg fixed bottom-20 right-4"
            >
              <FaPlus size={20} />
            </Link>
          </>
        ) : (
          <div className="h-screen flex items-center justify-between">
            <div className=" grid place-items-center my-auto gap-2">
              <img src={home} className="size-40" />
              <p className="text-variant-500 text-center">
                You haven't added any hostels yet. Posting your first listing is
                easy and takes just a few minutes!
              </p>
              <Link
                to={"/hostels/create"}
                className="bg-primary p-2 px-3 text-white rounded-lg"
              >
                Post a hostel now
              </Link>
            </div>
          </div>
        )}

        {/* <div className="h-screen flex items-center justify-between">
          <div className=" grid place-items-center my-auto gap-2">
            <img src={home} className="size-40" />
            <p className="text-variant-500 text-center">
              You haven't added any hostels yet. Posting your first listing is
              easy and takes just a few minutes!
            </p>
            <Link
              to={"/hostels/create"}
              className="bg-primary p-2 px-3 text-white rounded-lg"
            >
              Post a hostel now
            </Link>
          </div>
        </div> */}
      </section>
    </main>
  );
};

export default AgentHome;
