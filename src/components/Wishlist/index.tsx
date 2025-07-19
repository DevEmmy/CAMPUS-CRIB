/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SearchNormal, Heart, Location } from "iconsax-react";
import { fetchBookmarks, updateBookmark } from "../../lib/bookmarkHostel";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Hostel } from "../../types/Hostel";
import TitleHead from "../Ui/TitleHead";
import HostelCard from "../Reuseables/HostelCard";

const Wishlist: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const debounceTimeout = 500;

  const queryClient = useQueryClient();

  // Fetch bookmarks using React Query
  const {
    data: favorites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  // Bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: async ({
      hostelId,
      action,
    }: {
      hostelId: string;
      action: string;
    }) => {
      await updateBookmark(hostelId, action);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceTimeout);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter based on debounced query
  const filteredFavorites = debouncedQuery
    ? favorites.filter(
        (hostel: Hostel) =>
          hostel.hostelName
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase()) ||
          hostel.location
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase()) ||
          hostel.description
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase())
      )
    : favorites;

  return (
    <main className="min-h-dvh bg-gray-50">
      <TitleHead title="Favorites" />

      <section className="p-6 pb-20">
        {/* Search Section */}
        <div className="space-y-6">
          <div className="relative">
            <SearchNormal 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
              placeholder="Search your favorites..."
            />
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-dark">Favorites</h2>
              <p className="text-gray-600 mt-1">
                {isLoading ? "Loading..." : `${filteredFavorites.length} saved hostels`}
              </p>
            </div>
            {filteredFavorites.length > 0 && (
              <div className="flex items-center gap-2 text-primary text-sm font-medium">
                <span>{filteredFavorites.length} results</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 font-medium">Loading favorites...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Heart size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-dark">Error loading favorites</h3>
              <p className="text-gray-600">
                There was an error loading your saved hostels. Please try again.
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && favorites.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Heart size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-dark">No favorites yet</h3>
              <p className="text-gray-600">
                Start saving hostels you like to see them here.
              </p>
            </div>
          </div>
        )}

        {/* No Search Results */}
        {!isLoading && !isError && favorites.length > 0 && filteredFavorites.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <SearchNormal size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-dark">No results found</h3>
              <p className="text-gray-600">
                No favorites match "{debouncedQuery}". Try a different search term.
              </p>
            </div>
          </div>
        )}

        {/* Favorites Grid */}
        {!isLoading && !isError && filteredFavorites.length > 0 && (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((hostel: Hostel) => (
                <HostelCard 
                  key={hostel._id}
                  hostel={hostel}
                  bookmarkedIds={favorites.map((f: any) => f._id)}
                  variant="vertical"
                  showFeatures={true}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Wishlist;
