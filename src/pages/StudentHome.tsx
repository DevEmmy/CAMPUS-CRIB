import React from "react";
import profile from "/icons/profile.png";
import Head from "../components/Home/Head";
import Search from "../components/Home/Search";
import PremiumPicks from "../components/Home/PremiumPicks";
import MyCarousel from "../components/Ui/MyCarousel";
import { useQuery } from "@tanstack/react-query";
import { fetchAllHostels } from "../lib/fetchHostels";
import { useUserStore } from "../store/UseUserStore";

const StudentHome: React.FC = () => {
  const { user } = useUserStore();
  const { data: hostels } = useQuery({
    queryKey: ["hostels"],
    queryFn: fetchAllHostels,
  });

  return (
    <main>
      {/* Input the profile picture later */}
      <Head
        name={user?.firstName as string}
        profilePic={profile}
        isAgent={false}
      />

      <section className="p-5 py-16">
        <Search />
        <PremiumPicks hostels={hostels} />
        <MyCarousel hostels={hostels} />
      </section>
    </main>
  );
};

export default StudentHome;
