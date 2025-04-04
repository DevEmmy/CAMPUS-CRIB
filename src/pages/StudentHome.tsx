/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import profile from "/icons/profile.png";
import Head from "../components/Home/Head";
import Search from "../components/Home/Search";
import PremiumPicks from "../components/Home/PremiumPicks";
import MyCarousel from "../components/Ui/MyCarousel";
import { useQuery } from "@tanstack/react-query";
import { fetchAllHostels } from "../lib/fetchHostels";
import { useUserContext } from "../contexts/UserContext";
import { fetchBookmarks } from "../lib/bookmarkHostel";
// import Loader from "../components/Ui/Loader";

const StudentHome: React.FC = () => {
  const { fetchedUser: user } = useUserContext();

  // Fetch hostels
  const { data: hostels = [], isLoading: isHostelLoading } = useQuery({
    queryKey: ["hostels"],
    queryFn: fetchAllHostels,
  });

  // Fetch bookmarks
  const { data: bookmarks = [], isLoading: isBookmarksLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  // Extract bookmarked hostel IDs
  const bookmarkedIds = bookmarks.map((b: { _id: string }) => b._id);

  return (
    <main>
      {/* User profile */}
      <Head name={user?.firstName || ""} profilePic={profile} isAgent={false} />

      <section className="p-5 py-16">
        <Search />

        {/* Show loading indicators */}
        {isHostelLoading || isBookmarksLoading ? (
          <div className="flex justify-center items-center h-full mt-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
        ) : (
          <>
            <PremiumPicks hostels={hostels} bookmarkedIds={bookmarkedIds} />
            <MyCarousel hostels={hostels} bookmarkedIds={bookmarkedIds} />
          </>
        )}
      </section>
    </main>
  );
};

export default StudentHome;
