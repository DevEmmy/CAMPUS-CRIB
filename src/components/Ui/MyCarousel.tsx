import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import mapMarker from "/icons/location.svg";
import { Hostel } from "../../types/Hostel";
import { useNavigate } from "react-router";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { updateBookmark } from "../../lib/bookmarkHostel";
import { useState } from "react";

interface HostelCardProps {
  image: string;
  title: string;
  address: string;
  desc?: string;
  isFlex?: boolean;
  id: string;
  liked?: boolean;
}

interface CarouselProps {
  hostels: Hostel[];
  bookmarkedIds: string[];
}

const HotelCard = ({
  image,
  title,
  address,
  desc,
  isFlex,
  liked: initiallyLiked = false,
  id,
}: HostelCardProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(initiallyLiked);

  const handleBookmark = async (hostelId: string, action: string) => {
    setLiked((prev) => !prev);
    await updateBookmark(hostelId, action);
  };

  return (
    <div
      key={id}
      className={`bg-white rounded-2xl py-3 overflow-hidden max-w-sm ${
        isFlex && "grid grid-cols-1 gap-x-1 items-center"
      }`}
    >
      <div className="relative w-4/5 h-[230px]">
        <img
          onClick={() => navigate(`/hostel/${id}`)}
          src={image}
          alt="Aerial view of a large hotel complex surrounded by greenery"
          className="w-full h-48 object-cover rounded-xl"
        />
        <button
          onClick={() => handleBookmark(id, `${liked ? "remove" : "add"}`)}
          className="absolute top-2 right-2 bg-white/80 bg-opacity-25  rounded-xl p-2 shadow-md"
        >
          {liked ? (
            <VscHeartFilled color="#C80F0F" className="size-5" />
          ) : (
            <VscHeart color="#C80F0F" className="size-5" />
          )}
        </button>
      </div>
      <div className="py-3">
        <h2
          onClick={() => navigate(`/hostel/${id}`)}
          className="text-lg font-semibold text-left"
        >
          {title}
        </h2>
        <div
          onClick={() => navigate(`/hostel/${id}`)}
          className=" text-dark flex items-center text-left gap-1 justify-start mt-2 "
        >
          <div>
            <img src={mapMarker} className="size-5" />
          </div>
          <p className="text-left text-[15px]">{address}</p>
        </div>
        <p
          onClick={() => navigate(`/hostel/${id}`)}
          className="text-sm text-variant-500 text-left"
        >
          {desc && desc.slice(0, 30)}
        </p>
      </div>
    </div>
  );
};

const MyCarousel: React.FC<CarouselProps> = ({ hostels, bookmarkedIds }) => {
  return (
    <>
      <div>
        <h2 className="font-semibold text-base">Best deals</h2>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          centerMode={false}
          className="items-start justify-start h-fit lg:w-4/5 mx-auto pb-10"
        >
          {hostels &&
            hostels?.map((hostel: Hostel) => (
              <HotelCard
                key={hostel?._id}
                id={hostel?._id}
                image={hostel?.images[0]}
                title={hostel?.hostelName}
                address={hostel?.location}
                liked={bookmarkedIds.includes(hostel._id)}
              />
            ))}
        </Carousel>
        {hostels?.length == 0 && (
          <div className="text-center w-full flex items-center justify-center py-10">
            No hostels available
          </div>
        )}
      </div>

      <div>
        <h2 className="font-semibold text-base">Top Amenities</h2>

        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          centerMode={false}
          className="items-start justify-start h-fit lg:w-4/5 mx-auto pb-10"
        >
          {hostels &&
            hostels?.map((hostel: Hostel) => (
              <HotelCard
                key={hostel?._id}
                id={hostel?._id}
                image={hostel?.images[0]}
                title={hostel?.hostelName}
                address={hostel?.location}
                desc={hostel?.description}
                liked={bookmarkedIds.includes(hostel._id)}
                isFlex
              />
            ))}
        </Carousel>
        {hostels?.length == 0 && (
          <div className="text-center w-full flex items-center justify-center py-10">
            No hostels available
          </div>
        )}
      </div>
    </>
  );
};

export default MyCarousel;
