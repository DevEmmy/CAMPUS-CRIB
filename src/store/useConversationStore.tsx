import { create } from 'zustand';

// Types
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string;
    bookmarkedHostels: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ConversationType {
    _id: string;
    participants: string[];
    lastMessage: string;
    lastMessageAt: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    otherUser: User;
}

interface ConversationStore {
    storedConversations: ConversationType[];
    setStoredConversations: (convos: ConversationType[]) => void;
    updateConversation: (id: string, data: Partial<ConversationType>) => void;
    clearConversations: () => void;
}

// Store
export const useConversationStore = create<ConversationStore>((set) => ({
    storedConversations: [],
    setStoredConversations: (convos) => set({ storedConversations: convos }),
    updateConversation: (id, data) =>
        set((state) => ({
            storedConversations: state.storedConversations.map((conv) =>
                conv._id === id ? { ...conv, ...data } : conv
            ),
        })),
    clearConversations: () => set({ storedConversations: [] }),
}));
