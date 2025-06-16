/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { HiX } from 'react-icons/hi';
import ButtonFileUploader from '../Reuseables/ButtonFileUploader';
import { errorToast, successToast } from 'oasis-toast';
import Loader from '../Ui/Loader';
import { useCreateRoommateRequest } from '../../utils/roommateRequestApi';

const CreateRoommate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    level: '',
    religion: '',
    sex: '' as 'Male' | 'Female',
    hobbies: '',
    hostelId: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const createMutation = useCreateRoommateRequest();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const removeImage = (index: number) => {
    setImages(prevImages => [
      ...prevImages.slice(0, index),
      ...prevImages.slice(index + 1)
    ]);
  };

  const handleUploadComplete = (uploadUrls?: string[]) => {
    if (uploadUrls) {
      setImages(prev => [...prev, ...uploadUrls]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare form data
    const requestData = {
      ...formData,
      hobbies: formData.hobbies.split(',').map(h => h.trim()).filter(h => h),
      picture: images[0] || undefined, // Using first image as profile picture
      hostelId: formData.hostelId || undefined,
    };

    try {
      await createMutation.mutateAsync(requestData);
      successToast('Roommate request created successfully', '');
      navigate('/find-roommate');
    } catch (error) {
      errorToast('An error occurred', 'Failed to create roommate request');
      console.error('Error creating roommate request:', error);
    }
  };

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
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold text-center text-primary mb-6">Your Information</h2>

          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Department Field */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium mb-1">
                Department *
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
                required
              >
                <option value="">Select your department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Arts">Arts</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Level Field */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium mb-1">
                Level *
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
                required
              >
                <option value="">Select your level</option>
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
                <option value="500">500 Level</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            {/* Religion Field */}
            <div>
              <label htmlFor="religion" className="block text-sm font-medium mb-1">
                Religion *
              </label>
              <select
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
                required
              >
                <option value="">Select your religion</option>
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Sex Field */}
            <div>
              <label htmlFor="sex" className="block text-sm font-medium mb-1">
                Sex *
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
                required
              >
                <option value="">Select your sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Hobbies Field */}
            <div>
              <label htmlFor="hobbies" className="block text-sm font-medium mb-1">
                Hobbies & Interests *
              </label>
              <textarea
                id="hobbies"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md text-sm min-h-[80px]"
                placeholder="Enter your hobbies and interests (separated by commas)"
                required
              />
            </div>

            {/* Hostel Field */}
            <div>
              <label htmlFor="hostelId" className="block text-sm font-medium mb-1">
                Hostel Preference
              </label>
              <select
                id="hostelId"
                name="hostelId"
                value={formData.hostelId}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select your hostel preference</option>
                <option value="modern-building">Modern building with trees</option>
                <option value="ocampus">ocampus</option>
                <option value="looking">Looking for options</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Profile Picture Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Profile Picture (Optional)</label>
              <ButtonFileUploader
                title="Upload Profile Picture"
                onUploadComplete={handleUploadComplete}
              />
              <small className="text-dark text-[12px] leading-5 font-normal">
                JPG, PNG (Max size: 5MB)
              </small>

              {/* Image Previews */}
              <div className="flex gap-3 overflow-scroll py-4">
                {images.map((image, idx) => (
                  <div key={idx} className="relative">
                    <button
                      className="absolute -top-3 -right-2 p-1 rounded-full bg-red-500 text-white"
                      onClick={() => removeImage(idx)}
                    >
                      <HiX />
                    </button>
                    <img
                      className="min-w-[150px] h-[150px] rounded-lg object-cover"
                      src={image}
                      alt={`Preview ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md font-medium transition-colors"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader />
                  Posting...
                </span>
              ) : (
                'Post Roommate Request'
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateRoommate;