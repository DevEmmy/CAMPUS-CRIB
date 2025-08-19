/* eslint-disable @typescript-eslint/no-explicit-any */
import TitleHead from "../../components/Ui/TitleHead";
import locationImg from "/icons/location.svg";
import hostel from "/icons/hostel.png";
import { Eye, Heart } from "iconsax-react";

const SavedHostels = () => {
  const hostelList = [
    {
      name: "Cozy Nest Hostel",
      address: "45 Maple Drive",
      image: hostel,
      views: 1200,
      likes: 500,
      description: "A cozy place for travelers near the city center.",
    },
    {
      name: "Sunny Beach Resort",
      address: "21 Palm Street",
      image: hostel,
      views: 980,
      likes: 300,
      description: "A beautiful resort overlooking the beach.",
    },
    {
      name: "Mountain View Lodge",
      address: "78 Pine road",
      image: hostel,
      views: 650,
      likes: 200,
      description: "A serene lodge with mountain views for nature lovers.",
    },
  ];

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-dvh text-gray-900 dark:text-gray-100">
      <TitleHead title={`Saved Hostels`} />

      <section className="p-5 pt-20 flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          {hostelList?.map((item: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_3fr] gap-2 items-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              {/* Hostel Image */}
              <div>
                <img
                  src={item?.image}
                  className="w-full h-28 object-cover rounded-md"
                  alt={item?.name}
                />
              </div>

              {/* Hostel Info */}
              <div className="grow flex flex-col gap-1">
                <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg">
                  {item?.name}
                </h3>

                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm gap-1">
                  <img src={locationImg} className="size-4" alt="location" />
                  {item?.address}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {item?.description}..
                </p>

                <div className="grid grid-cols-2 text-sm mt-2">
                  <div className="flex gap-1 items-center text-gray-700 dark:text-gray-300">
                    <Eye size="18" className="text-gray-700 dark:text-gray-300" />
                    <p>{item?.views}</p>
                  </div>

                  <div className="flex gap-1 items-center text-red-600 dark:text-red-400">
                    <Heart size="18" variant="Bold" />
                    <p>{item?.likes}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SavedHostels;
