import React, { useState } from "react";
import { Heart, Location, Star, Wifi, Car, Shield } from "iconsax-react";
import { useNavigate } from "react-router";
import { Hostel } from "../../types/Hostel";
import { updateBookmark } from "../../lib/bookmarkHostel";
import { formatPrice } from "../../utils/formatPrice";
import ImageModal from "../Ui/ImageModal";

interface HostelCardProps {
  hostel: Hostel;
  bookmarkedIds?: string[];
  className?: string;
  showFeatures?: boolean;
  variant?: "horizontal" | "vertical";
}

const HostelCard: React.FC<HostelCardProps> = ({ 
  hostel, 
  bookmarkedIds = [], 
  className = "",
  showFeatures = true,
  variant = "vertical"
}) => {
  const navigate = useNavigate();
  const [likedHostels, setLikedHostels] = useState<string[]>(bookmarkedIds);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleBookmark = async (hostelId: string) => {
    const isLiked = likedHostels.includes(hostelId);
    const action = isLiked ? "remove" : "add";

    setLikedHostels((prev) =>
      isLiked ? prev.filter((id) => id !== hostelId) : [...prev, hostelId]
    );

    await updateBookmark(hostelId, action);
  };

  const handleImageClick = (e: React.MouseEvent, imageSrc: string) => {
    e.stopPropagation();
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('wifi') || featureLower.includes('internet')) return <Wifi size={12} />;
    if (featureLower.includes('parking') || featureLower.includes('car')) return <Car size={12} />;
    if (featureLower.includes('security') || featureLower.includes('guard')) return <Shield size={12} />;
    return <Star size={12} />;
  };

  const isLiked = likedHostels.includes(hostel._id);

  if (variant === "horizontal") {
    return (
      <div 
        className={`bg-white rounded-2xl shadow-custom border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer group flex-shrink-0 ${className}`}
        onClick={() => navigate(`/hostels/${hostel._id}`)}
      >
        <div className="flex">
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              src={hostel.images[0]}
              alt={hostel.hostelName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={(e) => handleImageClick(e, hostel.images[0])}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            
            {/* Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark(hostel._id);
              }}
              className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:bg-white transition-all duration-200"
            >
              <Heart 
                size={16} 
                className={isLiked ? "text-red-500 fill-current" : "text-gray-600"} 
              />
            </button>
            
            {/* Price Badge */}
            <div className="absolute bottom-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
              {formatPrice(hostel.price)}
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-base text-dark line-clamp-1">
                {hostel.hostelName}
              </h3>
              
              {/* Availability Badge */}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                hostel.isAvailable 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {hostel.isAvailable ? "Available" : "Full"}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Location size={14} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{hostel.location}</span>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
              {hostel.description}
            </p>
            
            {/* Quick Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">
                  {hostel.availableRooms} rooms available
                </span>
              </div>
              <span className="text-xs text-primary font-medium">View Details</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-custom transition-all duration-300 cursor-pointer group flex-shrink-0 ${className}`}
      onClick={() => navigate(`/hostels/${hostel._id}`)}
    >
      <div className="relative h-48">
        <img
          src={hostel.images[0]}
          alt={hostel.hostelName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={(e) => handleImageClick(e, hostel.images[0])}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
        
        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBookmark(hostel._id);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
        >
          <Heart 
            size={20} 
            className={isLiked ? "text-red-500 fill-current" : "text-gray-600"} 
          />
        </button>
        
        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {formatPrice(hostel.price)}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            hostel.isAvailable 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {hostel.isAvailable ? "Available" : "Full"}
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-lg text-dark line-clamp-1 mb-2">
            {hostel.hostelName}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <Location size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{hostel.location}</span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {hostel.description}
          </p>
        </div>
        
        {/* Features Preview */}
        {showFeatures && hostel.features && hostel.features.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Key Features
              </span>
              <span className="text-xs text-gray-400">
                {hostel.features.length} features
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {hostel.features.slice(0, 4).map((feature: string, index: number) => (
                <div 
                  key={index}
                  className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg"
                  title={feature}
                >
                  {getFeatureIcon(feature)}
                  <span className="text-xs text-gray-600 line-clamp-1">
                    {feature.length > 12 ? feature.substring(0, 12) + '...' : feature}
                  </span>
                </div>
              ))}
              {hostel.features.length > 4 && (
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                  <span className="text-xs text-gray-500 font-medium">
                    +{hostel.features.length - 4} more
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">
              {hostel.availableRooms} rooms available
            </span>
          </div>
          <span className="text-xs text-primary font-medium">View Details</span>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={selectedImage}
        imageAlt={hostel.hostelName}
      />
    </div>
  );
};

export default HostelCard; 