import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUserStore } from "../store/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../lib/fetchUser";
import { User } from "../types/user";
import { useNavigate, useLocation } from "react-router";

interface UserContextType {
  userType: "AGENT" | "BASIC" | null;
  setUserType: (type: "AGENT" | "BASIC" | null) => void;
  loading: boolean;
  fetchedUser?: User;
  loggedUser: User | null;
  setLoggedUser: (user: User | null) => void;
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
  const navigate = useNavigate();
  const location = useLocation();
  
  const [userType, setUserType] = useState<"AGENT" | "BASIC" | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const { setUserData } = useUserStore();

  const { data: fetchedUser } = useQuery<User>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    const storedUserType = localStorage.getItem("accountType") as "AGENT" | "BASIC" | null;

    if (storedUserType) {
      setUserType(storedUserType);
    } else if (fetchedUser) {
      setUserType(fetchedUser.userType);
      localStorage.setItem("accountType", fetchedUser.userType);
      setUserData(fetchedUser);

      if(loggedUser == null) {
        setLoggedUser(fetchedUser);
      }
    }

    setLoading(false);
  }, [fetchedUser, setUserData]);

  useEffect(() => {
    const accountType = localStorage.getItem("accountType");
    
    // Only redirect to account-type if we're on home page and missing account type
    if (location.pathname === "/" && !accountType) {
      navigate("/account-type", { replace: true });
    }
  }, [location.pathname, navigate]);
  
  
  return (
    <UserContext.Provider
      value={{ userType, setUserType, loading, fetchedUser, loggedUser, setLoggedUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
