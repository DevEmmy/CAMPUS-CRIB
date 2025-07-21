import React, { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Account type loaded
  }, []);

  return <>{children}</>;
};

export default AuthProvider;