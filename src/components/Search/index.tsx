import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useLocation } from "react-router";
import TitleHead from "../Ui/TitleHead";
import filter from "/icons/filter-horizontal.svg";
import keyboard from "/icons/keyboard.svg";
import search from "/icons/search.svg";
import cancelCircle from "/icons/cancel-circle.svg";
import SearchCarousel from "./SearchCarousel";
import Filter from "./Filter";
import { RiCloseFill } from "react-icons/ri";
import { axiosConfig } from "../../utils/axiosConfig";
import { Hostel } from "../../types/Hostel";

const Search = () => {
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

  // Debounced search function
  const debouncedSearch = debounce(async (query: string) => {
    try {
      const response = await axiosConfig.get("/hostels/", {
        params: {
          hostelName: query,
          location: filters.location || query,
          hostelType: filters.hostelType,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        },
      });
      console.log(response);
      setFilteredResults(response.data.data);
      setHaveSearched(true);
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setFilteredResults([]);
      setHaveSearched(true);
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

  const handleClearSearch = () => {
    setSearchQuery("");
    setHaveSearched(false);
    setFilteredResults([]);
  };

  // Handle filter changes
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
    debouncedSearch(searchQuery); // Trigger search with updated filters
  };

  // Fetch hostels when filters or search query change
  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    }
  }, [filters]);

  // Initialize search from URL query params
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
        <div className="flex gap-2 my-5">
          <div className="flex items-center border gap-1 border-variant-400 grow rounded-lg p-3">
            <img src={search} className="size-7" />
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="outline-none grow h-full"
              placeholder="Search for Hostels, locations"
            />
            {searchQuery && (
              <img
                src={cancelCircle}
                alt="clear search"
                className="cursor-pointer"
                onClick={handleClearSearch}
              />
            )}
          </div>
          <button
            className="bg-primary rounded-xl p-3"
            onClick={() => setIsFilter(true)}
          >
            <img src={filter} />
          </button>
        </div>

        {!haveSearch ? (
          <div className="min-h-[70vh] text-center grid place-items-center">
            <div>
              <img src={keyboard} className="mx-auto" />
              <p className="text-[#7D8A9E]">
                Start typing to search for hostels!
              </p>
            </div>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="min-h-[70vh] text-center grid place-items-center">
            <p className="text-[#7D8A9E]">
            No results found for "{searchQuery}" in hostels or locations.
            </p>
          </div>
        ) : (
          <div className="flex-row">
            <div className="my-3 flex-row gap-1">
              <div className="flex justify-between items-center">
                <p className="text-dark">Search Results</p>
                <img src={cancelCircle} />
              </div>
              <div className="flex overflow-x-scroll gap-x-3 w-full mt-1.5">
                {filteredResults.map((result, index) => (
                  <div key={index} className="text-center justify-center">
                    <img
                      src={result.images[0]}
                      className="min-w-14 h-14 object-cover rounded-lg"
                    />
                    <p className="text-xs">{result.hostelName}</p>
                  </div>
                ))}
              </div>
            </div>

            <SearchCarousel
              cards={filteredResults.map((hostel) => ({
                image: hostel.images[0],
                title: hostel.hostelName,
                address: hostel.location,
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
