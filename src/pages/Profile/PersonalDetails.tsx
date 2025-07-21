/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from "react";
import CustomInput from "../../components/Reuseables/CustomInput";
import ControlledButton from "../../components/Reuseables/ControlledButton";
import { updateUser } from "../../utils/authRequest";
import ButtonFileUploader from "../../components/Reuseables/ButtonFileUploader";
import { fetchUser, fetchUserById } from "../../lib/fetchUser";
import { useUserStore } from "../../store/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, User, Shield } from "iconsax-react";
import { useNavigate } from "react-router";
import { errorToast, successToast } from "oasis-toast";

interface UserUpdateData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture?: string | null;
  accountNumber?: string;
  bankName?: string;
  accountName?: string;
}

const PersonalDetails = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<any | null>(null);

  const { user, setUserData } = useUserStore();
  const { data: userDet } = useQuery({
    queryKey: ["userDetails", user?._id],
    queryFn: () => fetchUserById(user?._id),
  });

  useEffect(() => {
    // User details loaded
  }, [userDet]);

  const localUser = localStorage.getItem("user");

  useEffect(() => {
    setLoggedUser(user || (localUser ? JSON.parse(localUser) : null));
  }, [user, localUser]);

  const [formData, setFormData] = useState<UserUpdateData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    profilePicture: null,
    accountNumber: "",
    bankName: "",
    accountName: "",
  });
  const [isEdited, setIsEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (loggedUser) {
      setFormData({
        firstName: loggedUser?.firstName || "",
        lastName: loggedUser?.lastName || "",
        email: loggedUser?.email || "",
        phoneNumber: loggedUser?.phoneNumber || "",
        address: loggedUser?.address || "",
        profilePicture: loggedUser?.profilePicture || null,
        accountNumber: loggedUser?.accountNumber || userDet?.accountNumber,
        bankName: loggedUser?.bankName || userDet?.bankName,
        accountName: loggedUser?.accountName || userDet?.accountName,
      });
      setPreviewImage(loggedUser?.profilePicture || "");
    }
  }, [user, loggedUser, localUser]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsEdited(true);
  };

  const handleUploadComplete = (uploadUrls?: string[]) => {
    if (uploadUrls && uploadUrls.length > 0) {
      const imageUrl = uploadUrls[0];
      setUploadedImageUrl(imageUrl);
      setPreviewImage(imageUrl);

      setFormData((prev) => ({
        ...prev,
        profilePicture: imageUrl,
      }));

      setIsEdited(true);
    }
  };

  const handleSubmit = async () => {
    if (!isEdited) return;

    try {
      setIsSubmitting(true);

      const updateData: UserUpdateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        profilePicture: uploadedImageUrl || formData.profilePicture,
        accountNumber: formData?.accountNumber,
        bankName: formData?.bankName,
        accountName: formData?.accountName,
      };

      const response = await updateUser(updateData);

      if (response?.status === 200) {
        setIsEdited(false);
        setUserData(response?.data.data);
        if (user) {
          fetchUser();
        }
        successToast("Profile updated successfully!", "");
      } else {
        errorToast("Failed to update profile", "Please try again");
      }
    } catch (error) {
      errorToast("An error occurred", "Failed to update profile");
      console.error("Update profile error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAgent = loggedUser?.userType === "AGENT";

  return (
    <main className="min-h-dvh bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <h1 className="text-lg font-semibold text-dark">Personal Details</h1>
          
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Picture Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark mb-4">Profile Picture</h2>
            
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={previewImage || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <ButtonFileUploader
                    title=""
                    onUploadComplete={handleUploadComplete}
                    isProfilePic
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Click the camera icon to change your profile picture
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <CustomInput
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData?.firstName}
                  handleChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <CustomInput
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  handleChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <CustomInput
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  handleChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <CustomInput
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  handleChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <CustomInput
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  handleChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Banking Information (Agents Only) */}
          {isAgent && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-dark mb-4">Banking Information</h2>
              <p className="text-sm text-gray-600 mb-4">
                This information is used for receiving payments from your hostel listings.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Name
                  </label>
                  <CustomInput
                    type="text"
                    name="bankName"
                    placeholder="Enter your bank name"
                    value={formData?.bankName}
                    handleChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Account Number
                  </label>
                  <CustomInput
                    type="text"
                    name="accountNumber"
                    placeholder="Enter your account number"
                    value={formData?.accountNumber}
                    handleChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Account Name
                  </label>
                  <CustomInput
                    type="text"
                    name="accountName"
                    placeholder="Enter your account name"
                    value={formData?.accountName}
                    handleChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Account Security */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark mb-4">Account Security</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-dark">Email Verification</p>
                    <p className="text-sm text-gray-500">
                      {loggedUser?.emailVerified ? "Verified" : "Not verified"}
                    </p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  loggedUser?.emailVerified ? "bg-green-500" : "bg-red-500"
                }`}></div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-dark">Account Type</p>
                    <p className="text-sm text-gray-500">
                      {isAgent ? "Agent" : "Student"}
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-dark">Save Changes</h3>
                <p className="text-sm text-gray-500">
                  {isEdited ? "You have unsaved changes" : "All changes saved"}
                </p>
              </div>
              
              <ControlledButton
                title="Save Changes"
                isEdited={isEdited}
                uploading={isSubmitting}
                handleButtonClick={handleSubmit}
                
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PersonalDetails;
