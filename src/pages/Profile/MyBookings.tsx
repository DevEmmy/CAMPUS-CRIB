/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TitleHead from "../../components/Ui/TitleHead";
import search from "/icons/search.svg";
import locationImg from "/icons/location.svg";
import hostel from "/icons/hostel.png";
// import { Location } from "iconsax-react";
import ControlledButton from "../../components/Reuseables/ControlledButton";
// import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";

const MyBookings = () => {
  const searchType = ["All", "Active", "completed", "cancelled"];
  const [activeType, setActiveType] = useState<number>(0);

  const hostelList = [
    {
      name: "Cozy Nest Hostel",
      address: "45 Maple Drive",
      image: hostel,
      status: "active",
    },
    {
      name: "Sunny Beach Resort",
      address: "21 Palm Street",
      image: hostel,
      status: "pending",
    },
    {
      name: "Mountain View Lodge",
      address: "78 Pine road",
      image: hostel,
      status: "inactive",
    },
  ];
  return (
    <main>
      <TitleHead title={"My booking's"} />
      <section className="p-5 pt-20 flex flex-col gap-1 my-3">
        <div className="flex items-center border gap-1 border-variant-400 grow rounded-lg px-1 py-2.5">
          <img src={search} className="size-5" />
          <input
            type="search"
            name=""
            className="outline-0 grow h-full"
            placeholder="Search for Hostels, locations"
            id=""
          />
        </div>

        <div className="flex justify-between overflow-scroll gap-1 py-2.5">
          {searchType?.map((item: any, i: number) => (
            <button
              key={i}
              onClick={() => setActiveType(i)}
              className={` ${
                activeType == i
                  ? "bg-[#1B85A6] p-2 px-4 rounded-lg text-white"
                  : "text-variant-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {hostelList?.map((item: any, i: number) => (
            <div key={i} className="grid grid-cols-[2fr__3fr] items-center">
              <div>
                <img src={item?.image} className="" />
              </div>
              <div className="grow flex flex-col gap-1">
                <h3 className="text-dark font-semibold text-lg">
                  {item?.name}
                </h3>
                <div className="flex items-center text-dark/85 ">
                  <img src={locationImg} className="size-5" />
                  {item?.address}
                </div>

                <div>
                  <div className={`flex items-center gap-2 ${item.status == 'active' ? 'text-[#28A745]' : item?.status == 'inactive' ? 'text-[#FFD20C]' : 'text-[#DC3545]'} `}>
                    <div className={`${item.status == 'active' ? 'bg-[#28A745]' : item?.status == 'inactive' ? 'bg-[#FFD20C]' : 'bg-[#DC3545]'} rounded-full size-2 `} />
                    {item?.status}
                  </div>
                </div>

                <Link to='/hostel/sonikaz' className="grow" >
                  <ControlledButton title="View Details"  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MyBookings;
