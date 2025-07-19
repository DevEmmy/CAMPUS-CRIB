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
import TitleHead from "../Ui/TitleHead";
import { User as UserIcon, Message, Calendar, Heart, Location, Send } from "iconsax-react";

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

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-gray-50">
        <TitleHead title="Roommate Request" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 font-medium">Loading roommate request...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-dvh bg-gray-50">
        <TitleHead title="Roommate Request" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon size={24} className="text-red-500" />
            </div>
            <p className="text-gray-600 font-medium">Error loading roommate request</p>
            <p className="text-sm text-gray-500">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="min-h-dvh bg-gray-50">
        <TitleHead title="Roommate Request" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">Roommate request not found</p>
            <p className="text-sm text-gray-500">The request may have been removed</p>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-dvh bg-gray-50">
      <TitleHead title="Roommate Request" />
      
      <section className=" pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Request Card */}
          <div className=" overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={
                      request.picture || 
                      getUserAvatar(request.userId) ||
                      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    alt={request.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-xl font-bold text-dark mb-1">
                        {request.name}
                      </h1>
                      <p className="text-sm text-gray-600 mb-2">
                        {request.department} • {request.level}L
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.sex === "Male"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    }`}>
                      {request.sex}
                    </div>
                  </div>
                  
                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <UserIcon size={14} />
                      <span>{request.religion}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar size={14} />
                      <span>{request.level}L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              {/* Hobbies */}
              {request.hobbies && request.hobbies.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-dark mb-2 flex items-center gap-2">
                    <Heart size={16} className="text-primary" />
                    Hobbies & Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {request.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Hostel Info */}
              {request.hostelId && typeof request.hostelId === "object" && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-dark mb-3 flex items-center gap-2">
                    <Location size={16} className="text-primary" />
                    Preferred Hostel
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Location size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700">{request.hostelId.hostelName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Location size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700">{request.hostelId.location}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-primary">₦{request.hostelId.price?.toLocaleString()}</span>
                      <span className="text-gray-500"> per month</span>
                    </div>
                    
                    {/* Hostel Images */}
                    {request.hostelId && typeof request.hostelId === "object" && request.hostelId.images && request.hostelId.images.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-medium text-gray-600 mb-2">Hostel Images</h4>
                        <div className="space-y-2">
                          {request.hostelId.images.slice(0, 2).map((image, index) => (
                            <div key={index} className="relative group cursor-pointer">
                              <img
                                src={image}
                                alt={`${(request.hostelId as any).hostelName} image ${index + 1}`}
                                className="w-full h-48 object-cover rounded-xl border border-gray-200 group-hover:opacity-90 transition-opacity"
                                onClick={() => navigate(`/hostels/${(request.hostelId as any)._id}`)}
                              />
                              {/* @ts-ignore */}
                              {index === 1 && request.hostelId.images.length > 2 && (
                                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                                  <span className="text-white text-sm font-medium">
                                    +{(request.hostelId as any).images.length - 2} more
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {request.hostelId.images.length > 2 && (
                          <button
                            onClick={() => navigate(`/hostels/${(request.hostelId as any)._id}`)}
                            className="text-xs text-primary font-medium mt-2 hover:underline"
                          >
                            View all {request.hostelId.images.length} images
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 bg-gray-50">
              <Link
                to={`/chat/new?user=${
                  typeof request.userId === "string"
                    ? request.userId
                    : request.userId._id
                }`}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl font-semibold transition-all w-full"
              >
                <Message size={18} />
                Send Message
              </Link>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-dark mb-6 flex items-center gap-2">
              <Message size={20} className="text-primary" />
              Comments ({request.comments.length})
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-gray-600">ME</span>
                </div>
                <div className="flex-1 space-y-3">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[80px] resize-none"
                    disabled={addCommentMutation.isPending}
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!comment.trim() || addCommentMutation.isPending}
                    >
                      {addCommentMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Posting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Post Comment</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {request.comments.length > 0 ? (
                request.comments.map((comment) => {
                  const user = getUserInfo(comment.userId);
                  const userAvatar = getUserAvatar(comment.userId);
                  const userName = getUserName(comment.userId);

                  return (
                    <div key={comment._id} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        {userAvatar ? (
                          <img
                            src={userAvatar}
                            alt={userName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center text-sm font-medium text-gray-600">
                            {userName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-dark">{userName}</span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
                        <div className="flex justify-end">
                          <Link
                            to={`/chat/${user._id}`}
                            className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                          >
                            <Message size={12} />
                            Send DM
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Message size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">No comments yet</p>
                  <p className="text-sm text-gray-400">Be the first to comment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoommateRequestDetails;
