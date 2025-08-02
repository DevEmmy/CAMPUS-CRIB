import { convertToNormalTime } from "../../utils/ConvertToNormalTime";

const ChatComponent = ({ item }: any) => {
  return (
    <div className="border-b py-4 flex justify-between items-center">
      <div className="flex grow items-center gap-x-2">
        <div className="w-[50px] h-[50px] bg-gray-300 rounded-full object-cover">
          <img
            src={
              item?.otherUser?.profilePicture ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            className="w-full h-full object-cover rounded-full "
          />
        </div>
        <div className="flex-col grow">
          <p className="font-semibold capitalize">
            {item?.otherUser?.firstName} {item?.otherUser?.lastName}{" "}
        
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
