/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { LuPhone } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { MdSend } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { ArrowLeft, Send, Add, Message } from "iconsax-react";
import { fetchMessages } from "../lib/fetchMessages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { messaging } from "../utils/messageRequest";
import { convertToNormalTime } from "../utils/ConvertToNormalTime";
import { useUserStore } from "../store/UseUserStore";
import { fetchUserById } from "../lib/fetchUser";

const Chat = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [otherUser, setOtherUser] = useState<any | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const { user } = useUserStore();

  const [messagesList, setMessagesList] = useState<any | null>(null);

  const { data: recipientDetails } = useQuery({
    queryKey: ["recipientDetails", `recipient ${userId}`],
    queryFn: () => fetchUserById(userId),
  });

  useEffect(() => {
    console.log("recipient details", recipientDetails?.user);
    setOtherUser(recipientDetails?.user);
  }, [recipientDetails]);

  const [content, setContent] = useState("");
  const [isTexted, setIsTexted] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // Fetch messages
  const {
    data: fetchedMessages = [],
    isError,
    isLoading,
    isFetchedAfterMount,
  } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => fetchMessages(userId as string),
    enabled: !!userId,
    refetchInterval: 5000, // Poll for new messages every 5 seconds
  });

  // Set isTexted to true if we have messages
  useEffect(() => {
    console.log(fetchedMessages);

    if (Array.isArray(fetchedMessages) && fetchedMessages.length > 0) {
      setIsTexted(true);
      console.log(fetchedMessages);
    }

    console.log(isTexted);

    if (isFetchedAfterMount) {
      const messages = fetchedMessages.messages;
      console.log("all messages", messages);
      console.log("first other user", messages[messages?.length - 1]);
      if (fetchedMessages?.otherUser) setOtherUser(fetchedMessages.otherUser);
    }

    setMessagesList(fetchedMessages?.messages);

    // Scroll to the last message
    lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
  }, [fetchedMessages, isLoading, isFetchedAfterMount]);

  // Setup mutation for sending messages
  const mutation = useMutation({
    mutationFn: (messageData: { recipient: string; message: string }) =>
      messaging(messageData),
    onSuccess: () => {
      // Invalidate and refetch messages after sending
      queryClient.invalidateQueries({ queryKey: ["messages", userId] });
    },
  });

  // Handle sending a message
  const sendMessage = () => {
    if (content.trim() === "") {
      return;
    }

    const newMessage = {
      _id: Date.now().toString(), // temporary unique ID
      sender: user?._id,
      recipient: otherUser?._id || userId,
      message: `${content}`,
      conversationId: userId,
      timestamp: new Date().toISOString(),
      __v: 0,
    };

    setMessagesList((prev: any) => [...prev, newMessage]);

    const messageData = {
      recipient: otherUser?._id || userId,
      message: content,
    };

    // Send the message
    mutation.mutate(messageData);

    // Clear the input field
    setContent("");

    // Ensure the chat header shows
    setIsTexted(true);
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    console.log("Other user data", otherUser);
  }, [otherUser]);

  return (
    <main className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <img
                src={
                  otherUser?.profilePicture ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900">
                {otherUser?.firstName} {otherUser?.lastName}
              </h2>
              <p className="text-sm text-gray-500">
                {isTexted ? "Active now" : "Start a conversation"}
              </p>
            </div>
          </div>

          {/* <button className="flex items-center justify-center w-8 h-8">
            <LuPhone size={18} className="text-gray-900" />
          </button> */}
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto px-4 py-6 min-h-[calc(100vh-10rem)]">
        {isError && (
          <div className="flex justify-center items-center py-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Message size={24} className="text-red-500" />
              </div>
              <p className="text-sm text-red-500">Error loading messages</p>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-gray-500">Loading messages...</p>
            </div>
          </div>
        ) : messagesList?.length > 0 ? (
          <div className="space-y-3">
            {messagesList?.map((message: any, i: number) => {
              const isOwnMessage = message?.sender !== otherUser?._id;
              
              return (
                <div
                  key={i}
                  className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                  ref={
                    i === fetchedMessages?.messages.length - 1
                      ? lastMessageRef
                      : null
                  }
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      isOwnMessage
                        ? "bg-primary text-white"
                        : "bg-white text-gray-900 shadow-sm border border-gray-100"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message?.message}</p>
                    <div className={`flex items-center justify-end gap-1 mt-2 ${
                      isOwnMessage ? "text-white/70" : "text-gray-400"
                    }`}>
                      <span className="text-xs">
                        {convertToNormalTime(message.timestamp)}
                      </span>
                      {isOwnMessage && (
                        <span className="text-xs">• read</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4 max-w-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Message size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Start a conversation
              </h3>
              <p className="text-sm text-gray-500">
                Send a message to {otherUser?.firstName} to begin chatting.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
            <Add size={20} className="text-gray-600" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200"
              placeholder="Type a message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!content.trim()}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
              content.trim()
                ? "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Chat;
