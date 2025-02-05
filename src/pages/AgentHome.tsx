import React from "react";
import profile from "/icons/profile.png";
import Head from "../components/Home/Head";
import PremiumPicks from "../components/Home/PremiumPicks";
import MyCarousel from "../components/Ui/MyCarousel";
import home from "/icons/home-13.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchAllHostels } from "../lib/fetchHostels";
import { useUserStore } from "../store/UseUserStore";
import { Link } from "react-router";

const AgentHome: React.FC = () => {
  const { user } = useUserStore();
  const { data: hostels } = useQuery({
    queryKey: ["hostels"],
    queryFn: fetchAllHostels,
  });

  return (
    <main className="">
      {/* Pass the User name and his profile picture into the component */}
      <Head name={user?.firstName as string} profilePic={profile} isAgent />

      <section className="bg p-5 pb-20 ">
        {/* Check if the agent has hostels then render it */}
        {/* {hostels && hostels.length > 0 ? (
          <>
            <div className="my-6  flex items-center space-x-2">
              <h3 className="text-dark text-lg font-semibold">
                All properties
              </h3>
              <hr className="grow textprimary text-primary text-lg" />
            </div>
            <PremiumPicks hostels={hostels} />
            <MyCarousel hostels={hostels} />
          </>
        ) : (
          <div className="h-screen flex items-center justify-between">
            <div className=" grid place-items-center my-auto gap-2">
              <img src={home} className="size-40" />
              <p className="text-variant-500 text-center">
                You haven't added any hostels yet. Posting your first listing is
                easy and takes just a few minutes!
              </p>
              <Link to={'/hostel/create'} className="bg-primary p-2 px-3 text-white rounded-lg">
                Post a hostel now
              </Link>
            </div>
          </div>
        )} */}
         <div className="h-screen flex items-center justify-between">
            <div className=" grid place-items-center my-auto gap-2">
              <img src={home} className="size-40" />
              <p className="text-variant-500 text-center">
                You haven't added any hostels yet. Posting your first listing is
                easy and takes just a few minutes!
              </p>
              <Link to={'/hostel/create'} className="bg-primary p-2 px-3 text-white rounded-lg">
                Post a hostel now
              </Link>
            </div>
          </div>
      </section>
    </main>
  );
};

export default AgentHome;
