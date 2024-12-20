import React, { useEffect, useState } from "react";
import TitleHead from "../Ui/TitleHead";
import { useParams } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaWifi } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineBed } from "react-icons/md";
import { PiDesk } from "react-icons/pi";
import agentPic from "/icons/profile.png";
import { BiCommentDetail } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import { Link } from "react-router";
import { Hostel } from "../../types/Hostel";
import { fetchHostelById } from "../../lib/fetchHostels";

const HostelDetails: React.FC = () => {
  const { hostelId } = useParams();
  console.log(hostelId)

  const [hostel, setHostels] = useState<Hostel>()
  const fetchEachHostel = async () => {
    const response = await fetchHostelById(hostelId as string)
    if(response) setHostels(response)
  }
  useEffect(() => {
    fetchEachHostel()
  }, [])

  return (
    <main>
      <TitleHead title="Room Details"  />
      <section className="p-5 mt-14">
        

        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          centerMode={false}
          className="items-start justify-start h-fit lg:w-4/5 mx-auto pb-2"
        >
          {hostel && hostel.images.map((index) => (
            <div key={index} className="w-full rounded-2xl">
              <img src="https://placehold.co/600x400" className="rounded-xl" />
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
                <span className="text-lg font-bold">₦ {hostel?.price}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-[#64748B]">
              <div className="flex items-center space-x-2 bg-[#E5E5E54D] rounded-lg p-2 px-3">
                <MdOutlineBed size={18} />
                <span className="text-gray-500">2 Beds</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#E5E5E54D] rounded-lg p-2 px-3">
                <FaWifi size={18} />
                <span className="text-gray-500">Free Wifi</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#E5E5E54D] rounded-lg p-2 px-3">
                <PiDesk size={18} />
                <span className="text-gray-500">Desk</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-y border-[#E5E5E5] py-3 ">
          <p className="text-dark text-xl font-bold">₦ {hostel?.price}</p>
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
            <h2 className="text-dark font-semibold">Aremu Davies</h2>
          </div>
        </div>

        <div className="flex gap-1.5">
          <Link to='/chat' className="border border-primary rounded-2xl p-3">
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
