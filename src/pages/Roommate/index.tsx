import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRoommateRequests } from "../../utils/roommateRequestApi";
import Loader from "../../components/Ui/Loader";
import { VscChevronLeft } from "react-icons/vsc";
import { RoommateRequest } from "../../types/roommate";
import { SearchNormal, Location, User, Message, Calendar, Heart, Filter } from "iconsax-react";
import TitleHead from "../../components/Ui/TitleHead";

const FindRoommate: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: roommateRequests, isLoading, error } = useRoommateRequests();

  const filteredRequests = roommateRequests?.filter((request: RoommateRequest) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      request.name?.toLowerCase().includes(query) ||
      request.department?.toLowerCase().includes(query) ||
      request.hobbies?.some(hobby => hobby.toLowerCase().includes(query)) ||
      request.religion?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-gray-50">
        <TitleHead title="Find Roommate" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 font-medium">Loading roommate requests...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-dvh bg-gray-50">
        <TitleHead title="Find Roommate" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={24} className="text-red-500" />
            </div>
            <p className="text-gray-600 font-medium">Error loading roommate requests</p>
            <p className="text-sm text-gray-500">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <TitleHead title="Find Roommate" />
      
      <section className="p-6 pb-20">
        {/* Search and Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <SearchNormal 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search roommates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
              <Filter size={16} />
              Filter
            </button>
            <Link
              to="/find-roommate/create"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-all"
            >
              <User size={16} />
              Create Request
            </Link>
          </div>
        </div>

        {/* Roommate Requests */}
        <div className="space-y-4">
          {filteredRequests && filteredRequests.length > 0 ? (
            filteredRequests.map((request: RoommateRequest) => {
              const user = typeof request.userId === "object" ? request.userId : null;
              const userId = user?._id || (request.userId as string);
              const userProfilePic = user?.profilePicture;
              const hostel = typeof request.hostelId === "object" ? request.hostelId : null;

              return (
                <div
                  key={request._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full border-2 border-gray-100 overflow-hidden flex-shrink-0">
                        <img
                          src={
                            request.picture ||
                            userProfilePic ||
                            "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                          }
                          alt={request.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-dark mb-1">
                              {request.name}
                            </h3>
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
                            <User size={14} />
                            <span>{request.religion}</span>
                          </div>
                          {/* <div className="flex items-center gap-1 text-gray-600">
                            <Calendar size={14} />
                            <span>{request.level}</span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-4">
                    {/* Hobbies */}
                    {request.hobbies && request.hobbies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-dark mb-2">Hobbies & Interests</h4>
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
                    {hostel && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-dark mb-3">Preferred Hostel</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Location size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-700">{hostel.hostelName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Location size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-700">{hostel.location}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-primary">₦{hostel.price.toLocaleString()}</span>
                            <span className="text-gray-500"></span>
                          </div>
                        </div>
                        
                        {hostel.images?.length > 0 && (
                          <div className="mt-3">
                            <img
                              onClick={() => navigate(`/hostels/${hostel._id}`)}
                              src={hostel.images[0]}
                              alt={hostel.hostelName}
                              className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between p-6 bg-gray-50">
                    <Link
                      to={`/find-roommate/${request._id}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      <Message size={16} />
                      <span>{request.comments?.length || 0} Comments</span>
                    </Link>
                    <Link
                      to={`/chat/${userId}`}
                      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl font-medium transition-all"
                    >
                      <Message size={16} />
                      Send Message
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? "No matching roommates" : "No roommate requests"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery 
                  ? "Try adjusting your search criteria" 
                  : "Be the first to create a roommate request"
                }
              </p>
              {!searchQuery && (
                <Link
                  to="/find-roommate/create"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all"
                >
                  <User size={16} />
                  Create Request
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FindRoommate;
