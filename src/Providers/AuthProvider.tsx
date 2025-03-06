import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchUser } from '../lib/fetchUser';


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState<"AGENT" | "BASIC">("BASIC");
  const { data: user } = useQuery({ queryKey: ["todos"], queryFn: fetchUser });

  const checkUser = () => {
    if (user) {
      console.log(accountType)
      const account = localStorage.getItem("accountType");
      if (account) {
        setAccountType(account as "AGENT" | "BASIC");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, [user]);

  return <>{children}</>;
};

export default AuthProvider;