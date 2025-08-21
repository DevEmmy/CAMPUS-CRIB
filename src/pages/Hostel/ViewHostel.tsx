import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchHostelById, deleteHostel } from "../../lib/fetchHostels";
import { ArrowLeft, Edit, Trash, Eye, Location, Building } from "iconsax-react";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router";
import ImageModal from "../../components/Ui/ImageModal";
import { friendlyTimeAgo } from "../../utils/dateFormat";

const ViewHostel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { data: hostel, isLoading } = useQuery({
    queryKey: ["hostel", id],
    queryFn: () => fetchHostelById(id as string),
  });

  const handleDelete = async () => {
    if (!hostel) return;
    
    try {
      setIsDeleting(true);
      await deleteHostel(hostel._id);
      navigate("/agent-home");
    } catch (error) {
      console.error("Error deleting hostel:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading hostel details...</p>
        </div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">Hostel not found</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <Link
              to={`/hostels/${id}/edit`}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Edit size={16} />
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDeleting 
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed" 
                  : "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
              }`}
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Trash size={16} />
              )}
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
          {/* Image Gallery */}
          <div className="relative h-64 md:h-80">
            {hostel.images && hostel.images.length > 0 ? (
              <>
                <img
                  src={hostel.images[activeImage]}
                  alt={hostel.hostelName}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleImageClick(hostel.images[activeImage])}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Image Navigation */}
                {hostel.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {hostel.images.map((_: unknown, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === activeImage ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Building size={48} className="text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>

          {/* Hostel Info */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-dark dark:text-white mb-2">{hostel.hostelName}</h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                  <Location size={16} />
                  <span>{hostel.location}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-primary mb-1">
                  {formatPrice(hostel.price)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">per room</div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                hostel.isAvailable 
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" 
                  : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
              }`}>
                {hostel.isAvailable ? "Available" : "Not Available"}
              </div>
              
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Eye size={16} />
                <span className="text-sm">{hostel.views || 0} views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-dark dark:text-white">Basic Information</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Hostel Type</span>
                <span className="font-medium text-dark dark:text-white">{hostel.hostelType}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Available Rooms</span>
                <span className="font-medium text-dark dark:text-white">{hostel.availableRooms}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Price</span>
                <span className="font-medium text-dark dark:text-white">{formatPrice(hostel.price)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created</span>
                <span className="font-medium text-dark dark:text-white">{friendlyTimeAgo(hostel.createdAt)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                <span className="font-medium text-dark dark:text-white">{friendlyTimeAgo(hostel.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-dark dark:text-white">Features</h2>
            
            {hostel.features && hostel.features.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {hostel.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-dark dark:text-gray-200">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No features listed</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Description</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {hostel.description || "No description available."}
          </p>
        </div>

        {/* Image Gallery */}
        {hostel.images && hostel.images.length > 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">All Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hostel.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image}
                    alt={`${hostel.hostelName} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Analytics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{hostel.views || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{hostel.inquiries || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Inquiries</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {hostel.isPriorityListing ? "Yes" : "No"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Priority Listing</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {hostel.isFeatured ? "Yes" : "No"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Featured</div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageSrc={selectedImage}
          imageAlt={hostel?.hostelName || "Hostel Image"}
        />
      </div>
    </main>
  );
};

export default ViewHostel;
