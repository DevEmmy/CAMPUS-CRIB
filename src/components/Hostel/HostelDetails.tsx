import React, { useEffect, useState } from "react";
// import TitleHead from "../Ui/TitleHead";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoCopyOutline, IoLocationOutline } from "react-icons/io5";
// import agentPic from "/icons/profile.png";
import { BiCommentDetail } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import { fetchHostelById } from "../../lib/fetchHostels";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "../../utils/formatPrice";
import { Link, useNavigate, useParams } from "react-router";
import TitleHead from "../Ui/TitleHead";
import { getReviews } from "../../utils/reviews";
import { IoStar } from "react-icons/io5";
import { Review } from "../../types/review";

import Modal from "../Reuseables/Modal";
// import Loader from "../Ui/Loader";
// import { useUserContext } from "../../contexts/UserContext";
// import profile from "/icons/profile.png";

const HostelDetails: React.FC = () => {
  // const [activeTabs, setActiveTabs] = useState<number>(0);
  // const { userType } = useUserContext();
  const { hostelId } = useParams();
  const navigate = useNavigate();
  console.log(hostelId);

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
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const ratingCounts = {
    5: 36,
    4: 4,
    3: 2,
    2: 0,
    1: 1,
  };

  const totalReviews = Object.values(ratingCounts).reduce((a, b) => a + b, 0);

  const averageRating = (
    Object.entries(ratingCounts).reduce(
      (sum, [rating, count]) => sum + Number(rating) * count,
      0
    ) / totalReviews
  ).toFixed(1);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mt-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <TitleHead title="Room Details" />
      <section className="p-5 mt-14">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          centerMode={false}
          className="items-start justify-start h-fit lg:w-4/5 mx-auto pb-2"
        >
          {hostel &&
            hostel.images.map((image: string, index: number) => (
              <div key={index} className="w-full rounded-2xl h-[300px]">
                <img
                  src={image}
                  alt="image"
                  className="rounded-xl h-full object-cover border shadow"
                />
              </div>
            ))}
        </Carousel>

        <div className="bg-white  overflow-hidden">
          <div className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{hostel?.hostelName}</h2>
                <p className="text-[#64748B] flex items-center">
                  <IoLocationOutline size={20} />
                  {hostel?.location}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold">
                  {formatPrice(hostel?.price)}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start justify-between my-5 gap-2 text-[#64748B]">
              {hostel?.features.map(
                ({ feature, index }: { feature: string[]; index: number }) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-[#E5E5E54D] rounded-lg p-2 px-3"
                  >
                    <span className="text-gray-500">{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-y border-[#E5E5E5] py-3 ">
          <p className="text-dark text-xl font-bold">
            {formatPrice(hostel?.price)}
          </p>
          <button
            onClick={() => navigate(`/review/${hostel?._id}`)}
            className="grow bg-[#E5E5E54D] text-primary p-2.5 rounded-xl"
          >
            Review
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="grow bg-[#E5E5E54D] text-primary p-2.5 rounded-xl"
          >
            Pay
          </button>
        </div>

        <div className="text-variant-500 py-3 text-[15px]">
          {hostel?.description}
        </div>
      </section>

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg border-t">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Reviews</h2>

        {/* Overall Rating */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {averageRating}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <IoStar
                  key={i}
                  className="w-5 h-5 fill-amber-600 text-amber-600"
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2 mb-8">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <div className="flex items-center w-24">
                {[...Array(5)].map((_, i) => (
                  <IoStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating
                        ? "fill-amber-600 text-amber-600"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="w-full ml-4 h-4 bg-[#E6CDBF]">
                <div
                  className="h-4 bg-amber-700"
                  style={{
                    width: `${
                      (ratingCounts[rating as keyof typeof ratingCounts] /
                        totalReviews) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({ratingCounts[rating as keyof typeof ratingCounts]})
              </span>
            </div>
          ))}
        </div>

        {/* Individual Reviews */}
        <div className="border-t border-gray-200 pt-6 space-y-6 mb-6">
          {reviews?.data.data.length &&
            reviews?.data.data.map((review: Review) => (
              <div key={review._id} className="pb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-medium text-gray-900">
                    {review.user.firstName}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <IoStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-amber-600 text-amber-600"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
        </div>
      </div>

      <section className="flex items-center justify-between bottom-0 fixed bg-white w-full shadow px-5 py-2.5">
        <div className="flex gap-2">
          <img src={hostel?.user?.profilePicture} className="size-12 rounded-xl" />
          <div>
            <p className="text-[#A3A3A3] text-sm">Agent</p>
            <h2 className="text-dark font-semibold">
              {hostel?.user?.firstName} {hostel?.user?.lastName}
            </h2>
          </div>
        </div>

        <div className="flex gap-1.5">
          <Link
            to={`/chat/${hostel?.user?._id}`}
            className="border border-primary rounded-2xl p-3"
          >
            <BiCommentDetail className="size-6 text-primary" />
          </Link>

          <button className="border border-primary rounded-2xl p-3">
            <LuPhone className="size-6 text-primary" />
          </button>

          {/* <LuPhone /> */}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="">
          <p className="text-center mb-4">
            Transfer{" "}
            <span className="text-primary font-bold">
              {" "}
              {formatPrice(hostel?.price)}{" "}
            </span>
          </p>
          <div className="border-2 border-dashed border-primary text-dark p-4 rounded-md mb-4">
            <div className="mb-2">
              <p className="font-bold">BANK NAME</p>
              <p className="text-sm">{hostel?.user?.bankName}</p>
            </div>
            <div className="mb-2">
              <p className="font-bold">ACCOUNT NAME</p>
              <p className="text-sm">{hostel?.user?.accountName}</p>
            </div>
            <div className="mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">Account Number</p>
                <p className="text-sm">{hostel?.user?.accountNumber}</p>
              </div>
              <IoCopyOutline size={16} className="text-primary" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">Amount</p>
                <p className="text-sm"> {formatPrice(hostel?.price)} </p>
              </div>
              <IoCopyOutline size={16} className="text-primary" />
            </div>
          </div>
          <button className="bg-primary text-white py-2 px-4 rounded-md w-full mb-4">
            i've sent the money
          </button>
          <p className="text-dark text-sm text-center">Change Payment Method</p>
        </div>
      </Modal>
    </div>
  );
};

export default HostelDetails;
