/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import mapMarker from "/icons/location.svg";
import { IoIosHeartEmpty } from "react-icons/io";

interface HostelCardProps {
  image: string;
  title: string;
  address: string;
  desc?: string;
  isFlex?: boolean;
}

const HotelCard = ({
  image,
  title,
  address,
  desc,
  isFlex,
}: HostelCardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl py-3 overflow-hidden max-w-sm pb-7 ${
        isFlex && "grid grid-cols-2 gap-x-1 items-center"
      }`}
    >
      <div className="relative">
        <img
          src={image}
          alt="Aerial view of a large hotel complex surrounded by greenery"
          className="w-full h-48 object-cover rounded-xl"
        />
        <div className="absolute top-2 right-2 bg-white/80 rounded-full p-2 shadow-md">
          {/* <i className="fas fa-heart text-gray-500"></i> */}
          <IoIosHeartEmpty className="size-5" />
        </div>
      </div>
      <div className="py-3">
        <h2 className="text-lg font-semibold text-left">{title}</h2>
        <div className=" text-dark flex items-center text-left gap-1 justify-start mt-2 ">
          <div>
            <img src={mapMarker} className="size-5" />
          </div>
          <p className="text-left text-[15px]">{address}</p>
        </div>
        <p className="text-sm text-variant-500 text-left">
          {desc && desc.slice(0, 30)}
        </p>
      </div>
    </div>
  );
};

const SearchCarousel = () => {
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
    <>
      <div>
        <h2 className="font-semibold text-base">Popular</h2>

        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          centerMode={false}
          className="items-start justify-start h-fit lg:w-4/5 mx-auto pb-2"
        >
          {cards.map((card, index) => (
            <HotelCard
              key={index}
              image={card.image}
              title={card.title}
              address={card.address}
              desc="Lorem ipsum dolor sit aro rem non dolore pariatur aliquid quae. Repellat, ipsa placeat temporibus libero in eum, at minus culpa cumque odit reprehenderit!"
              isFlex
            />
          ))}
          
        </Carousel>
      </div>

      <div>
        <h2 className="font-semibold text-base">Hostel near city university</h2>
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
    </>
  );
};

export default SearchCarousel;
