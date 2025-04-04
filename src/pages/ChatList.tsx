/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import search from "/icons/search-01.svg";
import ChatComponent from "../components/Ui/ChatComponent";
import { fetchConversations } from "../lib/fetchConversations";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { VscChevronLeft } from "react-icons/vsc";


const ChatList = () => {
  const navigate = useNavigate()
 

  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  useEffect(() => {
    if (conversations) console.log(conversations);

  }, [conversations]);
  return (
    <main>
      <div className="flex items-center justify-between gap-2 px-5 py-5 top-0 fixed w-full bg-white">
        <div className="flex items-center justify-between w-full gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-primary border border-primary p-1 rounded-lg cursor-pointer"
          >
            <VscChevronLeft size={25} />
          </button>
          <h2 className="text-dark font-bold leading-6 flex-1">Messages</h2>
        </div>

        <img src={search} alt="search" className="size-6" />
      </div>

      <section className="p-5 py-16 bg-white">
        {isLoading && (
          <div className="flex justify-center items-center h-full mt-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
        )}
        <div>
          {conversations?.length === 0 ? (
            <div className="text-center text-gray-500 my-10">
              <p>You don't have any conversations yet.</p>
            </div>
          ) : (
            conversations?.map((item: any, i: number) => (
              <Link key={i} to={`/chat/${item._id}`}>
                <ChatComponent item={item} />
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default ChatList;
