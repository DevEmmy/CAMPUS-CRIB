import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUserStore } from "../store/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../lib/fetchUser";
import { User } from "../types/user";
import { useNavigate } from "react-router";

interface UserContextType {
  userType: "AGENT" | "BASIC" | null;
  setUserType: (type: "AGENT" | "BASIC" | null) => void;
  loading: boolean;
  fetchedUser: User;
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
  const navigate = useNavigate()
  const [userType, setUserType] = useState<"AGENT" | "BASIC" | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");

    // Check if the route is `/login` and the user is already logged in
    if (location.pathname === "/login" && isLoggedIn) {
      navigate("/"); // Redirect to base URL if the user is already logged in
    }

    // Check if the route is base URL `/` and the user is not logged in
    if (location.pathname === "/" && !isLoggedIn) {
      navigate("/login"); // Redirect to login if the user is not logged in
    }
  }, [location.pathname, navigate]);

  return (
    <UserContext.Provider value={{ userType, setUserType, loading, fetchedUser }}>
      {children}
    </UserContext.Provider>
  );
};
