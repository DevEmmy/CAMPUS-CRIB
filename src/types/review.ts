import { User } from "./user";

export interface Review {
    _id: string;
    user: User;
    hostel: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };