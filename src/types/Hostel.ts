export interface Hostel {
    _id: string;
    user: string;
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