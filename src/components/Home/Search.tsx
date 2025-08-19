import { useState, useEffect } from "react"
import { Award, Briefcase, Like1, Location, SearchNormal, Filter } from "iconsax-react"
import { Link, useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { axiosConfig } from "../../utils/axiosConfig"

interface SearchProps {
  onFilterChange: (hostels: any[], filterType: string, route: string) => void
}

const Search = ({ onFilterChange }: SearchProps) => {
  const [type, setType] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const navigate = useNavigate()

  const searchType = [
    {
      title: "All Listings",
      source: <SearchNormal size="18" />,
      description: "All listings",
      route: "",
    },
    {
      title: "Recommended",
      source: <Like1 size="18" />,
      description: "Top picks for you",
      route: "/hostels/recommended",
    },
    {
      title: "Premium Picks",
      source: <Award size="18" />,
      description: "Premium listings",
      route: "/hostels/premium-picks",
    },
    {
      title: "Nearby",
      source: <Location size="18" />,
      description: "Close to campus",
      route: "/hostels/nearby",
    },
    {
      title: "Affordable",
      source: <Briefcase size="18" />,
      description: "Budget friendly",
      route: "/hostels/affordable",
    },
  ]

  // Fetch data based on selected filter
  const { data: filteredHostels = [], isLoading } = useQuery({
    queryKey: ["filteredHostels", type],
    queryFn: async () => {
      const selectedFilter = searchType[type]
      try {
        const response = await axiosConfig.get(selectedFilter.route)
        return response.data.data
      } catch (error) {
        console.error("Error fetching filtered hostels:", error)
        return []
      }
    },
    enabled: true,
  })

  // Update parent component when filter changes
  useEffect(() => {
    if (filteredHostels) {
      onFilterChange(filteredHostels, searchType[type].title.toLowerCase(), searchType[type].route)
    }
  }, [filteredHostels, type, onFilterChange])

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}&type=${type}`)
    }
  }

  // Handle filter change
  const handleFilterChange = (index: number) => {
    setType(index)
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <SearchNormal
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search for hostels, locations..."
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white p-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-custom"
          >
            <SearchNormal size={20} />
          </button>
        </div>
      </div>

      {/* Find Roommate Button */}
      <Link
        to="/find-roommate"
        className="block w-full bg-primary text-white py-3 px-6 rounded-xl text-center font-semibold text-md transition-all duration-200 shadow-lg hover:shadow-custom"
      >
        Find Roommates
      </Link>

      {/* Search Type Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">Quick Filters</h3>
          <Filter size={20} className="text-gray-500 dark:text-gray-400" />
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {searchType?.map((item: any, i: number) => (
            <button
              onClick={() => handleFilterChange(i)}
              key={i}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 whitespace-nowrap ${
                type === i
                  ? "bg-primary border-primary text-white shadow-lg"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/10"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {item?.source}
              <span className="font-medium text-sm">{item?.title}</span>
              {isLoading && type === i && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search
