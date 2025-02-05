import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUserStore } from "../store/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../lib/fetchUser";

interface UserContextType {
  userType: "AGENT" | "BASIC" | null;
  setUserType: (type: "AGENT" | "BASIC" | null) => void;
  loading: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userType, setUserType] = useState<"AGENT" | "BASIC" | null>(null);
  const [loading, setLoading] = useState(true); // Loading state to wait for data

  const { setUserData } = useUserStore();

  const { data: fetchedUser } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    const storedUserType = localStorage.getItem("accountType") as "AGENT" | "BASIC" | null;
    
    if (storedUserType) {
      setUserType(storedUserType);
      setLoading(false); // Set loading to false once we have the value from localStorage
    } else if (fetchedUser) {
      setUserType(fetchedUser.userType);
      localStorage.setItem("accountType", fetchedUser.userType); // Set the accountType in localStorage
      setUserData(fetchedUser);
      setLoading(false); // Set loading to false once data is fetched
    } else {
      setLoading(false); // Set loading to false if no user data is available
    }
  }, [fetchedUser]);

  return (
    <UserContext.Provider value={{ userType, setUserType, loading }}>
      {children}
    </UserContext.Provider>
  );
};
