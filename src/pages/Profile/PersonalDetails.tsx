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
      setFormData((prev) => ({ ...prev, profilePicture: imageUrl }));
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
        if (user) fetchUser();
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
    <main className="min-h-dvh bg-gray-50 dark:bg-theme transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-theme border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold text-dark dark:text-white">
            Personal Details
          </h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Picture */}
          <div className="bg-white dark:bg-theme rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Profile Picture
            </h2>
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={
                      previewImage ||
                      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
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
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Click the camera icon to change your profile picture
              </p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white dark:bg-theme rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
                <div className="space-y-2" key={field}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {field === "email" ? "Email Address" : field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <CustomInput
                    type="text"
                    name={field}
                    placeholder={`Enter your ${field}`}
                    value={(formData as any)[field]}
                    handleChange={handleInputChange}
                  />
                </div>
              ))}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <CustomInput
                  type="select"
                  name="address"
                  placeholder="Select Location"
                  value={formData.address}
                  options={[
                    "Harmony",
                    "Kofesu",
                    "Agbade",
                    "Labuta",
                    "Accord",
                    "Oluwo",
                    "Zoo",
                    "Isolu",
                    "Camp",
                  ]}
                  handleChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Banking Info (Agents Only) */}
          {isAgent && (
            <div className="bg-white dark:bg-theme rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
                Banking Information
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This information is used for receiving payments from your hostel listings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["bankName", "accountNumber", "accountName"].map((field) => (
                  <div className={field === "accountName" ? "md:col-span-2 space-y-2" : "space-y-2"} key={field}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <CustomInput
                      type="text"
                      name={field}
                      placeholder={`Enter your ${field}`}
                      value={(formData as any)[field]}
                      handleChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Account Security */}
          <div className="bg-white dark:bg-theme rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Account Security
            </h2>
            <div className="space-y-4">
              {/* Email Verification */}
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Shield size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-dark dark:text-white">Email Verification</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {loggedUser?.emailVerified ? "Verified" : "Not verified"}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    loggedUser?.emailVerified ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </div>

              {/* Account Type */}
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <User size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-dark dark:text-white">Account Type</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isAgent ? "Agent" : "Student"}
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Save Changes */}
          <div className="bg-white dark:bg-theme rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-dark dark:text-white">Save Changes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
