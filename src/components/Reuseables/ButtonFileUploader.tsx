import React, { ChangeEvent, useId, useState } from "react";

interface ButtonFileUploaderProps {
  onUploadComplete?: (uploadUrls?: string[]) => void;
  multiple?: boolean;
}

const ButtonFileUploader: React.FC<ButtonFileUploaderProps> = ({
  onUploadComplete,
  multiple,
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
          fetch("", {
            method: "POST",
            body: formData,
          }).then((res) => res.json())
        );

        const uploadedData = await Promise.all(uploadPromises);
        const uploadedUrls = uploadedData.map((data) => data.secure_url);
        // onUploadComplete(uploadedUrls);
      } catch (error) {
        console.log("Error uploading files", error);
      } finally {
        setUploading(false);
      }
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Button to trigger file input */}
      <button
        className="bg-[#DFBFAD] px-7 py-4 rounded-lg leading-5 text-white text-[14px]"
        type="button"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Choose File"}
      </button>
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
