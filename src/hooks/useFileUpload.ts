import { useState } from 'react';
import {UploadResponse} from '../types/upload'
import {createFormData, getFilePreview} from '../utils/file'

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    try {
      const formDataArray = files.map(file => 
        createFormData(file, "test_phase")
      );

      const uploadPromises = formDataArray.map(formData =>
        fetch("", {
          method: "POST",
          body: formData,
        }).then<UploadResponse>(res => res.json())
      );

      const uploadedData = await Promise.all(uploadPromises);
      return uploadedData.map(data => data.secure_url);
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  const addPreviews = (files: File[]) => {
    const previews = files.map(getFilePreview);
    setFilePreviews(prev => [...prev, ...previews]);
  };

  return {
    uploading,
    setUploading,
    filePreviews,
    addPreviews,
    uploadFiles
  };
};