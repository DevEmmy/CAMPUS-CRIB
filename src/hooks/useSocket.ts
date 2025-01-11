import { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';


interface ISocketContext {
    socket: Socket | null; 
    isConnected: boolean; 
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocket = (): ISocketContext => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
