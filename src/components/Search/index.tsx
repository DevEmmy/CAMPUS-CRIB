import { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { useLocation, useNavigate } from "react-router";
import TitleHead from "../Ui/TitleHead";
import { SearchNormal, Filter, Location, Heart, Star, Wifi, Car, Shield } from "iconsax-react";
import { axiosConfig } from "../../utils/axiosConfig";
import { Hostel } from "../../types/Hostel";
import { fetchBookmarks } from "../../lib/bookmarkHostel";
import { useQuery } from "@tanstack/react-query";
import { updateBookmark } from "../../lib/bookmarkHostel";
import FilterComponent from "./Filter";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [haveSearch, setHaveSearched] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filteredResults, setFilteredResults] = useState<Hostel[]>([]);
  const [likedHostels, setLikedHostels] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 1000000,
    hostelType: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const isMountedRef = useRef(true);

  const { data: bookmarks = [] } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  const bookmarkedIds = bookmarks.map((b: { _id: string }) => b._id);

  // Initialize liked hostels from bookmarks
  useEffect(() => {
    setLikedHostels(bookmarkedIds);
  }, [bookmarkedIds]);

  // Create debounced search function with useCallback to prevent recreation
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!isMountedRef.current) return;
      
      setIsLoading(true);
      try {
        const response = await axiosConfig.get("/hostels", {
          params: {
            query: query || undefined,
          },
        });
        
        if (isMountedRef.current) {
          console.log("API Response:", response.data);
          setFilteredResults(response.data.data || []);
          setHaveSearched(true);
        }
      } catch (error) {
        console.error("Error fetching hostels:", error);
        if (isMountedRef.current) {
          setFilteredResults([]);
          setHaveSearched(true);
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }, 500),
    []
  );

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

  const handleBookmark = async (hostelId: string) => {
    const isLiked = likedHostels.includes(hostelId);
    const action = isLiked ? "remove" : "add";

    setLikedHostels((prev) =>
      isLiked ? prev.filter((id) => id !== hostelId) : [...prev, hostelId]
    );

    await updateBookmark(hostelId, action);
  };

  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('wifi') || featureLower.includes('internet')) return <Wifi size={12} />;
    if (featureLower.includes('parking') || featureLower.includes('car')) return <Car size={12} />;
    if (featureLower.includes('security') || featureLower.includes('guard')) return <Shield size={12} />;
    return <Star size={12} />;
  };

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
    // Only search if we have a query or location filter
    if (searchQuery || newFilters.location) {
      debouncedSearch(searchQuery || newFilters.location);
    }
  };

  useEffect(() => {
    // Only search if we have a query and filters have been applied
    if (searchQuery && haveSearch) {
      debouncedSearch(searchQuery);
    }
  }, [filters, searchQuery, haveSearch, debouncedSearch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      setSearchQuery(query);
      debouncedSearch(query);
      setHaveSearched(true);
    }
  }, [location.search, debouncedSearch]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <main className="min-h-dvh bg-gray-50">
      <TitleHead title="Search" />
      
      <section className="p-6 pb-20">
        {/* Search Bar */}
        <div className="space-y-6">
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <SearchNormal 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                  placeholder="Search for hostels, locations..."
                />
              </div>
              <button 
                onClick={() => setIsFilter(true)} 
                className="bg-primary hover:bg-primary/90 text-white p-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Search Results Header */}
          {haveSearch && (
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-dark">
                  {searchQuery ? `Search Results for "${searchQuery}"` : "Search Results"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isLoading ? "Searching..." : `${filteredResults.length} hostels found`}
                </p>
              </div>
              {filteredResults.length > 0 && (
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <span>{filteredResults.length} results</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 font-medium">Searching for hostels...</p>
            </div>
          </div>
        )}

        {/* No Results */}
        {haveSearch && !isLoading && filteredResults.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <SearchNormal size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-dark">No hostels found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find more options.
              </p>
            </div>
          </div>
        )}

        {/* Search Results Grid */}
        {!isLoading && filteredResults.length > 0 && (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((hostel: Hostel) => {
                const isLiked = likedHostels.includes(hostel._id);

                return (
                  <div 
                    key={hostel._id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group" 
                    onClick={() => navigate(`/hostels/${hostel._id}`)}
                  >
                    <div className="relative h-48">
                      <img
                        src={hostel.images[0]}
                        alt={hostel.hostelName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
                      
                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmark(hostel._id);
                        }}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
                      >
                        <Heart 
                          size={20} 
                          className={isLiked ? "text-red-500 fill-current" : "text-gray-600"} 
                        />
                      </button>
                      
                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        ₦{hostel.price}
                      </div>

                      {/* Availability Badge */}
                      <div className="absolute top-3 left-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          hostel.isAvailable 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {hostel.isAvailable ? "Available" : "Full"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg text-dark line-clamp-1 mb-2">
                          {hostel.hostelName}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <Location size={16} className="text-gray-400 flex-shrink-0" />
                          <span className="text-sm line-clamp-1">{hostel.location}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {hostel.description}
                        </p>
                      </div>
                      
                      {/* Features Preview */}
                      {hostel.features && hostel.features.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              Key Features
                            </span>
                            <span className="text-xs text-gray-400">
                              {hostel.features.length} features
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {hostel.features.slice(0, 4).map((feature: string, index: number) => (
                              <div 
                                key={index}
                                className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg"
                                title={feature}
                              >
                                {getFeatureIcon(feature)}
                                <span className="text-xs text-gray-600 line-clamp-1">
                                  {feature.length > 12 ? feature.substring(0, 12) + '...' : feature}
                                </span>
                              </div>
                            ))}
                            {hostel.features.length > 4 && (
                              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                <span className="text-xs text-gray-500 font-medium">
                                  +{hostel.features.length - 4} more
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Quick Info */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 font-medium">
                            {hostel.availableRooms} rooms available
                          </span>
                        </div>
                        <span className="text-xs text-primary font-medium">View Details</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State - No Search Yet */}
        {!haveSearch && !isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <SearchNormal size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-dark">Search for Hostels</h3>
              <p className="text-gray-600">
                Enter a location or hostel name to start your search. Use filters to narrow down your options.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Filter Modal */}
      {isFilter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-dark">Filters</h3>
                <button 
                  onClick={() => setIsFilter(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <FilterComponent
                onClose={() => setIsFilter(false)}
                onApplyFilters={handleApplyFilters}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Search;
