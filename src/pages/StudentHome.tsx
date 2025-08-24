import { useEffect, useState } from "react"
import Head from "../components/Home/Head"
import Search from "../components/Home/Search"
import PremiumPicks from "../components/Home/PremiumPicks"
import AllHostels from "../components/Home/AllHostels"
import { useQuery } from "@tanstack/react-query"
import { fetchAllHostels } from "../lib/fetchHostels"
import { fetchBookmarks } from "../lib/bookmarkHostel"
import { useHostelStore } from "../store/useHostelsStore"
import { useOutletContext } from "react-router"
import type { Hostel } from "../types/Hostel"
import HostelCard from "../components/Reuseables/HostelCard"

const StudentHome = () => {
  const { user }: { user: any } = useOutletContext()
  const { storedHostels, setStoredHostels } = useHostelStore()
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([])
  const [currentFilter, setCurrentFilter] = useState<string>("")

  const { data: fetchedHostels = [], isLoading: isHostelLoading } = useQuery({
    queryKey: ["hostels"],
    queryFn: () => fetchAllHostels(),
  })

  const { data: bookmarks = [], isLoading: isBookmarksLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  })

  const bookmarkedIds = bookmarks.map((b: { _id: string }) => b._id)

  useEffect(() => {
    if (Array.isArray(fetchedHostels) && JSON.stringify(fetchedHostels) !== JSON.stringify(storedHostels)) {
      setStoredHostels(fetchedHostels)
    }
  }, [fetchedHostels, storedHostels, setStoredHostels])

  const hostelsToDisplay = Array.isArray(fetchedHostels) && fetchedHostels.length > 0 ? fetchedHostels : storedHostels

  // Handle filter changes from Search component
  const handleFilterChange = (hostels: Hostel[], filterType: string) => {
    setFilteredHostels(hostels)
    setCurrentFilter(filterType)
  }

  // Determine which hostels to show based on filter
  const getDisplayHostels = (): Hostel[] => {
    if (filteredHostels.length > 0) {
      return filteredHostels
    }
    return hostelsToDisplay
  }

  const displayHostels = getDisplayHostels()

  // Render hostel card for filtered results
  const renderHostelCard = (hostel: Hostel) => (
    <HostelCard key={hostel._id} hostel={hostel} bookmarkedIds={bookmarkedIds} variant="vertical" showFeatures={true} />
  )

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-theme">
      <Head user={user} isAgent={false} />

      <section className="p-6 pt-24 pb-20">
        <Search onFilterChange={handleFilterChange} />

        {isHostelLoading || isBookmarksLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Loading amazing hostels...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 my-8">
            {displayHostels?.length > 0 ? (
              <>
                {currentFilter ? (
                  <div className="space-y-6 ">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-dark dark:text-white capitalize">{currentFilter}</h2>
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
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      className="w-10 h-10 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark dark:text-white">
                    {currentFilter ? `No ${currentFilter} available` : "No Hostels Available"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentFilter
                      ? `No hostels found for ${currentFilter}. Try a different filter.`
                      : "Check back later for new listings or try adjusting your search filters."}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default StudentHome
