import profilePic from "/icons/profile.png";
import { convertToNormalTime } from "../../utils/ConvertToNormalTime";
import { fetchUserById } from "../../lib/fetchUser";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ChatComponent = ({ item }: any) => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserById(item.participants[1]),
  });
  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <div className="border-b py-4 flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <div className="w-12">
          <img src={profilePic} className="w-full rounded-xl " />
        </div>
        <div className="flex-row grow">
        {!user ? <p>Loading...</p> : (
  <p className="font-semibold">
    {user?.user?.firstName} {user?.user?.lastName}{" "}
    {user?.user?.userType === "AGENT" && (
      <span className="font-normal text-sm text-[#1B85A6]">Agent</span>
    )}
  </p>
)}

          <p>{item?.lastMessage}</p>
        </div>
      </div>
      <div className="flex-row grid place-items-center">
        <p className="text-sm">{convertToNormalTime(item?.lastMessageAt)}</p>
        {!item?.isRead && (
          <p className="w-4 bg-primary rounded-lg text-white grid place-items-center">
            {item?.unreadMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
