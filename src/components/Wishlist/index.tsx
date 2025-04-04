/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import location from "/wishlist/location.svg";
import { FiEye } from "react-icons/fi";
import { TiHeartFullOutline } from "react-icons/ti";
import SearchInputs from '../Reuseables/SearchInputs';
import CustomReturn from '../Reuseables/CustomReturn';
import { fetchBookmarks, updateBookmark } from '../../lib/bookmarkHostel';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Hostel } from '../../types/Hostel';

const Wishlist: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');  
  const debounceTimeout = 500;
  
  const queryClient = useQueryClient();

  // Fetch bookmarks using React Query
  const { data: favorites = [], isLoading, isError } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks,
  });

  // Bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: async ({ hostelId, action }: { hostelId: string, action: string }) => {
      await updateBookmark(hostelId, action);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] }); // Refetch bookmarks after mutation
    },
  });

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceTimeout);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle search logic
  const handleSearch = (query: string) => {
    setQuery(query);
    if (!searchHistory.includes(query)) {
      setSearchHistory([...searchHistory, query]);
    }
  };

  // Filter based on debounced query
  const filteredFavorites = debouncedQuery
    ? favorites.filter((hostel: Hostel) =>
        hostel.hostelName.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        hostel.location.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        hostel.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : favorites;

  // Handle search history item click
  // const handleHistoryClick = (historyItem: string) => {
  //   setQuery(historyItem);
  //   setDebouncedQuery(historyItem);
  // };

  // Handle bookmark update
  const handleBookmark = async (hostelId: string, action: string) => {
    bookmarkMutation.mutate({ hostelId, action });
  };

  return (
    <section className="w-full p-2">
      <CustomReturn title='Favourites' />
      {/* <TitleHead title={"profile"} /> */}

      {/* <section className="p-5 py-20"> */}
        {/* Search input */}
        <div className="my-10">
          <SearchInputs
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />

        {/* Search history */}
        {/* <div className='my-8'>
          <h2 className='font-semibold text-[22px] leading-7'>Search History</h2>
          <div className='flex items-center gap-5 flex-wrap my-5'>
            {searchHistory.map((search, idx) => (
              <small
                className='bg-white shadow shadow-[#00000017] p-3 rounded-xl text-[14px] leading-5 text-[#96A0B0] font-normal cursor-pointer'
                key={idx}
                onClick={() => handleHistoryClick(search)}
              >
                {search}
              </small>
            ))}
          </div>
        </div> */}
      </div>

      {/* Favourites */}
      <div>
        <div className='flex items-center justify-between w-full my-2'>
          <h2 className='font-semibold text-[22px] leading-7'>Favorites</h2>
        </div>
        <div className='p-2'>
          {isLoading ? ( 
            <p>Loading bookmarks...</p>
          ) : isError ? ( 
            <p>Error fetching bookmarks.</p>
          ) : favorites.length === 0 ? ( 
            <p>No bookmarked hostel available.</p>
          ) : filteredFavorites.length === 0 ? ( 
            <p>No results found for "{debouncedQuery}".</p>
          ) : ( 
            filteredFavorites.map((hostel: Hostel) => (
              <div key={hostel._id} className='flex gap-3 items-start mb-4 w-full'>
                <img className='size-28 object-cover' src={hostel.images[0]} alt="hostel" />
                <div className='space-y-2 flex-1'>
                  <h2 className='text-dark font-bold leading-5'>{hostel.hostelName}</h2>
                  <div className='flex items-center justify-start gap-2'>
                    <img src={location} alt="location icon" />
                    <p className='text-dark text-[12px] leading-4'>{hostel.location}</p>
                  </div>
                  <p className='text-[#64748B] text-[10px] leading-4'>{hostel.description}</p>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-1'>
                      <FiEye color='#7D8A9E' size={25} />
                    </div>
                    <div className='flex items-center gap-1'>
                      <TiHeartFullOutline
                        color='#C80F0F'
                        size={25}
                        onClick={() => handleBookmark(hostel._id, 'remove')}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
