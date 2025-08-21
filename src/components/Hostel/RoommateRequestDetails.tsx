import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  useAddComment,
  useRoommateRequest,
} from "../../utils/roommateRequestApi";
import { Link, useParams } from "react-router";
import { RoommateRequest, User } from "../../types/roommate";
import TitleHead from "../Ui/TitleHead";
import {
  User as UserIcon,
  Message,
  Calendar,
  Location,
  Send,
} from "iconsax-react";
import { formatPrice } from "../../utils/formatPrice";
import ImageModal from "../Ui/ImageModal";

const FALLBACK_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

const RoommateRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: response, isLoading, error } = useRoommateRequest(id || "");
  const [comment, setComment] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const addCommentMutation = useAddComment();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !comment.trim()) return;

    try {
      await addCommentMutation.mutateAsync({
        id,
        data: { content: comment },
      });
      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  // --- Loading, error, not found states ---
  if (isLoading) {
    return (
      <div className="min-h-dvh bg-gray-50 dark:bg-gray-900">
        <TitleHead title="Roommate Request" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Loading roommate request...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-dvh bg-gray-50 dark:bg-gray-900">
        <TitleHead title="Roommate Request" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon size={24} className="text-red-500 dark:text-red-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Error loading roommate request
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please try again later
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="min-h-dvh bg-gray-50 dark:bg-gray-900">
        <TitleHead title="Roommate Request" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon size={24} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Roommate request not found
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The request may have been removed
            </p>
          </div>
        </div>
      </div>
    );
  }

  const request: RoommateRequest = response;

  // --- Helpers with null safety ---
  const getUserInfo = (user: User | string | null | undefined): User => {
    if (!user) {
      return {
        _id: "unknown",
        firstName: "Unknown",
        lastName: "User",
        email: "",
        userType: "BASIC",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    if (typeof user === "string") {
      return {
        _id: user || "unknown",
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

  const getUserName = (user: User | string | null | undefined): string => {
    const userInfo = getUserInfo(user);
    return `${userInfo.firstName || "Unknown"} ${userInfo.lastName || ""}`;
  };

  const getUserAvatar = (
    user: User | string | null | undefined
  ): string | undefined => {
    const userInfo = getUserInfo(user);
    return userInfo.profilePicture || undefined;
  };

  return (
    <div className="min-h-dvh bg-gray-50 dark:bg-gray-900">
      <TitleHead title="Roommate Request" />

      <section className="pb-20">
        <div className="max-w-2xl mx-auto space-y-6 p-2">
          {/* Request Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-gray-100 dark:border-gray-600 overflow-hidden flex-shrink-0">
                  <img
                    src={
                      request.picture ||
                      getUserAvatar(request.userId) ||
                      FALLBACK_AVATAR
                    }
                    alt={request.name || "User"}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        request.picture ||
                          getUserAvatar(request.userId) ||
                          FALLBACK_AVATAR
                      )
                    }
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-xl font-bold text-dark dark:text-white mb-1">
                        {request?.name || "Unnamed"}
                      </h1>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {request.department || "N/A"} • {request.level || "0"}L
                      </p>
                    </div>
                    {request.sex && (
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.sex === "Male"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400"
                        }`}
                      >
                        {request.sex}
                      </div>
                    )}
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-3 text-sm">
                    {request.religion && (
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        <UserIcon size={14} />
                        <span>{request.religion}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                      <Calendar size={14} />
                      <span>{request.level || "0"}L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hostel Info */}
            {request.hostelId &&
              typeof request.hostelId === "object" &&
              request.hostelId.hostelName && (
                <div className="p-6 space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-dark dark:text-white mb-3 flex items-center gap-2">
                      <Location size={16} className="text-primary" />
                      Preferred Hostel
                    </h3>
                    <div className="space-y-3">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {request.hostelId.hostelName}
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {request.hostelId.location}
                      </span>
                      {request.hostelId.price && (
                        <div className="text-sm">
                          <span className="font-medium text-primary">
                            {formatPrice(request.hostelId.price)}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {" "}
                            per month
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            {/* Actions */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900">
              <Link
                to={`/chat/new?user=${
                  request.userId && typeof request.userId !== "string"
                    ? request.userId._id || "unknown"
                    : request.userId || "unknown"
                }`}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl font-semibold transition-all w-full"
              >
                <Message size={18} />
                Send Message
              </Link>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-dark dark:text-white mb-6 flex items-center gap-2">
              <Message size={20} className="text-primary" />
              Comments ({request.comments?.length || 0})
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    ME
                  </span>
                </div>
                <div className="flex-1 space-y-3">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[80px] resize-none"
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
              {request.comments && request.comments.length > 0 ? (
                request.comments.map((comment) => {
                  const user = getUserInfo(comment.userId);
                  const userAvatar = getUserAvatar(comment.userId);
                  const userName = getUserName(comment.userId);

                  return (
                    <div key={comment._id || Math.random()} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-600">
                        {userAvatar ? (
                          <img
                            src={userAvatar}
                            alt={userName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                            {userName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-dark dark:text-white">
                            {userName}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {comment.createdAt
                              ? formatDistanceToNow(new Date(comment.createdAt), {
                                  addSuffix: true,
                                })
                              : "just now"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          {comment.content}
                        </p>
                        <div className="flex justify-end">
                          <Link
                            to={`/chat/${user._id || "unknown"}`}
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
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Message size={24} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">No comments yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Be the first to comment
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={selectedImage}
        imageAlt="Image"
      />
    </div>
  );
};

export default RoommateRequestDetails;
