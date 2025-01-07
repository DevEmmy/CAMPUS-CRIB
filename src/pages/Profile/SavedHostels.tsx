/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TitleHead from "../../components/Ui/TitleHead";
// import { Link } from "react-router";
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
    <main>
      <TitleHead title={`Saved Hostels`} />
      <section className="p-5 pt-20 flex flex-col gap-1">

      <div className="flex flex-col gap-3">
          {hostelList?.map((item: any, i: number) => (
            <div key={i} className="grid grid-cols-[2fr__3fr] gap-2 items-center">
              <div className="">
                <img src={item?.image} className="bg-xl" />
              </div>
              <div className="grow flex flex-col gap-1">
                <h3 className="text-dark font-semibold text-lg">
                  {item?.name}
                </h3>
                <div className="flex items-center text-dark/85 ">
                  <img src={locationImg} className="size-5" />
                  {item?.address}
                </div>

                <div>
                    <p className="text-variant-500 text-sm">{item?.description}..</p>
                </div>

                <div className="grid grid-cols-2">
                    <div className="flex gap-1 items-center">
                        <Eye size="18" color="#0E0F1D"/>
                        <p>{item?.views}</p>
                    </div>

                    <div className="flex gap-1 items-center">
                        <Heart size="18" color="#a00" variant="Bold"/>
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
