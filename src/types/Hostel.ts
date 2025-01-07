import { User } from "./user";

export interface Hostel {
  _id: string;
  user: User;
  hostelName: string;
  location: string;
  description: string;
  price: string;
  isAvailable: boolean;
  availableRooms: number;
  hostelType: string;
  cover: string;
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
