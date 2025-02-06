import React, { useEffect } from "react";
import EmptyNotifications from "../Reuseables/EmptyNotifications";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../lib/getNotifications";
import { useUserContext } from "../../contexts/UserContext";
import Loader from "../Ui/Loader";

const AllNotifications: React.FC = () => {
 const {fetchedUser: user} = useUserContext()

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(user?._id),
  });

  useEffect(() => {
    if (notifications) {
      console.log(notifications);
    }
  }, []);

  if(isLoading) <div className="h-screen w-full flex items-center justify-center"><Loader/></div>

  return (
    <div className="h-full w-full">
      {/* Fetch notification from the backend and display them */}
      <EmptyNotifications />
    </div>
  );
};

export default AllNotifications;
