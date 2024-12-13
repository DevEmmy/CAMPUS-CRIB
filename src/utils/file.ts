export const getFilePreview = (file: File): string => {
    return file.type.startsWith("image") 
      ? URL.createObjectURL(file) 
      : file.name;
  };
  
  export const createFormData = (file: File, uploadPreset: string): FormData => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    return formData;
  };