// import React, { createContext, useState, useEffect, useRef, ReactNode } from "react";
// import { io, Socket } from "socket.io-client";
// import Toast from "../components/Reuseables/Toast";
// import useToastNotifications from "../hooks/useToastNotifications";

// interface ISocketContext {
//   socket: Socket | null;
//   isConnected: boolean;
// }

// interface SocketProviderProps {
//   children: ReactNode;
// }

// const SocketContext = createContext<ISocketContext | undefined>(undefined);
// const SOCKET_SERVER_URL = "ws://campus-crib-backend.onrender.com";

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
//   const socket = useRef<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState<boolean>(false);
//   const { toast, showToast } = useToastNotifications();

//   const response = localStorage.getItem('user');
//   const userId = response ? JSON.parse(response)._id : null;

//   useEffect(() => {
//     if (!userId) {
//       // showToast("warning", "User Not Logged In", "Please log in to receive notifications.");
//       return;
//     }

//     // Initialize socket connection only if userId exists
//     socket.current = io(SOCKET_SERVER_URL);

   
//     socket.current.on('connect', () => {
//       setIsConnected(true);
//       console.log('Connected to the server');  
//       socket.current?.emit('init', { userId });
//     });

//     socket.current.on('disconnect', () => {
//       setIsConnected(false);
//       console.log('Disconnected from the server');
//     });

//     socket.current.on('connect_error', (error) => {
//       console.error('Connection error:', error);
//       setIsConnected(false);
//       // showToast("error", "Connection Error", "Unable to connect to the server.");
//     });

//     // Listen for notification events and chat messages
//     const handleNotification = (notification: any) => {
//       console.log('New notification:', notification);
//       showToast("info", "New Notification", notification.message || "No message");
//     };

//     const handleChatMessage = (messageData: any) => {
//       console.log('New chat message:', messageData);
//       showToast("info", "New Message", messageData.content || "No content");
//     };

//     // Attach event listeners for notifications and messages
//     socket.current.on('notification', handleNotification);
//     socket.current.on('chatMessage', handleChatMessage);

//     // Cleanup on component unmount
//     return () => {
//       if (socket.current) {
//         socket.current.off('notification', handleNotification);
//         socket.current.off('chatMessage', handleChatMessage);
//       }
//     };
//   }, [userId]);

//   return (
//     <SocketContext.Provider value={{ socket: socket.current, isConnected }}>
//       {toast && (
//         <div className="absolute top-0 flex items-center justify-center w-full z-[99999]">
//           <Toast
//             type={toast.type}
//             message={toast.message}
//             description={toast.description}
//           />
//         </div>
//       )}
//       {children}
//     </SocketContext.Provider>
//   );
// };
