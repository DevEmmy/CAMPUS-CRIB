export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: "BASIC" | "AGENT";
  bookmarkedHostels: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  phoneNumber: string;
  profilePicture: string;
}
