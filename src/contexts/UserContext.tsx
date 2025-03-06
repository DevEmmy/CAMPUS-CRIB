import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"AGENT" | "BASIC" | null>(null);
  const [loading, setLoading] = useState(true);

  const { setUserData } = useUserStore();

  const { data: fetchedUser } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    const storedUserType = localStorage.getItem("accountType") as
      | "AGENT"
      | "BASIC"
      | null;

    if (storedUserType) {
      setUserType(storedUserType);
      setLoading(false); 
    } else if (fetchedUser) {
      setUserType(fetchedUser.userType);
      localStorage.setItem("accountType", fetchedUser.userType); 
      setUserData(fetchedUser);
      setLoading(false); 
    } else {
      setLoading(false);
    }
  }, [fetchedUser]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    const accountType = localStorage.getItem("accountType");
    const publicRoutes = ["/login", "/signup", "/"];
  
    if (!isLoggedIn && !accountType && publicRoutes.includes(location.pathname)) {
      navigate("/account-type", { replace: true });
      // If user is not logged in, allow access only to login and signup pages
      // if (!publicRoutes.includes(location.pathname)) {
      //   navigate("/account-type", { replace: true });
      // }
    } else {
      // If accountType is missing and user is on login, signup, or home, redirect to /account-type
      if (!accountType && publicRoutes.includes(location.pathname)) {
        navigate("/account-type", { replace: true });
      }
    }
  }, [location.pathname, navigate]);
  
  
  return (
    <UserContext.Provider
      value={{ userType, setUserType, loading, fetchedUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
