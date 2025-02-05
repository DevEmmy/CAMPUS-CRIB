import React from 'react';
import search from '/wishlist/search.svg';

interface SearchInputsProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;  // Type for setQuery
  onSearch: (query: string) => void;
}

const SearchInputs: React.FC<SearchInputsProps> = ({ query, setQuery, onSearch }) => {
  const handleSearch = () => {
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <div className='flex items-center gap-3 py-[6px] px-3 border border-[#96A0B0] shadow shadow-[#00000017] rounded-lg w-full'>
      <input
        className='flex-1 focus:outline-none text-[#96A0B0]'
        type="text"
        placeholder='Enter Keyword'
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state on input change
      />
      <button onClick={handleSearch}>
        <img className='bg-[#B46A3F] p-2 rounded-lg' src={search} alt="search icon" />
      </button>
    </div>
  );
};

export default SearchInputs;
