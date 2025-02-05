// import React from "react";
import TitleHead from "../Ui/TitleHead";
import filter from "/icons/filter-horizontal.svg";
import keyboard from "/icons/keyboard.svg";
import search from "/icons/search.svg";
import cancelCircle from "/icons/cancel-circle.svg";

// import MyCarousel from "../Ui/MyCarousel";
import SearchCarousel from "./SearchCarousel";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";

const Search = () => {
  const [haveSearch, setHaveSearched] = useState<boolean>(true);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  useEffect(() => {
    setHaveSearched(false);
  }, [])
  return (
    <main className="">
      <TitleHead title="Search" />
      <section className="p-5 my-10">
        <div className="flex gap-2  my-5">
          <div className="flex items-center border gap-1 border-variant-400 grow rounded-lg p-3">
            <img src={search} className="size-7" />
            <input
              type="search"
              name=""
              className="outline-none grow h-full"
              placeholder="Search for Hostels, locations"
              id=""
            />
          </div>
          <button className="bg-primary rounded-xl p-3" onClick={() => setIsFilter(true)}>
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
        ) : (
          <div className="flex-row">
            <div className="my-3 flex-row gap-1">
              <div className="flex justify-between items-center">
                <p className="text-dark">Recent</p>
                <img src={cancelCircle} />
              </div>

              <div className="flex overflow-x-scroll gap-x-3 w-full mt-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((i) => (
                  <div key={i} className="text-center justify-center">
                    <img
                      src="https://placehold.co/600x400"
                      className="min-w-14 h-14 object-cover rounded-lg"
                    />
                    <p className="text-xs">Grace hostel</p>
                  </div>
                ))}
              </div>
            </div>

            {/* <MyCarousel /> */}
            <SearchCarousel />
          </div>
        )}
      </section>
      {isFilter && (
        <div className="bg_overlay relative">
          <div className="p-5 rounded-t-xl shadow fixed bottom-0 bg-white z-[99999]">
            <div className="flex items-center justify-between mb-5">
              <RiCloseFill size={23} onClick={() => setIsFilter(false)}/>
              <p className="text-primary text-center text-xl">Filter</p>
              <p className="text-white">,</p>
            </div>
            <Filter />
          </div>
        </div>
      )}
    </main>
  );
};

export default Search;
