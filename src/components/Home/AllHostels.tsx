import type React from "react"
import { Location } from "iconsax-react"
import type { Hostel } from "../../types/Hostel"
import { useQuery } from "@tanstack/react-query"
import { fetchAllHostels } from "../../lib/fetchHostels"
import HostelCard from "../Reuseables/HostelCard"

interface AllHostelsProps {
  bookmarkedIds: string[]
}

const AllHostels: React.FC<AllHostelsProps> = ({ bookmarkedIds = [] }) => {
  // const [likedHostels, setLikedHostels] = useState<string[]>(bookmarkedIds);

  const { data: hostels = [], isLoading } = useQuery({
    queryKey: ["allHostels"],
    queryFn: () => fetchAllHostels(),
  })

  // const handleBookmark = async (hostelId: string) => {
  //   const isLiked = likedHostels.includes(hostelId);
  //   const action = isLiked ? "remove" : "add";

  //   setLikedHostels((prev) =>
  //     isLiked ? prev.filter((id) => id !== hostelId) : [...prev, hostelId]
  //   );

  //   await updateBookmark(hostelId, action);
  // };

  // const getFeatureIcon = (feature: string) => {
  //   const featureLower = feature.toLowerCase();
  //   if (featureLower.includes('wifi') || featureLower.includes('internet')) return <Wifi size={12} />;
  //   if (featureLower.includes('parking') || featureLower.includes('car')) return <Car size={12} />;
  //   if (featureLower.includes('security') || featureLower.includes('guard')) return <Shield size={12} />;
  //   return <Star size={12} />;
  // };

  if (isLoading) {
    return (
      <div className="space-y-6 my-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">All Hostels</h2>
          <div className="flex items-center gap-2 text-primary text-sm font-medium">
            <span>Browse all listings</span>
          </div>
        </div>

        <div className="flex justify-center items-center py-20">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">Loading hostels...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dark dark:text-white">All Hostels</h2>
        <div className="flex items-center gap-2 text-primary text-sm font-medium">
          <span>{Array.isArray(hostels) ? hostels.length : 0} listings available</span>
        </div>
      </div>

      {Array.isArray(hostels) && hostels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel: Hostel) => (
            <HostelCard
              key={hostel._id}
              hostel={hostel}
              bookmarkedIds={bookmarkedIds}
              variant="vertical"
              showFeatures={true}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
              <Location size={24} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No hostels available</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Check back later for new listings</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllHostels
