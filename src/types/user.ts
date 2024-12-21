export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bookmarkedHostels: string[];
  createdAt: string;
  updatedAt: string;
  userType: "BASIC" | "AGENT";
  _id: string;
  __v: number;
}
