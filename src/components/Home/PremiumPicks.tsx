import React, { useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { useNavigate } from "react-router";
import mapMarker from "/icons/location.svg";
import { Hostel } from "../../types/Hostel";
import { updateBookmark } from "../../lib/bookmarkHostel";

interface PremiumPicksProps {
  hostels: Hostel[];
  bookmarkedIds: string[];
}

const PremiumPicks: React.FC<PremiumPicksProps> = ({
  hostels = [],
  bookmarkedIds = [],
}) => {
  const navigate = useNavigate();
  const [likedHostels, setLikedHostels] = useState<string[]>(bookmarkedIds); 

  const handleBookmark = async (hostelId: string) => {
    const isLiked = likedHostels.includes(hostelId);
    const action = isLiked ? "remove" : "add";


    setLikedHostels((prev) =>
      isLiked ? prev.filter((id) => id !== hostelId) : [...prev, hostelId]
    );

    await updateBookmark(hostelId, action);
  };

  return (
    <div className="mb-6 w-full">
      <h2 className="text-dark font-semibold my-4">Premium Picks</h2>
      <div className="flex flex-1 w-full overflow-x-scroll gap-x-1.5 mb-2 no-scrollbar">
        {hostels.length > 0 ? (
          hostels.map((hostel) => {
            const isLiked = likedHostels.includes(hostel._id);

            return (
              <div  onClick={() => navigate(`/hostels/${hostel._id}`)} className="bg-white min-w-[80vw]" key={hostel._id}>
                <div className="relative w-[98%] h-[230px]">
                  <img
                    src={hostel.images[0]}
                    alt="Modern building with trees"
                    className="rounded-xl w-full h-full object-cover border shadow"
                    onClick={() => navigate(`/hostels/${hostel._id}`)}
                  />
                  <button
                    onClick={() => handleBookmark(hostel._id)}
                    className="absolute top-2 right-2 bg-white/80 bg-opacity-25 rounded-xl p-2 shadow-md"
                  >
                    {isLiked ? (
                      <VscHeartFilled color="#C80F0F" className="size-5" />
                    ) : (
                      <VscHeart color="#C80F0F" className="size-5" />
                    )}
                  </button>
                </div>
                <h3
                  onClick={() => navigate(`/hostels/${hostel._id}`)}
                  className="font-semibold mt-4 text-dark"
                >
                  {hostel.hostelName}
                </h3>
                <div
                  onClick={() => navigate(`/hostels/${hostel._id}`)}
                  className="text-gray-500 flex mt-1 items-center"
                >
                  <img src={mapMarker} className="size-5 mr-1" />
                  <span>{hostel.location}</span>
                </div>
                <p
                  onClick={() => navigate(`/hostels/${hostel._id}`)}
                  className="line-clamp-2 mt-2 text-sm text-[#64748B]"
                >
                  {hostel.description}
                </p>
              </div>
            );
          })
        ) : (
          <div className="text-center w-full flex items-center justify-center py-10">
            No hostels available
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumPicks;
