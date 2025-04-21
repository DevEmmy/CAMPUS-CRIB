/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from "react";
import TitleHead from "../../components/Ui/TitleHead";
import CustomInput from "../../components/Reuseables/CustomInput";
// import profile from "/icons/profile.png";
import ControlledButton from "../../components/Reuseables/ControlledButton";
import { updateUser } from "../../utils/authRequest";
import ButtonFileUploader from "../../components/Reuseables/ButtonFileUploader";
import { fetchUser, fetchUserById } from "../../lib/fetchUser";
import { useUserStore } from "../../store/UseUserStore";
import { useQuery } from "@tanstack/react-query";
// import { Camera } from "iconsax-react";

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
  const [loggedUser, setLoggedUser] = useState<any | null>(null);

  const { user, setUserData } = useUserStore();
  const { data: userDet } = useQuery({
    queryKey: ["userDetails", user?._id],
    queryFn: () => fetchUserById(user?._id),
  });

  useEffect(() => {
    console.log("User det", userDet);
    // setHostels(userDet?.hostels);
  }, [userDet]);

  const localUser = localStorage.getItem("user");

  useEffect(() => {
    setLoggedUser(user || (localUser ? JSON.parse(localUser) : null));
    console.log("User details", loggedUser);
  }, []);

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

      // Create the update data object with the latest form data
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

      console.log("response data", response);

      if (response?.status === 200) {
        setIsEdited(false);
        // Refresh user data after successful update

        console.log("response data",response?.data.data)

        setUserData(response?.data.data);
        if (user) {
          fetchUser();
        }
      }
    } catch (error) {
      console.error("Update profile error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <TitleHead title="Personal Details" />

      <div className="bg-white rounded-lg p-5 py-20 mt-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-32 h-32">
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-gray-200"
              />
              <ButtonFileUploader
                title="Upload"
                onUploadComplete={handleUploadComplete}
                isProfilePic
              />
            </div>
            <p className="text-sm text-gray-500">
              Click icon to change profile picture
            </p>
          </div>

          {/* Personal Details Form */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <CustomInput
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData?.firstName}
                handleChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <CustomInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                handleChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <CustomInput
                type="text"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                handleChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <CustomInput
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                handleChange={handleInputChange}
              />
            </div>

            {loggedUser?.userType == "AGENT" && (
              <>
                <div>
                  <label
                    htmlFor="accountNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Account Number
                  </label>
                  <CustomInput
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    value={formData?.accountNumber}
                    handleChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="bankName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bank Name
                  </label>
                  <CustomInput
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    value={formData?.bankName}
                    handleChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="accountName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Account Name
                  </label>
                  <CustomInput
                    type="text"
                    name="accountName"
                    placeholder="Account Name"
                    value={formData?.accountName}
                    handleChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <ControlledButton
            title="Save Changes"
            isEdited={isEdited}
            uploading={isSubmitting}
            handleButtonClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
