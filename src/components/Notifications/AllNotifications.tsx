import React, { useEffect } from "react";
import EmptyNotifications from "../Reuseables/EmptyNotifications";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../lib/getNotifications";
// import { useUserContext } from "../../contexts/UserContext";
import Loader from "../Ui/Loader";
import NotificationCard from "./NotificationCard";

const AllNotifications: React.FC = () => {
//  const {fetchedUser: user} = useUserContext()

const { data: notifications, isLoading } = useQuery({
  queryKey: ["notifications"],
  queryFn: getAllNotifications,
});

useEffect(() => {
  if (notifications) {
    console.log(notifications.data);
  }
}, [notifications]);

if (isLoading)
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader />
    </div>
  );

if (!notifications?.data.data.length) return <EmptyNotifications />;

  return (
    <div className="h-full w-full">
     {notifications?.data.data.map((notification: any) => (
      <NotificationCard key={notification.id} notification={notification} />
     ))}
    </div>
  );
};

export default AllNotifications;
