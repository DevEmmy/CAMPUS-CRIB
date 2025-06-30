import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types/user'

interface UserStore {
    user: User | null;
    setUser: <K extends keyof User>(key: K, value: User[K]) => void;
    setUserData: (userData: User | null) => void;
    clearUser: () => void; 
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, _get) => ({
            user: null,
            setUser: (key, value) =>
                set((state) => ({
                    user: state.user
                        ? {
                              ...state.user,
                              [key]: value,
                          }
                        : null,
                })),
            setUserData: (userData) => set({ user: userData }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({ user: state.user }),
        }
    )
);
