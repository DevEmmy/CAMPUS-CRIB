import React from "react";
import profile from "/icons/profile.png";
import Head from "../components/Home/Head";
import Search from "../components/Home/Search";
import PremiumPicks from "../components/Home/PremiumPicks";
import MyCarousel from "../components/Ui/MyCarousel";

const StudentHome = () => {
  return (
    <main className="p-5 pb-20">
      <Head name={"Clinton"} profilePic={profile} />
      <Search />
      <PremiumPicks />
      <MyCarousel />
    </main>
  );
};

export default StudentHome;
