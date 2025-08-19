import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Profile, Shop, ArrowRight2 } from "iconsax-react";
import { fetchUser } from "../../lib/fetchUser";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store/UseUserStore";

const AccountType: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserStore();

  const [accountType, setAccountType] = useState<"AGENT" | "BASIC">();
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  useEffect(() => {
    if (user) {
      setUserData(user);
      setAccountType(user.userType);
      return;
    }
    return;
  }, []);

  useEffect(() => {
    if (user && accountType === "AGENT") {
      navigate("/agent");
    } else if (user && accountType === "BASIC") {
      navigate("/student");
    }
    return;
  }, [user]);

  const handleChoice = (choice: string) => {
    localStorage.setItem("accountType", choice);
  };

  return (
    <main className="min-h-dvh w-full bg-white dark:bg-gray-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-dark dark:text-white mb-3">
            Choose Your Account Type
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Select how you'd like to use Campus Crib
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Student Option */}
          <Link
            onClick={() => handleChoice("BASIC")}
            to={"/student/onboarding"}
            className="block"
          >
            <div className="group border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 hover:border-primary hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-200">
                  <Profile
                    size={24}
                    className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors duration-200"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-dark dark:text-white group-hover:text-primary transition-colors duration-200">
                    Student
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Find accommodation and connect with roommates
                  </p>
                </div>
                <div className="text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors duration-200">
                  <ArrowRight2 size={20} />
                </div>
              </div>
            </div>
          </Link>

          {/* Agent Option */}
          <Link
            onClick={() => handleChoice("AGENT")}
            to={"/agent/onboarding"}
            className="block"
          >
            <div className="group border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 hover:border-primary hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors duration-200">
                  <Shop
                    size={24}
                    className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors duration-200"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-dark dark:text-white group-hover:text-primary transition-colors duration-200">
                    Agent
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    List properties and manage bookings
                  </p>
                </div>
                <div className="text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors duration-200">
                  <ArrowRight2 size={20} />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            You can change this later in your settings
          </p>
        </div>
      </div>
    </main>
  );
};

export default AccountType;
