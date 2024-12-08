import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const HotelCard = ({ image, title, address} : any) => {
  return (
    <div className="bg-white rounded-2xl py-3 overflow-hidden max-w-sm">
      <div className="relative">
        <img
          src={image}
          alt="Aerial view of a large hotel complex surrounded by greenery"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
          <i className="fas fa-heart text-gray-500"></i>
        </div>
      </div>
      <div className="py-3">
        <h2 className="text-lg font-semibold text-left">{title}</h2>
        <p className="text-gray-600 flex items-center mt-2">
          <i className="fas fa-map-marker-alt mr-2"></i>
          {address}
        </p>
      </div>
    </div>
  );
}

const MyCarousel = () => {
  const cards = [
    {
      image: "https://placehold.co/600x400",
      title: "Aspire Stay Inn",
      address: "123 Harmony Estate",
    },
    {
      image: "https://placehold.co/600x400",
      title: "Aspire Stay Inn",
      address: "123 Harmony Estate",
    },
    {
      image: "https://placehold.co/600x400",
      title: "Aspire Stay Inn",
      address: "123 Harmony Estate",
    },
    {
      image: "https://placehold.co/600x400",
      title: "Aspire Stay Inn",
      address: "123 Harmony Estate",
    },
  ];

  return (
    <div>
        <h2 className="font-semibold text-lg">Best deals</h2>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        centerMode={false}
        className="items-start justify-start h-fit lg:w-4/5 mx-auto pb-10"
      >
        {cards.map((card, index) => (
          <HotelCard
            key={index}
            image={card.image}
            title={card.title}
            address={card.address}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
