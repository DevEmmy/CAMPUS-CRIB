import React, { useState, useEffect } from 'react';
import location from '/wishlist/location.svg';
import { FiEye } from "react-icons/fi";
import { TiHeartFullOutline } from "react-icons/ti";
import SearchInputs from '../Reuseables/SearchInputs';
import CustomReturn from '../Reuseables/CustomReturn';
import { mockHostels, mockSearchHistory } from './mockData'; // Import mock data

const Wishlist: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<any[]>([]);
  const [query, setQuery] = useState<string>('');  // Track the search query
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');  // For debounced search

  const debounceTimeout = 500;  // Set debounce delay in milliseconds

  useEffect(() => {
    setSearchHistory(mockSearchHistory);
    setFavorites(mockHostels);
    setFilteredFavorites(mockHostels); // Initialize filtered favorites
  }, []);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);  // Update debounced query after delay
    }, debounceTimeout);

    return () => {
      clearTimeout(timer);  // Clean up the previous timeout on each change
    };
  }, [query]);

  // Handle search logic
  const handleSearch = (query: string) => {
    setQuery(query);  // Update query immediately on button click
    if (!searchHistory.includes(query)) {
      const updatedHistory = [...searchHistory, query];
      setSearchHistory(updatedHistory);  // Add to search history
    }
  };

  // Filter based on debounced query
  useEffect(() => {
    if (debouncedQuery) {
      const filtered = favorites.filter((hostel) =>
        hostel.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        hostel.location.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        hostel.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredFavorites(filtered);  // Update the filtered list
    } else {
      setFilteredFavorites(favorites);  // Reset to original list if query is empty
    }
  }, [debouncedQuery, favorites]);

  // Handle search history item click
  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);  // Set query to the clicked history item
    setDebouncedQuery(historyItem);  // Trigger debounced search for the clicked history item
  };

  return (
    <section className='w-full p-2'>
      <CustomReturn title='Favourites' />

      {/* Search input */}
      <div className='my-10'>
        <SearchInputs query={query} setQuery={setQuery} onSearch={handleSearch} />

        {/* Search history */}
        <div className='my-8'>
          <h2 className='font-semibold text-[22px] leading-7'>Search History</h2>
          <div className='flex items-center gap-5 flex-wrap my-5'>
            {searchHistory.map((search, idx) => (
              <small
                className='bg-white shadow shadow-[#00000017] p-3 rounded-xl text-[14px] leading-5 text-[#96A0B0] font-normal cursor-pointer'
                key={idx}
                onClick={() => handleHistoryClick(search)} // Trigger search when clicking on history item
              >
                {search}
              </small>
            ))}
          </div>
        </div>
      </div>

      {/* Favourites */}
      <div>
        <div className='flex items-center justify-between w-full my-2'>
          <h2 className='font-semibold text-[22px] leading-7'>Favorites</h2>
          <button className='text-[14px] leading-5 text-[#525252] font-normal hidden'>View all</button>
        </div>
        <div className='p-2'>
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((hostel) => (
              <div key={hostel.id} className='flex gap-5 items-start mb-4'>
                <img className='size-28' src={hostel.image} alt="hostel" />
                <div className='space-y-2'>
                  <h2 className='text-dark font-bold leading-5'>{hostel.name}</h2>
                  <div className='flex items-center justify-start gap-2'>
                    <img src={location} alt="location icon" />
                    <p className='text-dark text-[12px] leading-4'>{hostel.location}</p>
                  </div>
                  <p className='text-[#64748B] text-[10px] leading-4'>{hostel.description}</p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <FiEye color='#7D8A9E' size={25} />
                      <small className='text-[#525252] text-[12px] leading-4'>{hostel.views.toLocaleString()}</small>
                    </div>
                    <div className='flex items-center gap-1'>
                      <TiHeartFullOutline color='#C80F0F' size={25} />
                      <small className='text-[#525252] text-[12px] leading-4'>{hostel.likes}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No results found for "{debouncedQuery}".</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
