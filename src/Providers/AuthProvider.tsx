import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchUser } from "../lib/fetchUser";
import { useNavigate } from "react-router";

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState<"AGENT" | "BASIC">("BASIC");
  const user = useQuery({ queryKey: ["todos"], queryFn: fetchUser });

  const checkUser = () => {
    if (user) {
      const accountType = localStorage.getItem("accountType");
      if (accountType) {
        setAccountType(accountType as "AGENT" | "BASIC");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, [user]);
  return <>{children}</>;
};

export default AuthProvider;
