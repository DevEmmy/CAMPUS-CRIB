import React, { useState } from "react";
import { fetchHostelById } from "../../lib/fetchHostels";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "../../utils/formatPrice";
import { Link, useNavigate, useParams } from "react-router";
import TitleHead from "../Ui/TitleHead";
import { getReviews } from "../../utils/reviews";
import { IoStar } from "react-icons/io5";
import { Review } from "../../types/review";
import {
  Location,
  Star,
  Wifi,
  Car,
  Shield,
  Message,
  Building,
  Eye,
  User,
} from "iconsax-react";
import ImageModal from "../Ui/ImageModal";

const HostelDetails: React.FC = () => {
  const { hostelId } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { data: hostel, isLoading } = useQuery({
    queryKey: ["hostel", hostelId],
    queryFn: () => fetchHostelById(hostelId as string),
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", hostelId],
    queryFn: () => getReviews(hostelId as string),
  });

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const calculateRatingStats = () => {
    if (!reviews?.data?.data || reviews.data.data.length === 0) {
      return {
        ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        totalReviews: 0,
        averageRating: "0.0",
        hasReviews: false,
      };
    }

    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.data.data.forEach((review: Review) => {
      ratingCounts[review.rating as keyof typeof ratingCounts]++;
    });

    const totalReviews = reviews.data.data.length;
    const averageRating = (
      reviews.data.data.reduce(
        (sum: number, review: Review) => sum + review.rating,
        0
      ) / totalReviews
    ).toFixed(1);

    return { ratingCounts, totalReviews, averageRating };
  };

  const { ratingCounts, totalReviews, averageRating } = calculateRatingStats();

  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes("wifi") || featureLower.includes("internet"))
      return <Wifi size={16} />;
    if (featureLower.includes("parking") || featureLower.includes("car"))
      return <Car size={16} />;
    if (featureLower.includes("security") || featureLower.includes("guard"))
      return <Shield size={16} />;
    return <Star size={16} />;
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-dvh bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Hostel Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The hostel you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-gray-900">
      <TitleHead title="Hostel Details" />

      <div className="p-4 mb-20 space-y-6">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Image Navigation */}
                {hostel.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {hostel.images.map((_: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === activeImage ? "bg-white" : "bg-white/50"
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
                <h1 className="text-2xl font-bold text-dark dark:text-white mb-2">
                  {hostel.hostelName}
                </h1>
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
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  hostel.isAvailable
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}
              >
                {hostel.isAvailable ? "Available" : "Not Available"}
              </div>

              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
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
                <span className="text-gray-600 dark:text-gray-300">Hostel Type</span>
                <span className="font-medium text-dark dark:text-white">{hostel.hostelType}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Available Rooms</span>
                <span className="font-medium text-dark dark:text-white">{hostel.availableRooms}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Price</span>
                <span className="font-medium text-dark dark:text-white">{formatPrice(hostel.price)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Created</span>
                <span className="font-medium text-dark dark:text-white">
                  {formatDate(hostel.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-dark dark:text-white">Features</h2>

            {hostel.features && hostel.features.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {hostel.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    {getFeatureIcon(feature)}
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

        {/* Reviews Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-dark dark:text-white">Reviews</h2>
            <button
              onClick={() => navigate(`/review/${hostel._id}`)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Star size={16} />
              Write Review
            </button>
          </div>

          {/* Overall Rating */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-dark dark:text-white">
                {averageRating}
              </div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <IoStar
                    key={i}
                    className="w-4 h-4 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {totalReviews} reviews
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300 w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${
                          totalReviews > 0
                            ? (ratingCounts[
                                rating as keyof typeof ratingCounts
                              ] /
                                totalReviews) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
                    {ratingCounts[rating as keyof typeof ratingCounts]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {reviews?.data?.data && reviews.data.data.length > 0 ? (
              reviews.data.data.map((review: Review) => (
                <div
                  key={review._id}
                  className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-dark dark:text-white">
                      {review.user.firstName} {review.user.lastName}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <IoStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-amber-500 text-amber-500"
                            : "fill-gray-200 dark:fill-gray-600 text-gray-200 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={24} className="text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Be the first to review this hostel
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-lg p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Link
              to={`/agent/${String(hostel?.user._id)}`}
              className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                <img
                  src={
                    hostel?.user?.profilePicture ||
                    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                  }
                  alt="Agent"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Agent</p>
                <h3 className="font-semibold text-dark dark:text-white">
                  {hostel?.user?.firstName} {hostel?.user?.lastName}
                </h3>
              </div>
            </Link>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/chat/${hostel?.user?._id}`}
              className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-200"
            >
              <Message size={20} />
            </Link>
            <Link
              to={`/agent/${hostel?.user?._id}`}
              className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-200"
            >
              <User size={20} />
            </Link>
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
    </main>
  );
};

export default HostelDetails;