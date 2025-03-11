import profilePic from "/icons/profile.png";
import { convertToNormalTime } from "../../utils/ConvertToNormalTime";

const ChatComponent = ({ item }: any) => {

 
  return (
    <div className="border-b py-4 flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <div className="w-12">
          <img src={item?.otherUser.profilePicture || profilePic} className="w-full h-[50px] object-cover rounded-xl " />
        </div>
        <div className="flex-row grow">
     
  <p className="font-semibold">
    {item?.otherUser.firstName} {item?.otherUser.lastName}{" "}
    {item?.otherUser.userType === "AGENT" && (
      <span className="font-normal text-sm text-[#1B85A6]">Agent</span>
    )}
  </p>

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
