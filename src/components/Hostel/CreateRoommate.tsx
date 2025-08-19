import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { HiX } from 'react-icons/hi';
import ButtonFileUploader from '../Reuseables/ButtonFileUploader';
import { errorToast, successToast } from 'oasis-toast';
import { useCreateRoommateRequest } from '../../utils/roommateRequestApi';
import { Hostel } from '../../types/Hostel';
import { useQuery } from '@tanstack/react-query';
import { fetchAllHostels } from '../../lib/fetchHostels';
import TitleHead from '../Ui/TitleHead';
import { User, Camera, Heart } from 'iconsax-react';

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
  
  const { data: hostels = [], isLoading: isHostelsLoading } = useQuery({
    queryKey: ['hostels'],
    queryFn: () => fetchAllHostels(),
  });

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
      picture: images[0] || undefined, 
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
    <div className="min-h-dvh bg-white dark:bg-gray-900 transition-colors">
      <TitleHead title="Create Roommate Request" />
      
      <section className="p-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={24} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-dark dark:text-white mb-2">Create Roommate Request</h1>
              <p className="text-gray-600 dark:text-gray-300">Share your preferences to find the perfect roommate</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-dark dark:text-white flex items-center gap-2">
                  <User size={20} className="text-primary" />
                  Personal Information
                </h2>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Department Field */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-dark dark:text-gray-300 mb-2">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  >
                    <option value="" className="text-gray-500 dark:text-gray-400">Select your department</option>
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
                  <label htmlFor="level" className="block text-sm font-medium text-dark dark:text-gray-300 mb-2">
                    Level *
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  >
                    <option value="" className="text-gray-500 dark:text-gray-400">Select your level</option>
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
                  <label htmlFor="religion" className="block text-sm font-medium text-dark dark:text-gray-300 mb-2">
                    Religion *
                  </label>
                  <select
                    id="religion"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  >
                    <option value="" className="text-gray-500 dark:text-gray-400">Select your religion</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Islam">Islam</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* Sex Field */}
                <div>
                  <label htmlFor="sex" className="block text-sm font-medium text-dark dark:text-gray-300 mb-2">
                    Sex *
                  </label>
                  <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  >
                    <option value="" className="text-gray-500 dark:text-gray-400">Select your sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-dark dark:text-white flex items-center gap-2">
                  <Heart size={20} className="text-primary" />
                  Preferences
                </h2>

                {/* Hobbies Field */}
                <div>
                  <label htmlFor="hobbies" className="block text-sm font-medium text-dark dark:text-gray-300 mb-2">
                    Hobbies & Interests *
                  </label>
                  <textarea
                    id="hobbies"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[100px] resize-none placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your hobbies and interests (separated by commas)"
                    required
                  />
                </div>

                {/* Hostel Field */}
                <div>
                  <label htmlFor="hostelId" className="block text-sm font-medium text-dark dark:text-gray-300 mb-2">
                    Hostel Preference
                  </label>
                  {isHostelsLoading ? (
                    <div className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-xl animate-pulse flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600 dark:text-gray-300">Loading hostels...</span>
                    </div>
                  ) : (
                    <select
                      id="hostelId"
                      name="hostelId"
                      value={formData.hostelId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="" className="text-gray-500 dark:text-gray-400">Select your hostel preference</option>
                      {hostels.map((hostel: Hostel) => (
                        <option key={hostel._id} value={hostel._id}>
                          {hostel.hostelName} - {hostel.location}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Profile Picture */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-dark dark:text-white flex items-center gap-2">
                  <Camera size={20} className="text-primary" />
                  Profile Picture
                </h2>

                <div>
                  <label className="block text-sm font-medium text-dark dark:text-gray-300 mb-2">
                    Upload Profile Picture (Optional)
                  </label>
                  <ButtonFileUploader
                    title="Upload Profile Picture"
                    onUploadComplete={handleUploadComplete}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    JPG, PNG (Max size: 5MB)
                  </p>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-dark dark:text-gray-300 mb-3">Preview</h3>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {images.map((image, idx) => (
                          <div key={idx} className="relative flex-shrink-0">
                            <button
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 dark:bg-red-600 text-white flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                              onClick={() => removeImage(idx)}
                            >
                              <HiX size={12} />
                            </button>
                            <img
                              className="w-24 h-24 rounded-xl object-cover border border-gray-200 dark:border-gray-600"
                              src={image}
                              alt={`Preview ${idx + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Request...
                  </span>
                ) : (
                  'Create Roommate Request'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateRoommate;