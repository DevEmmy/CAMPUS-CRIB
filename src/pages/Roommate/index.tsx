import React from 'react'
import { Link } from 'react-router'

const FindRoommate: React.FC = () => {
    const roommateRequests = [
        {
          id: 1,
          name: "John Doe",
          department: "Computer Science",
          level: "300 Level",
          religion: "Christianity",
          sex: "Male",
          hobbies: ["Gaming", "Coding", "Reading"],
          hostel: "Modern building with trees",
          avatar: "https://placehold.co/40x40",
          likes: 12,
          comments: 5,
        },
        {
          id: 2,
          name: "Sarah James",
          department: "Medicine",
          level: "200 Level",
          religion: "Islam",
          sex: "Female",
          hobbies: ["Swimming", "Music", "Movies"],
          hostel: "ocampus",
          avatar: "https://placehold.co/40x40",
          likes: 8,
          comments: 3,
        },
        {
          id: 3,
          name: "Michael Brown",
          department: "Engineering",
          level: "400 Level",
          religion: "Christianity",
          sex: "Male",
          hobbies: ["Football", "Chess", "Traveling"],
          hostel: "Looking for options",
          avatar: "https://placehold.co/40x40",
          likes: 15,
          comments: 7,
        },
      ]
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    {/* Header */}
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <Link to="/" className="text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </Link>
      <h1 className="text-lg font-bold">Find Your Roommate</h1>
      <Link to="/find-roommate/create" className="flex items-center gap-1 text-primary font-medium text-sm">
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

    {/* Filters */}
    <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
      <span className="px-3 py-1.5 bg-primary text-white text-xs rounded-full whitespace-nowrap">All</span>
      <span className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs rounded-full whitespace-nowrap">
        Male
      </span>
      <span className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs rounded-full whitespace-nowrap">
        Female
      </span>
      <span className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs rounded-full whitespace-nowrap">
        Computer Science
      </span>
      <span className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs rounded-full whitespace-nowrap">
        Engineering
      </span>
      <span className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs rounded-full whitespace-nowrap">
        Medicine
      </span>
    </div>

    {/* Roommate Requests Feed */}
    <main className="flex-1 p-4 space-y-4">
      {roommateRequests.map((request) => (
        <div key={request.id} className="bg-white rounded-lg shadow overflow-hidden p-2 my-3">
          <div className="p-4">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={request.avatar || "/placeholder.svg"}
                  alt={request.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{request.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      request.sex === "Male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    {request.sex}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {request.department}, {request.level}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Religion:</span> {request.religion}
                  </div>
                  <div>
                    <span className="font-medium">Hostel:</span> {request.hostel}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Hobbies:</span> {request.hobbies.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-t border-gray-100">
            {/* <button className="flex items-center gap-1 text-gray-500 text-sm">
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
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {request.likes}
            </button> */}
            <Link to={`/find-roommate/${request.id}`} className="flex items-center gap-1 text-gray-500 text-sm">
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {request.comments} Comments
            </Link>
            <Link
              to={`/messages/new?user=${request.id}`}
              className="bg-primary text-white px-5 font-semibold py-2 rounded text-sm"
            >
              Send DM
            </Link>
          </div>
        </div>
      ))}
    </main>

      
  </div>
  )
}

export default FindRoommate