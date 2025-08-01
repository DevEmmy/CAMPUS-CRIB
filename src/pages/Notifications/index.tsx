import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../lib/getNotifications";
import { ArrowLeft, Notification, Check, Trash } from "iconsax-react";
import { useNavigate } from "react-router";
import { errorToast, successToast } from "oasis-toast";

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: notifications, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    }
  };

  const getNotificationIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case "bidding":
      case "result":
        return <Notification size={18} className="text-amber-600" />;
      case "listing":
      case "new":
        return <Notification size={18} className="text-blue-600" />;
      case "payment":
      case "transaction":
        return <Notification size={18} className="text-emerald-600" />;
      case "booking":
      case "reservation":
        return <Notification size={18} className="text-violet-600" />;
      default:
        return <Notification size={18} className="text-primary" />;
    }
  };

  const handleMarkAsRead = async () => {
    try {
      // TODO: Implement mark as read API call
      successToast("Marked as read", "");
      refetch();
    } catch (error) {
      errorToast("Failed to mark as read", "Please try again");
    }
  };

  const handleDeleteNotification = async () => {
    try {
      // TODO: Implement delete notification API call
      successToast("Notification deleted", "");
      refetch();
    } catch (error) {
      errorToast("Failed to delete notification", "Please try again");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-dvh bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            
            <h1 className="text-lg font-semibold text-dark">Notifications</h1>
            
            <div className="w-8"></div>
          </div>
        </div>

        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600">Loading notifications...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <h1 className="text-lg font-semibold text-dark">Notifications</h1>
          
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-4">
        {!notifications?.data.data.length ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Notification size={40} className="text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-dark mb-3">
              All caught up!
            </h2>
            
            <p className="text-gray-600 mb-8 max-w-md">
              You're up to date with all your notifications. New updates will appear here when they arrive.
            </p>
          </div>
        ) : (
          /* Notifications List */
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark">
                Recent Notifications
              </h2>
              <span className="text-sm text-gray-500">
                {notifications.data.data.length} {notifications.data.data.length === 1 ? 'notification' : 'notifications'}
              </span>
            </div>

            {notifications.data.data.map((notification: any) => (
              <div
                key={notification._id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark text-sm mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {formatDate(notification.createdAt)}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMarkAsRead()}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteNotification()}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete notification"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default NotificationsPage;
