import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { fetchHostelById } from "../../lib/fetchHostels";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "../../utils/formatPrice";
import { Link, useNavigate, useParams } from "react-router";
import TitleHead from "../Ui/TitleHead";
import { getReviews } from "../../utils/reviews";
import { IoStar } from "react-icons/io5";
import { Review } from "../../types/review";
import { Location, Star, Wifi, Car, Shield, Message, Call } from "iconsax-react";

const HostelDetails: React.FC = () => {
  const { hostelId } = useParams();
  const navigate = useNavigate();

  const { data: hostel, isLoading } = useQuery({
    queryKey: ["hostel"],
    queryFn: () => fetchHostelById(hostelId as string),
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews(hostelId as string),
  });

  useEffect(() => {
    console.log(reviews);
    console.log("hostels", hostel);
  }, [reviews, hostelId]);

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
      reviews.data.data.reduce((sum: number, review: Review) => sum + review.rating, 0) / 
      totalReviews
    ).toFixed(1);

    return { ratingCounts, totalReviews, averageRating };
  };

  const { ratingCounts, totalReviews, averageRating } = calculateRatingStats();

  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('wifi') || featureLower.includes('internet')) return <Wifi size={16} />;
    if (featureLower.includes('parking') || featureLower.includes('car')) return <Car size={16} />;
    if (featureLower.includes('security') || featureLower.includes('guard')) return <Shield size={16} />;
    return <Star size={16} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-gray-50">
        <TitleHead title="Hostel Details" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 font-medium">Loading hostel details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <TitleHead title="Hostel Details" />
      
      <section className="p-6 pb-32">
        {/* Image Carousel */}
        <div className="mb-6">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            centerMode={false}
            showStatus={false}
            showIndicators={true}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            {hostel?.images.map((image: string, index: number) => (
              <div key={index} className="h-64 md:h-80">
                <img
                  src={image}
                  alt={`Hostel image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Hostel Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-dark mb-2">
                {hostel?.hostelName}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <Location size={18} className="text-gray-400" />
                <span className="text-sm">{hostel?.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(hostel?.price)}
              </div>
              <div className="text-sm text-gray-500">per month</div>
            </div>
          </div>

          {/* Availability Badge */}
          <div className="mb-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              hostel?.isAvailable 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                hostel?.isAvailable ? "bg-green-500" : "bg-red-500"
              }`}></div>
              {hostel?.isAvailable ? "Available" : "Full"}
            </div>
          </div>

          {/* Features */}
          {hostel?.features && hostel.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dark mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {hostel.features.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    {getFeatureIcon(feature)}
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {hostel?.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/review/${hostel?._id}`)}
              className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200"
            >
              Write Review
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200">
              Book Now
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-dark mb-6">Reviews</h2>

          {/* Overall Rating */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-dark">{averageRating}</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <IoStar
                    key={i}
                    className="w-4 h-4 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {totalReviews} reviews
              </div>
            </div>
            
            {/* Rating Distribution */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${
                          totalReviews > 0
                            ? (ratingCounts[rating as keyof typeof ratingCounts] /
                                totalReviews) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8">
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
                <div key={review._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-dark">
                      {review.user.firstName} {review.user.lastName}
                    </h3>
                    <span className="text-sm text-gray-500">
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
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500">No reviews yet</p>
                <p className="text-sm text-gray-400">Be the first to review this hostel</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={hostel?.user?.profilePicture || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} 
                alt="Agent" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Agent</p>
              <h3 className="font-semibold text-dark">
                {hostel?.user?.firstName} {hostel?.user?.lastName}
              </h3>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/chat/${hostel?.user?._id}`}
              className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-200"
            >
              <Message size={20} />
            </Link>
            <button className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200">
              <Call size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
