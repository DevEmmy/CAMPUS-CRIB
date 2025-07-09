import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useLocation } from "react-router";
import TitleHead from "../Ui/TitleHead";
import search from "/icons/search.svg";
import SearchCarousel from "./SearchCarousel";
import Filter from "./Filter";
import { RiCloseFill } from "react-icons/ri";
import { axiosConfig } from "../../utils/axiosConfig";
import { Hostel } from "../../types/Hostel";
import { fetchBookmarks } from "../../lib/bookmarkHostel";
import { useQuery } from "@tanstack/react-query";
import { IoFilterOutline } from "react-icons/io5";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [haveSearch, setHaveSearched] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filteredResults, setFilteredResults] = useState<Hostel[]>([]);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 1000000,
    hostelType: "",
  });

  const location = useLocation();

  const { data: bookmarks = [] } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  const bookmarkedIds = bookmarks.map((b: { _id: string }) => b._id);

  const debouncedSearch = debounce(async (query: string) => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get("/hostels", {
        params: {
          // hostelName: query || undefined,
          location: query || (haveSearch ? filters.location : undefined),
          hostelType: haveSearch ? filters.hostelType : undefined,
          minPrice: haveSearch ? filters.minPrice : 0,
          maxPrice: haveSearch ? filters.maxPrice : 1000000,
        },
      });
      console.log("API Response:", response.data);
      setFilteredResults(response.data.data);
      setHaveSearched(true);
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setFilteredResults([]);
      setHaveSearched(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setHaveSearched(false);
      setFilteredResults([]);
    } else {
      debouncedSearch(query);
    }
  };

  // const handleClearSearch = () => {
  //   setSearchQuery("");
  //   setHaveSearched(false);
  //   setFilteredResults([]);
  // };

  const handleApplyFilters = (newFilters: {
    location: string;
    priceRange: number[];
    roomTypes: string;
    amenities: string[];
    availability: string;
    availableDate: Date | null;
  }) => {
    setFilters({
      location: newFilters.location,
      minPrice: newFilters.priceRange[0],
      maxPrice: newFilters.priceRange[1],
      hostelType: newFilters.roomTypes,
    });
    setHaveSearched(true);
    debouncedSearch(searchQuery);
  };

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [filters, searchQuery]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      setSearchQuery(query);
      debouncedSearch(query);
      setHaveSearched(true);
    }
  }, [location.search]);

  return (
    <main className="">
      <TitleHead title="Search" />
      <section className="p-5 my-10">
        <div className="flex gap-2 my-5 overflow-hidden w-full min-w-0">
          <div className="flex items-center justify-between border gap-1 border-variant-400 rounded-lg p-3 relative flex-1 min-w-0">
            <img src={search} className="size-7" alt="search icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="outline-none h-full bg-transparent flex-1"
              placeholder="Search for Hostels, locations"
            />
          </div>
          <button
            className="bg-primary rounded-xl py-1 px-2"
            onClick={() => setIsFilter(true)}
          >
            <IoFilterOutline className="text-white size-6" />
          </button>
        </div>

        {isLoading ? (
          <div className="min-h-[70vh] flex justify-center items-center">
            <div className="flex justify-center items-center h-full mt-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        ) : haveSearch && filteredResults.length === 0 ? (
          <div className="min-h-[70vh] text-center grid place-items-center">
            <p className="text-[#7D8A9E]">No hostels found...</p>
          </div>
        ) : (
          <div className="flex-row">
            <div className="my-3 flex-row gap-1">
              <div className="flex justify-between items-center">
                <p className="text-dark">Search Results</p>
              </div>
              <div className="flex overflow-x-scroll gap-x-2 w-full my-1.5 scroll-m-0">
                {filteredResults.map((result, index) => (
                  <div key={index} className="text-center justify-center">
                    <img
                      src={result.images[0]}
                      className="min-w-14 h-14 object-cover rounded-lg border"
                    />
                    <p className="!text-[13px] line-clamp-1">
                      {result.hostelName}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <SearchCarousel
              cards={filteredResults.map((hostel) => ({
                image: hostel.images[0],
                title: hostel.hostelName,
                address: hostel.location,
                id: hostel._id,
                description: hostel.description,
                bookmarkedIds: bookmarkedIds,
              }))}
            />
          </div>
        )}
      </section>
      {isFilter && (
        <div className="bg_overlay relative">
          <div className="p-5 rounded-t-xl shadow fixed w-full bottom-0 bg-white z-[99999]">
            <div className="flex items-center justify-between mb-5">
              <RiCloseFill size={23} onClick={() => setIsFilter(false)} />
              <p className="text-primary text-center text-xl">Filter</p>
              <p className="text-white">,</p>
            </div>
            <Filter
              onClose={() => setIsFilter(false)}
              onApplyFilters={handleApplyFilters}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Search;
