import { axiosConfig } from './axiosConfig';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
interface RoommateRequest {
  id: string;
  name: string;
  department: string;
  level: string;
  religion: string;
  sex: 'Male' | 'Female';
  hobbies: string[];
  picture?: string;
  hostelId?: string | { id: string; name: string };
  userId: string | { id: string; name: string; email: string };
  comments: Array<{
    userId: string | { id: string; name: string; email: string };
    content: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateRoommateRequestData {
  name: string;
  department: string;
  level: string;
  religion: string;
  sex: 'Male' | 'Female';
  hobbies: string[];
  picture?: string;
  hostelId?: string;
}

interface UpdateRoommateRequestData {
  name?: string;
  department?: string;
  level?: string;
  religion?: string;
  sex?: 'Male' | 'Female';
  hobbies?: string[];
  picture?: string;
  hostelId?: string;
}

interface CommentData {
  content: string;
}

// API calls
const createRoommateRequest = async (data: CreateRoommateRequestData): Promise<RoommateRequest> => {
  const response = await axiosConfig.post('/roommate-requests', data);
  return response.data.payload;
};

const getRoommateRequests = async (params?: {
  department?: string;
  level?: string;
  sex?: 'Male' | 'Female';
  religion?: string;
}): Promise<RoommateRequest[]> => {
  const response = await axiosConfig.get('/roommate-requests', { params });
  return response.data.payload;
};

const getRoommateRequestById = async (id: string): Promise<RoommateRequest> => {
  const response = await axiosConfig.get(`/roommate-requests/${id}`);
  return response.data.payload;
};

const addCommentToRequest = async (id: string, data: CommentData): Promise<RoommateRequest> => {
  const response = await axiosConfig.post(`/roommate-requests/${id}/comments`, data);
  return response.data.payload;
};

const updateRoommateRequest = async (id: string, data: UpdateRoommateRequestData): Promise<RoommateRequest> => {
  const response = await axiosConfig.put(`/roommate-requests/${id}`, data);
  return response.data.payload;
};

const deleteRoommateRequest = async (id: string): Promise<RoommateRequest> => {
  const response = await axiosConfig.delete(`/roommate-requests/${id}`);
  return response.data.payload;
};

// React Query hooks
export const useCreateRoommateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<RoommateRequest, Error, CreateRoommateRequestData>({
    mutationFn: createRoommateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roommateRequests'] });
    },
  });
};

export const useRoommateRequests = (params?: {
  department?: string;
  level?: string;
  sex?: 'Male' | 'Female';
  religion?: string;
}) => {
  return useQuery<RoommateRequest[], Error>({
    queryKey: ['roommateRequests', params],
    queryFn: () => getRoommateRequests(params),
  });
};

export const useRoommateRequest = (id: string) => {
  return useQuery<RoommateRequest, Error>({
    queryKey: ['roommateRequest', id],
    queryFn: () => getRoommateRequestById(id),
    enabled: !!id,
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation<RoommateRequest, Error, { id: string; data: CommentData }>({
    mutationFn: ({ id, data }) => addCommentToRequest(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['roommateRequest', data.id] });
    },
  });
};

export const useUpdateRoommateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<RoommateRequest, Error, { id: string; data: UpdateRoommateRequestData }>({
    mutationFn: ({ id, data }) => updateRoommateRequest(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['roommateRequest', data.id] });
      queryClient.invalidateQueries({ queryKey: ['roommateRequests'] });
    },
  });
};

export const useDeleteRoommateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<RoommateRequest, Error, string>({
    mutationFn: deleteRoommateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roommateRequests'] });
    },
  });
};