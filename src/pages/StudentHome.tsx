import { useEffect, useState } from "react";
import Head from "../components/Home/Head";
import Search from "../components/Home/Search";
import PremiumPicks from "../components/Home/PremiumPicks";
import AllHostels from "../components/Home/AllHostels";
import { useQuery } from "@tanstack/react-query";
import { fetchAllHostels } from "../lib/fetchHostels";
import { fetchBookmarks } from "../lib/bookmarkHostel";
import { useHostelStore } from "../store/useHostelsStore";
import { useOutletContext } from "react-router";
import { Hostel } from "../types/Hostel";
import HostelCard from "../components/Reuseables/HostelCard";

const StudentHome = () => {
  const { user }: { user: any } = useOutletContext();
  const { storedHostels, setStoredHostels } = useHostelStore();
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("");

  const { data: fetchedHostels = [], isLoading: isHostelLoading } = useQuery({
    queryKey: ["hostels"],
    queryFn: () => fetchAllHostels(),
  });

  const { data: bookmarks = [], isLoading: isBookmarksLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  const bookmarkedIds = bookmarks.map((b: { _id: string }) => b._id);

  useEffect(() => {
    if (Array.isArray(fetchedHostels) && JSON.stringify(fetchedHostels) !== JSON.stringify(storedHostels)) {
      setStoredHostels(fetchedHostels);
    }
  }, [fetchedHostels, storedHostels, setStoredHostels]);

  const hostelsToDisplay = Array.isArray(fetchedHostels) && fetchedHostels.length > 0 ? fetchedHostels : storedHostels;

  // Handle filter changes from Search component
  const handleFilterChange = (hostels: Hostel[], filterType: string) => {
    setFilteredHostels(hostels);
    setCurrentFilter(filterType);
  };

  // Determine which hostels to show based on filter
  const getDisplayHostels = (): Hostel[] => {
    if (filteredHostels.length > 0) {
      return filteredHostels;
    }
    return hostelsToDisplay;
  };

  const displayHostels = getDisplayHostels();

  // Render hostel card for filtered results
  const renderHostelCard = (hostel: Hostel) => (
    // <div 
    //   key={hostel._id}
    //   className="bg-white w-[320px] rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-custom transition-all duration-300 cursor-pointer group flex-shrink-0"
    //   onClick={() => window.location.href = `/hostels/${hostel._id}`}
    // >
    //   <div className="relative h-48">
    //     <img
    //       src={hostel.images[0]}
    //       alt={hostel.hostelName}
    //       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    //     />
    //     <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
        
    //     <div className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
    //       ₦{hostel.price}
    //     </div>

    //     <div className="absolute top-3 left-3">
    //       <div className={`px-2 py-1 rounded-full text-xs font-medium ${
    //         hostel.isAvailable 
    //           ? "bg-green-100 text-green-700" 
    //           : "bg-red-100 text-red-700"
    //       }`}>
    //         {hostel.isAvailable ? "Available" : "Full"}
    //       </div>
    //     </div>
    //   </div>
      
    //   <div className="p-5 space-y-4">
    //     <div>
    //       <h3 className="font-bold text-lg text-dark line-clamp-1 mb-2">
    //         {hostel.hostelName}
    //       </h3>
          
    //       <div className="flex items-center gap-2 text-gray-600 mb-3">
    //         <span className="text-sm line-clamp-1">{hostel.location}</span>
    //       </div>
          
    //       <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
    //         {hostel.description}
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <HostelCard 
      key={hostel._id}
      hostel={hostel}
      bookmarkedIds={bookmarkedIds}
      variant="vertical"
      showFeatures={true}
    />
  );

  return (
    <main className="min-h-dvh bg-gray-50">
      <Head user={user} isAgent={false} />

      <section className="p-6 pt-24 pb-20">
        <Search onFilterChange={handleFilterChange} />

        {isHostelLoading || isBookmarksLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 font-medium">Loading amazing hostels...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 my-8">
            {displayHostels?.length > 0 ? (
              <>
                {currentFilter ? (
                  <div className="space-y-6 ">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-dark capitalize">
                        {currentFilter}
                      </h2>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        <span>{displayHostels.length} results</span>
                      </div>
                    </div>
                    
                    {currentFilter === "premium picks" ? (
                      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                        {displayHostels.map(renderHostelCard)}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayHostels.map(renderHostelCard)}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <PremiumPicks hostels={displayHostels} bookmarkedIds={bookmarkedIds} />
                    <AllHostels bookmarkedIds={bookmarkedIds} />
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4 max-w-md">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark">
                    {currentFilter ? `No ${currentFilter} available` : "No Hostels Available"}
                  </h3>
                  <p className="text-gray-600">
                    {currentFilter 
                      ? `No hostels found for ${currentFilter}. Try a different filter.`
                      : "Check back later for new listings or try adjusting your search filters."
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default StudentHome;