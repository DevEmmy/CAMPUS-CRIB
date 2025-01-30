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
      const account = localStorage.getItem("accountType");
      if (account) {
        console.log(accountType)
        setAccountType(account as "AGENT" | "BASIC");
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
