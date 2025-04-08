/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// import profile from "/icons/profile.png";
import Head from "../components/Home/Head";
import Search from "../components/Home/Search";
import PremiumPicks from "../components/Home/PremiumPicks";
import MyCarousel from "../components/Ui/MyCarousel";
import { useQuery } from "@tanstack/react-query";
import { fetchAllHostels } from "../lib/fetchHostels";
import { fetchBookmarks } from "../lib/bookmarkHostel";
import { useHostelStore } from "../store/useHostelsStore";
// import Loader from "../components/Ui/Loader";

const StudentHome = ({ user }: { user: any }) => {
  // const { fetchedUser: user } = useUserContext();

  const [hostels, setHostels] = useState<any | null>(null);

  const { storedHostels, setStoredHostels } = useHostelStore();

  // Fetch hostels
  const { data: fetchedHostels = [], isLoading: isHostelLoading } = useQuery({
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

  useEffect(() => {
    setHostels(fetchedHostels || storedHostels);

    if (
      fetchedHostels &&
      JSON.stringify(fetchedHostels) !== JSON.stringify(storedHostels)
    ) {
      setStoredHostels(fetchedHostels);
    }

    console.log("Hostels", hostels);

    console.log("fetched", fetchedHostels);

    console.log("stored hostek", storedHostels);
  }, [hostels, storedHostels, setStoredHostels, fetchedHostels]);

  return (
    <main>
      {/* User profile */}
      <Head user={user} isAgent={false} />

      <section className="p-5 py-16 overflow-hidden">
        <Search />

        {/* Show loading indicators */}
        {isHostelLoading || isBookmarksLoading ? (
          <div className="flex justify-center items-center h-full mt-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {hostels?.length > 0 && (
              <>
                <PremiumPicks hostels={hostels} bookmarkedIds={bookmarkedIds} />
                <MyCarousel hostels={hostels} bookmarkedIds={bookmarkedIds} />
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default StudentHome;
