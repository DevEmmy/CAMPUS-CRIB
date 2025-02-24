import React, { useState } from "react";
import TitleHead from "../Ui/TitleHead";
import { useParams } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoLocationOutline } from "react-icons/io5";
import agentPic from "/icons/profile.png";
import { BiCommentDetail } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { fetchHostelById } from "../../lib/fetchHostels";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "../../utils/formatPrice";
// import Loader from "../Ui/Loader";
import { useUserContext } from "../../contexts/UserContext";
import profile from "/icons/profile.png";

const HostelDetails: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<number>(0);
  const { userType } = useUserContext();
  const { hostelId } = useParams();
  const navigate = useNavigate();
  console.log(hostelId);


  const { data: hostel, isLoading } = useQuery({
    queryKey: ["hostel"],
    queryFn: () => fetchHostelById(hostelId as string),
  });

  if (isLoading) {
    // return <div className="h-screen w-full flex items-center justify-center"><Loader/></div>;
  }

  const navTabs = [
    {
      id: 0,
      title: "basic info",
    },
    {
      id: 1,
      title: "bookings",
    },
    {
      id: 2,
      title: "invoice & payment",
    },
  ];

  const BasicInfo = () => {
    return (
      <div>
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
                <div key={index} className="w-full rounded-2xl">
                  <img src={image} alt="image" className="rounded-xl" />
                </div>
              ))}
          </Carousel>

          <div className="bg-white  overflow-hidden">
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    {hostel?.hostelName}
                  </h2>
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
                  ({
                    feature,
                    index,
                  }: {
                    feature: string[];
                    index: number;
                  }) => (
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
            <button className="grow bg-[#E5E5E54D] text-variant-500 p-2.5 rounded-xl">
              Negotiable
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
      </div>
    );
  };

  const Bookings = () => {
    return (
      <div className="px-5">
        <h3 className="text-dark">Total rooms</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-primary p-2 rounded-xl text-[#636363]">
            20 available
          </div>
          <div className="border border-primary p-2 rounded-xl text-[#636363]">
            30 booked
          </div>
        </div>

        <div className="py-3">
          <h3 className="my-1.5">Upcoming Bokkings</h3>
          <div className="flex flex-row justify-between items-center gap-2 my-2">
            <img src={profile} className="size-12 rounded-xl" />
            <div className="grow">
              <h3 className="text-dark">Clinton Sandra</h3>
              <p className="text-sm text-[#636363] italic">
                Single Room - Check-in Feb 5, 2024
              </p>
            </div>
            <input type="checkbox" />
          </div>
          <button className="bg-primary p-3 rounded-xl text-white font-semibold text-center w-full">
            View all bookings
          </button>
        </div>
      </div>
    );
  };

  const InvoicePay = () => {
    return (
      <div className="px-5 flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center gap-2 my-2">
          <img src={profile} className="size-12 rounded-xl" />
          <div className="grow">
            <h3 className="text-dark">Inspection Fee Invoice</h3>
            <p className="text-xs text-[#636363] italic flex gap-1 justify-between">
              <span> Date Issued: Feb 1, 2024</span>{" "}
              <span className="italic text-green-400">active</span>
            </p>
          </div>
          <button className="bg-[#1BA68C] p-2 rounded-xl text-white px-3" onClick={() => navigate('/invoice/inspection')}>
            View
          </button>
        </div>

        <div className="flex flex-row justify-between items-center gap-2 my-2">
          <img src={profile} className="size-12 rounded-xl" />
          <div className="grow">
            <h3 className="text-dark">Hostel Fee Invoice</h3>
            <p className="text-xs text-[#636363] italic flex gap-1 justify-between">
              <span> Date Issued: Feb 1, 2024</span>{" "}
              <span className="italic text-green-400">active</span>
            </p>
          </div>
          <button className="bg-[#5B1BA6] p-2 rounded-xl text-white px-3" onClick={() => navigate('/invoice/hostel')}>
            View
          </button>
        </div>

        <button className="bg-primary p-3 rounded-xl text-white font-semibold text-center w-full">
          Create Invoice
        </button>
      </div>
    );
  };
  return (
    <main>
      <TitleHead title="Room Details" />

      <section className="mt-14">
        {userType == "AGENT" && (
          <div className="grid grid-cols-3 gap-2 p-5">
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              navTabs?.map((item: any) => (
                <div
                  key={item?.id}
                  onClick={() => setActiveTabs(item?.id)}
                  className={`${
                    activeTabs == item?.id
                      ? "bg-[#1B85A6] text-white"
                      : "bg-white  border border-[#E8E8E8] text-[#636363]"
                  } text-xs text-center p-1 grid place-items-center rounded-lg`}
                >
                  {item?.title}
                </div>
              ))
            }
          </div>
        )}

        {activeTabs == 0 ? (
          <BasicInfo />
        ) : activeTabs == 1 ? (
          <Bookings />
        ) : (
          <InvoicePay />
        )}
      </section>
    </main>
  );
};

export default HostelDetails;
