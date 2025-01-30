import { Link } from "react-router";
import back from "/icons/back.svg";
import search from "/icons/search-01.svg";
import ChatComponent from "../components/Ui/ChatComponent";
import { fetchConversations } from "../lib/fetchConversations";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUser } from "../lib/fetchUser";

const ChatList = () => {

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  useEffect(() => {
    if (conversations) console.log(conversations);
  }, []);

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
      </div>

      <section className="p-5 py-16 bg-white">
        <div className="">
          {conversations?.map((item: any, i: number) => (
            <Link to={`/chat/${user?._id}`}>
              <ChatComponent key={i} item={item} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ChatList;
