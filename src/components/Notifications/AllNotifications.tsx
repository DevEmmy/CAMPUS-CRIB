import React, { useEffect } from "react";
import EmptyNotifications from "../Reuseables/EmptyNotifications";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../lib/fetchUser";
import { getAllNotifications } from "../../lib/getNotifications";

const AllNotifications: React.FC = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(user?._id),
  });

  useEffect(() => {
    if (notifications) {
      console.log(notifications);
    }
  }, []);

  return (
    <div className="h-full w-full">
      {/* Fetch notification from the backend and display them */}
      <EmptyNotifications />
    </div>
  );
};

export default AllNotifications;
