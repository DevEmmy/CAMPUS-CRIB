import { axiosConfig } from "../utils/axiosConfig"

export const fetchAllHostels = async () => {
  try {
    const response = await axiosConfig.get("/hostels");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching hostels:", error);
    return [];
  }
};

export const fetchHostelById = async (id: string) => {
  try {
    const response = await axiosConfig.get(`/hostels/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching hostel:", error);
    return null;
  }
};

export const createHostel = async (hostelData: any) => {
  try {
    const response = await axiosConfig.post("/hostels", hostelData);
    return response;
  } catch (error) {
    console.error("Error creating hostel:", error);
    throw error;
  }
};

export const updateHostel = async (id: string, hostelData: any) => {
  try {
    const response = await axiosConfig.put(`/hostels/${id}`, hostelData);
    return response;
  } catch (error) {
    console.error("Error updating hostel:", error);
    throw error;
  }
};

export const deleteHostel = async (id: string) => {
    const response = await axiosConfig.delete(`/hostels/${id}`)
    console.log(response)
    return response
}