import { convertToNormalTime } from "../../utils/ConvertToNormalTime";

const ChatComponent = ({ item }: any) => {
  return (
    <div className="border-b py-4 flex justify-between items-center">
      <div className="flex grow items-center gap-x-2">
        <div className="min-w-12">
          <img
            src={
              item?.otherUser.profilePicture ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            className="w-full h-[50px] object-contain rounded-full "
          />
        </div>
        <div className="flex-col grow">
          <p className="font-semibold capitalize">
            {item?.otherUser.firstName} {item?.otherUser.lastName}{" "}
            {/* {item?.otherUser.userType === "AGENT" && (
              <span className="font-normal text-sm text-[#1B85A6]">Agent</span>
            )} */}
          </p>

          <p className="line-clamp-1">{item?.lastMessage}</p>
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
