import {create} from 'zustand'
import { User } from '../types/user'

interface UserStore {
    user: User | null;
    setUser: <K extends keyof User>(key: K, value: User[K]) => void;
    setUserData: (userData: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (key, value) =>
      set((state) => ({
        user: {
          ...state.user,
          [key]: value,
        } as User,
      })),
    setUserData: (userData) => set({ user: userData }),
}))