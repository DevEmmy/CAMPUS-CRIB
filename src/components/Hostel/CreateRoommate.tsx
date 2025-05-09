import React from 'react'
import { Link } from 'react-router'

const CreateRoommate:React.FC = () => {
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
      <h1 className="text-lg font-bold">Create Roommate Request</h1>
    </header>

    {/* Form */}
    <main className="flex-1 p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold text-center text-primary mb-6">Your Information</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium mb-1">
              Department
            </label>
            <select id="department" className="w-full p-2.5 border border-gray-300 rounded-md text-sm">
              <option value="" disabled selected>
                Select your department
              </option>
              <option value="computer-science">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="medicine">Medicine</option>
              <option value="arts">Arts</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium mb-1">
              Level
            </label>
            <select id="level" className="w-full p-2.5 border border-gray-300 rounded-md text-sm">
              <option value="" disabled selected>
                Select your level
              </option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
              <option value="postgrad">Postgraduate</option>
            </select>
          </div>

          <div>
            <label htmlFor="religion" className="block text-sm font-medium mb-1">
              Religion
            </label>
            <select id="religion" className="w-full p-2.5 border border-gray-300 rounded-md text-sm">
              <option value="" disabled selected>
                Select your religion
              </option>
              <option value="christianity">Christianity</option>
              <option value="islam">Islam</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label htmlFor="sex" className="block text-sm font-medium mb-1">
              Sex
            </label>
            <select id="sex" className="w-full p-2.5 border border-gray-300 rounded-md text-sm">
              <option value="" disabled selected>
                Select your sex
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="hobbies" className="block text-sm font-medium mb-1">
              Hobbies & Interests
            </label>
            <textarea
              id="hobbies"
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm min-h-[80px]"
              placeholder="Enter your hobbies and interests (separated by commas)"
            ></textarea>
          </div>

          <div>
            <label htmlFor="hostel" className="block text-sm font-medium mb-1">
              Hostel Preference
            </label>
            <select id="hostel" className="w-full p-2.5 border border-gray-300 rounded-md text-sm">
              <option value="" disabled selected>
                Select your hostel preference
              </option>
              <option value="modern-building">Modern building with trees</option>
              <option value="ocampus">ocampus</option>
              <option value="looking">Looking for options</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profile Picture (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 relative">
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
                className="mb-2"
              >
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                <path d="M16 5V3" />
                <path d="M8 14a3 3 0 0 1 5.12-2.12L21 19" />
                <path d="m21 5-9 9" />
              </svg>
              <p className="text-sm">Click to upload or drag and drop</p>
              <p className="text-xs mt-1">JPG, PNG or GIF (max. 2MB)</p>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
            </div>
          </div>

          <button className="w-full bg-primtext-primary hover:bg-orange-600 text-white py-3 px-4 rounded-md font-medium">
            Post Roommate Request
          </button>
        </div>
      </div>
    </main>
  </div>
  )
}

export default CreateRoommate