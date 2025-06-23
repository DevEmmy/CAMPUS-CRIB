// components/RoommateRequestDetails.tsx
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  useAddComment,
  useRoommateRequest,
} from "../../utils/roommateRequestApi";
import { Link, useNavigate, useParams } from "react-router";
import Loader from "../Ui/Loader";
import { RoommateRequest, User } from "../../types/roommate";
import { VscChevronLeft } from "react-icons/vsc";

const RoommateRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: response, isLoading, error } = useRoommateRequest(id || "");
  const [comment, setComment] = useState("");
  const addCommentMutation = useAddComment();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !comment.trim()) return;

    try {
      await addCommentMutation.mutateAsync({ id, data: { content: comment } });
      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="p-4 text-red-500">Error loading roommate request</div>
    );
  if (!response) return <div className="p-4">Roommate request not found</div>;

  const request: RoommateRequest = response;

  // Helper function to get user info
  const getUserInfo = (user: User | string): User => {
    if (typeof user === "string") {
      return {
        _id: user,
        firstName: "Unknown",
        lastName: "User",
        email: "",
        userType: "BASIC",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    return user;
  };

  // Helper function to get user display name
  const getUserName = (user: User | string): string => {
    const userInfo = getUserInfo(user);
    return `${userInfo.firstName} ${userInfo.lastName}`;
  };

  // Helper function to get user profile picture
  const getUserAvatar = (user: User | string): string | undefined => {
    const userInfo = getUserInfo(user);
    return userInfo.profilePicture;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center p-4 bg-white border-b border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="text-primary border border-primary p-1 rounded-lg cursor-pointer"
        >
          <VscChevronLeft size={25} />
        </button>
        <h1 className="text-lg font-bold">Roommate Request</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Request Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={request.picture || getUserAvatar(request.userId)}
                  alt={request.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{request.name}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      request.sex === "Male"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    {request.sex}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {request.department}, {request.level}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2 text-sm">
              <div>
                <span className="font-medium">Religion:</span>{" "}
                {request.religion}
              </div>
              {request.hostelId && typeof request.hostelId === "object" && (
                <div>
                  <span className="font-medium">Hostel:</span>{" "}
                  {request.hostelId.hostelName}
                </div>
              )}
              <div>
                <span className="font-medium">Hobbies:</span>{" "}
                {request.hobbies.join(", ")}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-t border-gray-100">
            <Link
              to={`/chat/new?user=${
                typeof request.userId === "string"
                  ? request.userId
                  : request.userId._id
              }`}
              className="bg-primary text-white p-3 rounded-lg text-base font-semibold w-full text-center"
            >
              Send DM
            </Link>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Comments ({request.comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="flex gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-gray-600">ME</span>
            </div>
            <div className="flex-1 flex gap-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2.5 border border-gray-300 rounded-md text-sm min-h-[60px] resize-none"
                disabled={addCommentMutation.isPending}
              />
              <button
                type="submit"
                className="bg-primary text-white p-5 rounded-md flex items-center justify-center"
                disabled={!comment.trim() || addCommentMutation.isPending}
              >
                {addCommentMutation.isPending ? (
                  <Loader />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                )}
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {request.comments.map((comment) => {
              const user = getUserInfo(comment.userId);
              const userAvatar = getUserAvatar(comment.userId);
              const userName = getUserName(comment.userId);

              return (
                <div key={comment._id} className="flex gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt={userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-xs">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 bg-white p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{userName}</span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                    <div className="mt-2 flex justify-end">
                      <Link
                        to={`/chat/${user._id}`}
                        className="bg-primary text-white text-xs p-2 font-medium rounded flex items-center gap-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Send DM
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoommateRequestDetails;
