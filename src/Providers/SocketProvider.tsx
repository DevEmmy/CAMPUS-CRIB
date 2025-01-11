import React, { createContext, useState, useEffect, useRef, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import Toast from "../components/Reuseables/Toast";
import useToastNotifications from "../hooks/useToastNotifications";

interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
}

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);
const SOCKET_SERVER_URL = "https://campus-crib-backend.onrender.com";
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { toast, showToast } = useToastNotifications();
  const response = JSON.parse(localStorage.getItem('user') as string)
  const userId = response?._id;

  useEffect(() => {
    socket.current = io(SOCKET_SERVER_URL);

    socket.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to the server');
      
      // Emit 'init' event after establishing connection
      if (socket.current && userId) {
        socket.current.emit('init', { userId });
      }
    });

    socket.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from the server');
    });

    // Listen for notification events
    socket.current.on('notification', (notification) => {
      console.log('New notification:', notification);
      const showNotificationTimeout = setTimeout(() => {
        setShowNotifications(true);
        // set the notification title and message later
        showToast("info", "New Notification", "Notification message");
      }, 1000);

      const hideNotificationTimeout = setTimeout(() => {
        setShowNotifications(false);
      }, 5000);

      return () => {
        clearTimeout(showNotificationTimeout);
        clearTimeout(hideNotificationTimeout);
      };
    });

    // Listen for chat messages
    socket.current.on('chatMessage', (messageData) => {
      console.log('New chat message:', messageData);
      const showNotificationTimeout = setTimeout(() => {
        setShowNotifications(true);
        // Set the details later
        showToast("info", "New Message", "Message");
      }, 1000);

      const hideNotificationTimeout = setTimeout(() => {
        setShowNotifications(false);
      }, 5000);

      return () => {
        clearTimeout(showNotificationTimeout);
        clearTimeout(hideNotificationTimeout);
      };
    });

    // Clean up listeners on unmount
    return () => {
      if (socket.current) {
        socket.current.off('notification');
        socket.current.off('chatMessage');
      }
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket: socket.current, isConnected }}>
      {showNotifications && toast && (
        <div className="absolute top-0 flex items-center justify-center w-full z-50">
          <Toast
            type={toast.type}
            message={toast.message}
            description={toast.description}
          />
        </div>
      )}
      {children}
    </SocketContext.Provider>
  );
};
