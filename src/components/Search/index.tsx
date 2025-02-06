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
import { mockSearchResults } from "./__mock__/SearchResult";
import { RiCloseFill } from "react-icons/ri";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [haveSearch, setHaveSearched] = useState<boolean>(false); 
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filteredResults, setFilteredResults] = useState<typeof mockSearchResults>([]);

  const location = useLocation(); // Get the current location

  // Debounced search function
  const debouncedSearch = debounce((query: string) => {
    const results = mockSearchResults.filter((result) =>
      result.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(results);
    setHaveSearched(true); // Set to true when search has been performed
  }, 500); // Adjust debounce delay as needed (500ms here)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Reset haveSearched state when clearing search query
    if (!query) {
      setHaveSearched(false); // No search performed yet
      setFilteredResults([]);
    }

    debouncedSearch(query); // Trigger debounced search
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Clear the input field
    setHaveSearched(false); // Reset search state
    setFilteredResults([]); // Clear search results
  };

  // Check URL for query parameter on mount and trigger search
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    
    if (query) {
      setSearchQuery(query); // Set the query parameter to the input field
      // Trigger search based on URL query
      debouncedSearch(query); 
      setHaveSearched(true); // Mark that a search has been performed
    }
  }, [location.search]); // Only re-run when the query parameter changes

  useEffect(() => {
    // Clear results when search query is empty
    if (!searchQuery) {
      setHaveSearched(false);
      setFilteredResults([]);
    }
  }, [searchQuery]);

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
              onChange={handleSearchChange} // Trigger debounced search
              className="outline-none grow h-full"
              placeholder="Search for Hostels, locations"
            />
            {searchQuery && (
              <img
                src={cancelCircle}
                alt="clear search"
                className="cursor-pointer"
                onClick={handleClearSearch} // Clear search
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
              <p className="text-[#7D8A9E]">Start typing to search for hostels!</p>
            </div>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="min-h-[70vh] text-center grid place-items-center">
            <p className="text-[#7D8A9E]">No results found for "{searchQuery}"</p>
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
                      src={result.image}
                      className="min-w-14 h-14 object-cover rounded-lg"
                    />
                    <p className="text-xs">{result.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Render the carousel with filtered results */}
            <SearchCarousel cards={filteredResults} />
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
            <Filter onClose={() => setIsFilter(false)} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Search;
