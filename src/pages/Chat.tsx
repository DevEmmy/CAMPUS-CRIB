/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import agentPic from "/icons/profile.png";
import { LuPhone } from "react-icons/lu";
import { Link, useParams } from "react-router";

import { MdSend } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import back from "/icons/back.svg";
import verifiedId from "/icons/id-verified.svg";
import { messaging } from "../utils/messageRequest";

const Chat = () => {
  const { userId } = useParams();
  console.log(userId);
  const [content, setContent] = useState("");

  const messageData = {
    recipient: userId,
    message: content,
  };

  // const {data: user} = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  const sendMessage = async () => {
    const response = await messaging(messageData);
    setContent("");
    console.log(response);
  };

  const [isTexted, setIsTexted] = useState<boolean>(true);
  const chatDetails = [
    {
      senderId: 1,
      message: "Hey, how are you?",
      timestamp: "2024-12-09 10:00 AM",
    },
    {
      senderId: 2,
      message: "Hi Alice! I'm good, thanks. How about you?",
      timestamp: "2024-12-09 10:01 AM",
    },
    {
      senderId: 1,
      message:
        "I'm doing well, just busy with work. Any plans for the weekend?",
      timestamp: "2024-12-09 10:02 AM",
    },
    {
      senderId: 2,
      message: "Not much, maybe catch a movie or relax. What about you?",
      timestamp: "2024-12-09 10:03 AM",
    },
    {
      senderId: 1,
      message: "Thinking of going hiking. Want to join?",
      timestamp: "2024-12-09 10:04 AM",
    },
    {
      senderId: 2,
      message: "That sounds fun! Count me in.",
      timestamp: "2024-12-09 10:05 AM",
    },
    {
      senderId: 1,
      message: "Hey, how are you?",
      timestamp: "2024-12-09 10:00 AM",
    },
    {
      senderId: 2,
      message: "Hi Alice! I'm good, thanks. How about you?",
      timestamp: "2024-12-09 10:01 AM",
    },
    {
      senderId: 1,
      message:
        "I'm doing well, just busy with work. Any plans for the weekend?",
      timestamp: "2024-12-09 10:02 AM",
    },
    {
      senderId: 2,
      message: "Not much, maybe catch a movie or relax. What about you?",
      timestamp: "2024-12-09 10:03 AM",
    },
    {
      senderId: 1,
      message: "Thinking of going hiking. Want to join?",
      timestamp: "2024-12-09 10:04 AM",
    },
    {
      senderId: 2,
      message: "That sounds fun! Count me in.",
      timestamp: "2024-12-09 10:05 AM",
    },
  ];

  const convertToNormalTime = (timestamp: any) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <main className="">
      <div className="flex items-center gap-2 px-5 py-2.5 top-0 fixed w-full bg-white">
        <Link
          to={"/"}
          className="rounded-full bg-primary size-7 flex items-center justify-center"
        >
          <img src={back} alt="back" className="size-3.5" />
        </Link>
        {isTexted && (
          <div className="flex justify-between grow">
            <div className="flex gap-2 items-center">
              <img src={agentPic} className="size-11 rounded-xl" />
              <div>
                <h2 className="text-dark font-semibold">Aremu</h2>
              </div>
            </div>

            <button className="border border-primary rounded-xl  p-2">
              <LuPhone className="size-5 text-primary" />
            </button>
          </div>
        )}
      </div>

      <section className="p-5 py-16 bg-[#f7f7f7]">
        {isTexted ? (
          <div>
            {chatDetails?.map((item: any, i: number) => (
              <div
                key={i}
                className={`flex my-3 ${item?.senderId == 1 && "justify-end"}`}
              >
                <div
                  className={` max-w-[76%] w-fit p-3 rounded-xl ${
                    item?.senderId == 1
                      ? "bg-primary text-white"
                      : "bg-white text-dark"
                  }`}
                >
                  {item?.message}
                  <p className="!text-[10px] text-right mt-1">
                    {convertToNormalTime(item.timestamp)}{" "}
                    {item?.senderId == 1 && "read"}
                  </p>
                </div>
              </div>
            ))}
            <div className="bg-white rounded-xl max-w-[90%] p-2">
              <img
                src="https://placehold.co/600x400/png"
                className="rounded-xl"
              />
              <p className="text-dark text-lg font-semibold mb-1">
                Campus Haven Lodge
              </p>
              <p className="">
                Campus Haven Hostel is a serene and well-equipped living space
                design...
              </p>
              <Link to={"/checkout"} className="w-full">
                <button className="bg-primary p-3 mt-1.5 w-full rounded-xl text-white">
                  Pay now
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid place-items-center">
            <img
              src="https://placehold.co/400"
              alt="back"
              className="size-36  rounded-xl object-cover"
            />
            <h2 className="text-dark font-semibold text-xl">Aremu Davies</h2>
            <div className="text-variant-500 flex gap-2 items-center">
              <span>Verified Agent</span>{" "}
              <img src={verifiedId} className="size-5" />
            </div>
          </div>
        )}
      </section>

      <div className="w-full py-2.5 px-5 flex rounded-t-xl bg-white items-center justify-between bottom-0 fixed">
        {/* <div> */}
        <HiPlus className="text-variant-400 size-6" />
        {/* </div> */}
        <div className="grow px-2">
          <input
            type="text"
            className="w-full bg-[#E5E5E54D] p-2 outline-none rounded-lg"
            placeholder="Type something..."
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {/* <div> */}
        <button
          onClick={() => {
            sendMessage();
            console.log(123);
          }}
        >
          <MdSend className="text-primary size-6" />
        </button>
        {/* </div> */}
      </div>
    </main>
  );
};

export default Chat;
