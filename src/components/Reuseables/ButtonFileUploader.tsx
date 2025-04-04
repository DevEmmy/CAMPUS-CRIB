import React, { ChangeEvent, useId, useState } from "react";
import ControlledButton from "./ControlledButton";
import { Camera } from "iconsax-react";

interface ButtonFileUploaderProps {
  title: string;
  onUploadComplete?: (uploadUrls?: string[]) => void;
  multiple?: boolean;
  isProfilePic?: boolean;
}

const ButtonFileUploader: React.FC<ButtonFileUploaderProps> = ({
  title,
  onUploadComplete,
  multiple,
  isProfilePic,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const uniqueId = useId();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const preview = selectedFiles.map((file) =>
        file.type.startsWith("image") ? URL.createObjectURL(file) : file.name
      );
      setFilePreviews((prev) => [...prev, ...preview]);
      console.log(filePreviews);
      setUploading(true);

      try {
        // Prepare the form data for each file
        const formDataArray = selectedFiles.map((file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "test_phase");
          return formData;
        });

        // Perform the upload
        const uploadPromises = formDataArray.map((formData) =>
          fetch("https://api.cloudinary.com/v1_1/devemmy/upload", {
            method: "POST",
            body: formData,
          }).then((res) => res.json())
        );

        const uploadedData = await Promise.all(uploadPromises);
        const uploadedUrls = uploadedData.map((data) => data.secure_url);

        // Call the onUploadComplete callback if provided
        if (onUploadComplete) {
          onUploadComplete(uploadedUrls);
        }
      } catch (error) {
        console.log("Error uploading files", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById(uniqueId) as HTMLInputElement;
    fileInput?.click(); // Trigger the hidden file input
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Button to trigger file input */}

      {isProfilePic ? (
        <button
          onClick={handleButtonClick}
          disabled={uploading}
          className="bg-[#f5f5f5] absolute rounded-lg right-0 bottom-0 p-1.5"
        >
          <Camera size="16" color="#1B85A6" />
        </button>
      ) : (
        <ControlledButton
          title={title}
          uploading={uploading}
          handleButtonClick={handleButtonClick}
        />
      )}

      {/* Hidden file input */}
      <input
        type="file"
        id={uniqueId}
        className="hidden"
        multiple={multiple}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ButtonFileUploader;
