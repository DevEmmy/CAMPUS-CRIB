// utils/roommateRequestApi.ts
import { axiosConfig } from "./axiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  RoommateRequest,
  CreateRoommateRequestData,
  UpdateRoommateRequestData,
  CommentData,
} from "../types/roommate";

// API calls
const createRoommateRequest = async (
  data: CreateRoommateRequestData
): Promise<RoommateRequest> => {
  const response = await axiosConfig.post("/roommate-requests", data);
  return response.data.data;
};

const getRoommateRequests = async (params?: {
  department?: string;
  level?: string;
  sex?: "Male" | "Female";
  religion?: string;
}): Promise<RoommateRequest[]> => {
  const response = await axiosConfig.get("/roommate-requests", { params });
  return response.data.data || [];
};

const getRoommateRequestById = async (id: string): Promise<RoommateRequest> => {
  const response = await axiosConfig.get(`/roommate-requests/${id}`);
  return response.data.data;
};

const addCommentToRequest = async (
  id: string,
  data: CommentData
): Promise<RoommateRequest> => {
  const response = await axiosConfig.post(
    `/roommate-requests/${id}/comments`,
    data
  );
  return response.data.data;
};

const updateRoommateRequest = async (
  id: string,
  data: UpdateRoommateRequestData
): Promise<RoommateRequest> => {
  const response = await axiosConfig.put(`/roommate-requests/${id}`, data);
  return response.data.data;
};

const deleteRoommateRequest = async (id: string): Promise<RoommateRequest> => {
  const response = await axiosConfig.delete(`/roommate-requests/${id}`);
  return response.data.data;
};

// React Query hooks
export const useCreateRoommateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<RoommateRequest, Error, CreateRoommateRequestData>({
    mutationFn: createRoommateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roommateRequests"] });
    },
  });
};

export const useRoommateRequests = (params?: {
  department?: string;
  level?: string;
  sex?: "Male" | "Female";
  religion?: string;
}) => {
  const stableParams = JSON.stringify(params || {});
  return useQuery<RoommateRequest[], Error>({
    queryKey: ["roommateRequests", stableParams],
    queryFn: () => getRoommateRequests(params),
  });
};

export const useRoommateRequest = (id: string) => {
  return useQuery<RoommateRequest, Error>({
    queryKey: ["roommateRequest", id],
    queryFn: () => getRoommateRequestById(id),
    enabled: !!id,
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation<RoommateRequest, Error, { id: string; data: CommentData }>(
    {
      mutationFn: ({ id, data }) => addCommentToRequest(id, data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["roommateRequest", data._id],
        });
      },
    }
  );
};

export const useUpdateRoommateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    RoommateRequest,
    Error,
    { id: string; data: UpdateRoommateRequestData }
  >({
    mutationFn: ({ id, data }) => updateRoommateRequest(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["roommateRequest", data._id],
      });
      queryClient.invalidateQueries({ queryKey: ["roommateRequests"] });
    },
  });
};

export const useDeleteRoommateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<RoommateRequest, Error, string>({
    mutationFn: deleteRoommateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roommateRequests"] });
    },
  });
};