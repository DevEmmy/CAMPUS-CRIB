import { useEffect } from "react";
import Head from "../components/Home/Head";
import Search from "../components/Home/Search";
import PremiumPicks from "../components/Home/PremiumPicks";
import MyCarousel from "../components/Ui/MyCarousel";
import { useQuery } from "@tanstack/react-query";
import { fetchAllHostels } from "../lib/fetchHostels";
import { fetchBookmarks } from "../lib/bookmarkHostel";
import { useHostelStore } from "../store/useHostelsStore";
import { useOutletContext } from "react-router";

const StudentHome = () => {
  const { user }: { user: any } = useOutletContext();
  const { storedHostels, setStoredHostels } = useHostelStore();

  const { data: fetchedHostels = [], isLoading: isHostelLoading } = useQuery({
    queryKey: ["hostels"],
    queryFn: fetchAllHostels,
  });

  const { data: bookmarks = [], isLoading: isBookmarksLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  const bookmarkedIds = bookmarks.map((b: { _id: string }) => b._id);


  useEffect(() => {
    if (fetchedHostels && JSON.stringify(fetchedHostels) !== JSON.stringify(storedHostels)) {
      setStoredHostels(fetchedHostels);
    }
  }, [fetchedHostels, storedHostels, setStoredHostels]);

  const hostelsToDisplay = fetchedHostels.length > 0 ? fetchedHostels : storedHostels;

  return (
    <main>
      <Head user={user} isAgent={false} />

      <section className="p-5 py-16 overflow-hidden">
        <Search />

        {isHostelLoading || isBookmarksLoading ? (
          <div className="flex justify-center items-center h-full mt-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {hostelsToDisplay?.length > 0 && (
              <>
                <PremiumPicks hostels={hostelsToDisplay} bookmarkedIds={bookmarkedIds} />
                <MyCarousel hostels={hostelsToDisplay} bookmarkedIds={bookmarkedIds} />
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default StudentHome