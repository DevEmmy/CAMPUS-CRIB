import React from "react";
import profile from "/icons/profile.png";
import Head from "../components/Home/Head";
import Search from "../components/Home/Search";
import PremiumPicks from "../components/Home/PremiumPicks";
import MyCarousel from "../components/Ui/MyCarousel";
import Tabs from "../components/Reuseables/Tabs";

const StudentHome = () => {
  return (
    <main>
      <Head name={"Clinton"} profilePic={profile} isAgent={false} />

      <section className="p-5 py-16">
        <Search />
        <PremiumPicks />
        <MyCarousel />
      </section>

      {/* <Tabs /> */}
    </main>
  );
};

export default StudentHome;
