/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router";
import back from "/icons/back.svg";
import search from "/icons/search-01.svg";
import { SearchNormal } from "iconsax-react";
import ChatComponent from "../components/Ui/ChatComponent";

const ChatList = () => {
  const messages = [
    {
      firstname: "John",
      lastname: "Doe",
      profilePic: "https://example.com/profile/john.jpg",
      lastMessage: "Hey, how are you?",
      isRead: true,
      unreadMessage: 0,
      time: "2024-12-27T10:30:00Z",
      isAgent: false,
    },
    {
      firstname: "Jane",
      lastname: "Smith",
      profilePic: "https://example.com/profile/jane.jpg",
      lastMessage: "Can we talk later?",
      isRead: false,
      unreadMessage: 2,
      time: "2024-12-27T09:45:00Z",
      isAgent: true,
    },
    {
      firstname: "Alice",
      lastname: "Johnson",
      profilePic: "https://example.com/profile/alice.jpg",
      lastMessage: "Thanks for the update!",
      isRead: true,
      unreadMessage: 0,
      time: "2024-12-27T08:15:00Z",
      isAgent: false,
    },
    {
      firstname: "Bob",
      lastname: "Brown",
      profilePic: "https://example.com/profile/bob.jpg",
      lastMessage: "Where are you?",
      isRead: false,
      unreadMessage: 1,
      time: "2024-12-27T07:50:00Z",
      isAgent: true,
    },
  ];

  return (
    <main>
      <div className="flex items-center justify-between gap-2 px-5 py-3.5 top-0 fixed w-full bg-white">
        <Link
          to={"/"}
          className="rounded-full bg-primary size-7 flex items-center justify-center"
        >
          <img src={back} alt="back" className="size-3.5" />
        </Link>

        <img src={search} alt="search" className="size-6" />
        {/* <button className="border border-primary rounded-xl  p-2"> */}
        {/* <SearchNormal className="size-6 text-primary" /> */}
        {/* </button> */}
      </div>

      <section className="p-5 py-16 bg-white">
        <div className="">
          {messages?.map((item, i: number) => (
            <Link to={'/chat/tyu'}>
                <ChatComponent key={i} item={item} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ChatList;
