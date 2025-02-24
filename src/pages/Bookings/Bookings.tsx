import React from "react";
import TitleHead from "../../components/Ui/TitleHead";
import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";
import profile from "/icons/profile.png";
import { useNavigate } from "react-router";

const BookingsList = () => {
    const navigate = useNavigate();
  const bookingData = [
    {
      profile: "https://example.com/profile1.jpg",
      name: "John Doe",
      content: "Single Room - Check-in Feb 5, 2024",
      status: "done",
    },
    {
      profile: "https://example.com/profile2.jpg",
      name: "Jane Smith",
      content: "Double Room - Check-in Mar 10, 2024",
      status: "pending",
    },
    {
      profile: "https://example.com/profile3.jpg",
      name: "Alice Johnson",
      content: "Suite - Check-in Apr 15, 2024",
      status: "failed",
    },
    {
      profile: "https://example.com/profile4.jpg",
      name: "Bob Williams",
      content: "Deluxe Room - Check-in May 20, 2024",
      status: "done",
    },
    {
      profile: "https://example.com/profile5.jpg",
      name: "Charlie Brown",
      content: "Single Room - Check-in Jun 25, 2024",
      status: "pending",
    },
    {
      profile: "https://example.com/profile6.jpg",
      name: "Emma Davis",
      content: "Penthouse - Check-in Jul 30, 2024",
      status: "failed",
    },
  ];

  return (
    <main>
      <TitleHead title={"Booking List"} />
      <section className="p-5 pt-20 flex flex-col gap-1 my-3">
        <div className="flex gap-2 items-center">
          <div className="flex grow items-center border gap-1 border-variant-400 rounded-lg px-1 py-2.5">
            <IoSearchOutline className="text-[#3a3a3a] size-5" />
            <input
              type="search"
              className="outline-0 grow h-full text-variant-400"
              placeholder="Search by student name, hostel, or booking ID..."
            />
          </div>

          <button className="bg-primary p-2 rounded-lg">
            <IoFilterOutline className="text-white size-6" />
          </button>
        </div>

        <div className="flex flex-col gap-2 py-5">
          {bookingData.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg" onClick={() => navigate('/bookings/1234')}>
              <img
                src={profile}
                className=" w-14 h-14 rounded-lg object-scale-down"
                alt={item.name}
              />

              {/* <div className="grow flex flex-col gap-1"> */}
              <div className="grow">
                <h3 className="text-dark font-semibold text-lg">{item.name}</h3>
                <div className="text-dark/85 text-sm">{item.content}</div>
              </div>

              {/* Status */}
              <div
                className={`flex items-center gap-2 ${
                  item.status === "done"
                    ? "text-[#28A745]"
                    : item.status === "pending"
                    ? "text-[#FFD20C]"
                    : "text-[#DC3545]"
                }`}
              >
                <div
                  className={`rounded-full size-2 ${
                    item.status === "done"
                      ? "bg-[#28A745]"
                      : item.status === "pending"
                      ? "bg-[#FFD20C]"
                      : "bg-[#DC3545]"
                  }`}
                />
                {/* {item.status} */}
              </div>
            </div>
            // </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BookingsList;
