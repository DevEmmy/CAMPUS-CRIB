import React, { useState } from "react";
import profile from "/icons/profile.png";
import Head from "../components/Home/Head";
import PremiumPicks from "../components/Home/PremiumPicks";
import MyCarousel from "../components/Ui/MyCarousel";
import home from "/icons/home-13.svg";
// import Tabs from "../components/Reuseables/Tabs";

const AgentHome = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasHostel, setHasHostel] = useState<boolean>(!false);
  
  return (
    <main className="">
        <Head name={"Aremu"} profilePic={profile} isAgent />


      <section className="bg p-5 pb-20 ">
        {hasHostel ? (
          <>
            <div className="my-6  flex items-center space-x-2">
              <h3 className="text-dark text-lg font-semibold">
                All properties
              </h3>
              <hr className="grow textprimary text-primary text-lg" />
            </div>
            <PremiumPicks />
            <MyCarousel />
          </>
        ) : (
          <div className="h-screen flex items-center justify-between">
            <div className=" grid place-items-center my-auto gap-2">
              <img src={home} className="size-40" />
              <p className="text-variant-500 text-center">
                You haven't added any hostels yet. Posting your first listing is
                easy and takes just a few minutes!
              </p>
              <button className="bg-primary p-2 px-3 text-white rounded-lg">
                Post a hostel now
              </button>
            </div>
          </div>
        )}
      </section>

      {/* <Tabs isAgent/> */}
    </main>
  );
};

export default AgentHome;
