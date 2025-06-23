import React from "react";
import { Link, useNavigate } from "react-router";
import { useRoommateRequests } from "../../utils/roommateRequestApi";
import Loader from "../../components/Ui/Loader";
import { VscChevronLeft } from "react-icons/vsc";
import { RoommateRequest } from "../../types/roommate";

const FindRoommate: React.FC = () => {
  const navigate = useNavigate();
  const { data: roommateRequests, isLoading, error } = useRoommateRequests();

 

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (!isLoading && error) return <div>Error loading roommate requests</div>;
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-5 p-4 bg-white border-b border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="text-primary border border-primary p-1 rounded-lg cursor-pointer"
        >
          <VscChevronLeft size={25} />
        </button>
        <h1 className="text-lg font-semibold flex-1">Find Your Roommate</h1>
        <Link
          to="/find-roommate/create"
          className="flex items-center gap-1 text-primary font-medium text-sm border border-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors"
        >
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Create
        </Link>
      </header>

      {/* Roommate Requests Feed */}
     <main className="flex-1 p-4 space-y-4">
        {roommateRequests?.map((request: RoommateRequest) => {
          // Extract user information
          const user = typeof request.userId === 'object' ? request.userId : null;
          const userId = user?._id || request.userId as string;
          const userProfilePic = user?.profilePicture;

          // Extract hostel information
          const hostel = typeof request.hostelId === 'object' ? request.hostelId : null;
          // const hostelId = hostel?._id || request.hostelId as string;

          return (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow overflow-hidden p-2 my-3"
            >
              <div className="p-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={request.picture || userProfilePic || "https://via.placeholder.com/150"}
                      alt={request.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{request.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
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
                  <div className="col-span-2">
                    <span className="font-medium">Hobbies:</span>{" "}
                    {request.hobbies.join(", ")}
                  </div>
                  {hostel && (
                    <>
                      <div>
                        <span className="font-medium">Hostel:</span> {hostel.hostelName}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {hostel.location}
                      </div>
                      <div>
                        <span className="font-medium">Price:</span> ₦{hostel.price.toLocaleString()}
                      </div>
                      {hostel.images?.length > 0 && (
                        <div className="mt-2">
                          <img
                            onClick={() => navigate(`/hostels/${hostel._id}`)}
                            src={hostel.images[0]}
                            alt={hostel.hostelName}
                            className="w-full h-40 object-cover rounded-lg cursor-pointer"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-t border-gray-100">
                <Link
                  to={`/find-roommate/${request._id}`}
                  className="flex items-center gap-1 text-gray-500 text-sm"
                >
                  {request.comments.length} Comments
                </Link>
                <Link
                  to={`/chat/${userId}`}
                  className="bg-primary text-white px-5 font-semibold py-2 rounded text-sm"
                >
                  Send DM
                </Link>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default FindRoommate;