import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Hostel } from "../../types/Hostel";
import { useNavigate } from "react-router";
import { Heart, Location, Star } from "iconsax-react";
import { updateBookmark } from "../../lib/bookmarkHostel";
import { useState } from "react";

interface HostelCardProps {
  image: string;
  title: string;
  address: string;
  desc?: string;
  price?: string;
  rating?: number;
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
  price,
  rating,
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
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-custom transition-all duration-300 cursor-pointer ${
        isFlex && "grid grid-cols-1 gap-x-1 items-center"
      }`}
      onClick={() => navigate(`/hostels/${id}`)}
    >
      <div className="relative h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBookmark(id, `${liked ? "remove" : "add"}`);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
        >
          <Heart 
            size={20} 
            className={liked ? "text-red-500 fill-current" : "text-gray-600"} 
          />
        </button>
        
        {/* Price Badge */}
        {price && (
          <div className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            ₦{price}
          </div>
        )}
        
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-gray-700">{rating}</span>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-bold text-dark line-clamp-1">
          {title}
        </h2>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Location size={16} className="text-gray-400" />
          <span className="text-sm">{address}</span>
        </div>
        
        {desc && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        )}
        
        {/* Quick Info */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">Available</span>
          </div>
          <span className="text-xs text-gray-500">View Details</span>
        </div>
      </div>
    </div>
  );
};

const MyCarousel: React.FC<CarouselProps> = ({ hostels, bookmarkedIds }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dark">Best Deals</h2>
        <div className="flex items-center gap-2 text-primary text-sm font-medium">
          <span>Special offers</span>
        </div>
      </div>
      
      {hostels && hostels.length > 0 ? (
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          centerMode={false}
          className="custom-carousel"
          interval={5000}
          stopOnHover={true}
        >
          {hostels.map((hostel: Hostel) => (
            <div key={hostel._id} className="px-2">
              <HotelCard
                id={hostel._id}
                image={hostel.images[0]}
                title={hostel.hostelName}
                address={hostel.location}
                desc={hostel.description}
                price={hostel.price}
                liked={bookmarkedIds.includes(hostel._id)}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="w-full flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Star size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No deals available</p>
            <p className="text-sm text-gray-400">Check back later for special offers</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCarousel;
