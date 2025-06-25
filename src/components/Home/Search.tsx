/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Award, Briefcase, Like1, Location, SearchNormal } from "iconsax-react";
import { Link, useNavigate } from "react-router";

const Search = () => {
  const [type, setType] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const searchType = [
    {
      title: "recommended",
      source: <Like1 size="20" />,
    },
    {
      title: "featured",
      source: <Award size="20" />,
    },
    {
      title: "nearby",
      source: <Location size="20" />,
    },
    {
      title: "Affordable",
      source: <Briefcase size="20" />,
    },
  ];

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}&type=${type}`);
    }
  };
  

  return (
    <div className="mt-6">
      <div className="flex gap-1.5">
        <div className="flex items-center border gap-1 border-variant-400 grow rounded-lg p-3 min-w-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-0 grow h-full"
            placeholder="Search for Hostels, locations"
          />
        </div>
        <button onClick={handleSearch} className="bg-primary rounded-xl p-3">
          <SearchNormal className="text-white" size="24" />
        </button>
      </div>

<div className="flex flex-col gap-2 my-2">
      <Link to={'/find-roommate'} className="bg-primary p-2 text-white my-2 w-full rounded-md text-center font-medium capitalize text-[17px]">find roommates</Link>
</div>

      {/* Search Type Filters */}
      <div className="flex overflow-scroll gap-2 py-5 no-scrollbar">
        {searchType?.map((item: any, i: number) => (
          <button
            onClick={() => setType(i)}
            key={i}
            className={`flex gap-1 min-w-fit items-center rounded-lg capitalize justify-center text-[14px] py-2 px-3 border ${
              type == i
                ? "bg-primary text-white"
                : "border-variant-500 text-variant-500"
            }`}
          >
            <span>{item?.title}</span>
            {item?.source}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
