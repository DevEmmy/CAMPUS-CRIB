import { Hostel } from "./Hostel";

// types/roommate.ts
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  profilePicture?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  _id: string;
  userId: User | string;
  content: string;
  createdAt: string;
}

export interface RoommateRequest {
  _id: string;
  userId: User | string;
  name: string;
  department: string;
  level: string;
  religion: string;
  sex: string;
  hobbies: string[];
  hostelId: Hostel | string;
  comments: Comment[];
  picture?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateRoommateRequestData {
  name: string;
  department: string;
  level: string;
  religion: string;
  sex: "Male" | "Female";
  hobbies: string[];
  picture?: string;
  hostelId?: string;
}

export interface UpdateRoommateRequestData {
  name?: string;
  department?: string;
  level?: string;
  religion?: string;
  sex?: "Male" | "Female";
  hobbies?: string[];
  picture?: string;
  hostelId?: string;
}

export interface CommentData {
  content: string;
}