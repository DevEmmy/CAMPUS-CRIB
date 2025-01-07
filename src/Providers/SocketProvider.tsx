import React, { createContext, useState, useEffect, useRef, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  isConnected?: boolean
}

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);
const SOCKET_SERVER_URL = "https://campus-crib-backend.onrender.com";

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.current = io(SOCKET_SERVER_URL);

    socket.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to the server');
    });

    socket.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from the server');
    });

    if (socket.current) {
      // console.log(socket.connected)
      socket.current.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
