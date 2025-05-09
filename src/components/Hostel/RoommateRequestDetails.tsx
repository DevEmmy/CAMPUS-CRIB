import React from 'react'
import { Link, useParams } from 'react-router'

const RoommateRequestDetails: React.FC = () => {
    const { id } = useParams()

    // This would normally be fetched from an API based on the ID
    const request = {
      id: Number.parseInt(id as string),
      name: "John Doe",
      department: "Computer Science",
      level: "300 Level",
      religion: "Christianity",
      sex: "Male",
      hobbies: ["Gaming", "Coding", "Reading"],
      hostel: "Modern building with trees",
      avatar: "https://placehold.co/40x40",
      likes: 12,
      comments: [
        {
          id: 1,
          name: "Sarah James",
          avatar: "https://placehold.co/40x40",
          comment: "Hey! I'm also looking for a roommate in that hostel. Would love to connect!",
          time: "2 hours ago",
        },
        {
          id: 2,
          name: "Michael Brown",
          avatar: "https://placehold.co/40x40",
          comment: "I'm in Computer Science too. Do you have a specific budget in mind?",
          time: "1 hour ago",
        },
      ],
    }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center p-4 bg-white border-b border-gray-200">
        <Link to="/find-roommate" className="mr-4 text-gray-700">
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </Link>
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
                  src={request.avatar || "/placeholder.svg"}
                  alt={request.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{request.name}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      request.sex === "Male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    {request.sex}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {request.department}, {request.level}
                </p>

                <div className="mt-3 flex flex-col gap-2 text-sm">
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
            <Link
              to={`/messages/new?user=${request.id}`}
              className="bg-primary  text-white p-3 rounded-lg text-base font-semibold w-full text-center"
            >
              Send DM
            </Link>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Comments ({request.comments.length})</h2>

          {/* Comment Form */}
          <div className="flex gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-gray-600">ME</span>
            </div>
            <div className="flex-1 flex gap-2">
              <textarea
                placeholder="Write a comment..."
                className="flex-1 p-2.5 border border-gray-300 rounded-md text-sm min-h-[60px] resize-none"
              ></textarea>
              <button className="bg-primary  text-white p-5  rounded-md">
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
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {request.comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 bg-white p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{comment.name}</span>
                    <span className="text-xs text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      
    </div>
  )
}

export default RoommateRequestDetails