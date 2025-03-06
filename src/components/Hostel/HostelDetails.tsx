import React from "react";
import TitleHead from "../Ui/TitleHead";
import { useParams, useNavigate } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoLocationOutline } from "react-icons/io5";
import agentPic from "/icons/profile.png";
import { BiCommentDetail } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import { Link } from "react-router";
import { fetchHostelById } from "../../lib/fetchHostels";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "../../utils/formatPrice";
import Loader from "../Ui/Loader";

const HostelDetails: React.FC = () => {
  const { hostelId } = useParams();
  const navigate = useNavigate()
  console.log(hostelId);

  const { data: hostel, isLoading } = useQuery({
    queryKey: ["hostel"],
    queryFn: () => fetchHostelById(hostelId as string),
  });

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center"><Loader/></div>;
  }

  return (
    <main>
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
            hostel.images.map(
              (image: string, index: number ) => (
                <div key={index} className="w-full h-[300px] rounded-2xl">
                  <img src={image} alt="image" className="rounded-xl object-cover h-full w-full" />
                </div>
              )
            )}
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
                <span className="text-lg font-bold">{formatPrice(hostel?.price)}</span>
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
          <p className="text-dark text-xl font-bold">{formatPrice(hostel?.price)}</p>
          <button onClick={() => navigate(`/review/${hostelId}`)} className="grow bg-[#E5E5E54D] text-primary p-2.5 rounded-xl">
            Review
          </button>
        </div>

        <div className="text-variant-500 py-3 text-[15px]">
          {hostel?.description}
        </div>
      </section>

      <section className="flex items-center justify-between bottom-0 fixed bg-white w-full shadow px-5 py-2.5">
        <div className="flex gap-2">
          <img src={agentPic} className="size-12 rounded-xl" />
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
    </main>
  );
};

export default HostelDetails;
