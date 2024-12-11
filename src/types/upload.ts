export interface FileUploaderProps {
    onUploadComplete?: (uploadUrls?: string[]) => void;
    multiple?: boolean;
  }
  
  export interface UploadResponse {
    secure_url: string;
    // Add other response fields as needed
  }