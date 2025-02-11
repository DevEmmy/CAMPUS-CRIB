import { infoToast } from "oasis-toast";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
// import useVendorStore from '../store/vendorStore';

interface SocketContextProps {
  socket: Socket | null;
  // sendMessage: (data: any) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

const SOCKET_URL = "https://campus-crib-backend.onrender.com";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    setSocket(socketInstance);
    console.log(socketInstance);

    // return () => {
    //   socketInstance.disconnect();
    // };
  }, []);

  useEffect(() => {
    // Listen for notification events and chat messages
    const handleNotification = (notification: any) => {
      console.log("New notification:", notification);
      infoToast("New Notification", notification.message || "No message");
    };

    const handleChatMessage = (messageData: any) => {
      console.log("New chat message:", messageData);
      infoToast("New Message", messageData.content || "No content");
    };

    //     // Attach event listeners for notifications and messages
    if (socket) {
      socket.on("notification", handleNotification);
      socket.on("chatMessage", handleChatMessage);
    }
    return () => {
              if (socket) {
                socket.off('notification', handleNotification);
                socket.off('chatMessage', handleChatMessage);
              }
            };
  }, [socket]);

  // const register = (userId: string) => {
  //   if (socket) {
  //     console.log(socket);
  //     socket.emit("register", userId);
  //   }
  // };

  // const sendMessage = (data: any) => {
  //   if (socket) {
  //     socket.emit("user_provider", data);
  //   }
  // };

  //   const {vendor} = useVendorStore();

  //   useEffect(()=>{
  //     if(vendor){
  //         register(vendor._id)
  //     }

  //   }, [vendor])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
