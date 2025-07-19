import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatPrice } from "../../utils/formatPrice";
import { Location, Wifi, Shield, Calendar } from "iconsax-react";

const Filter = ({
  onClose,
  onApplyFilters,
}: {
  onClose: () => void;
  onApplyFilters: (newFilters: {
    location: string;
    priceRange: number[];
    roomTypes: string;
    amenities: string[];
    availability: string;
    availableDate: Date | null;
  }) => void;
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<"single" | "shared">("single");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availability, setAvailability] = useState<"Available Now" | "Available in">("Available Now");
  const [availableDate, setAvailableDate] = useState<Date | null>(null);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const maxPrice = 1000000;

  const calculatePercentage = (value: number) => {
    return (value / maxPrice) * 100;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    const isMin = e.target.dataset.thumb === "min";

    if (isMin) {
      if (value <= priceRange[1]) {
        setPriceRange([value, priceRange[1]]);
      }
    } else {
      if (value >= priceRange[0]) {
        setPriceRange([priceRange[0], value]);
      }
    }
  };

  // const handleRoomTypeSelect = (type: "single" | "shared") => {
  //   setSelectedRoom(type);
  // };

  const handleAmenitySelect = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleAvailabilitySelect = (option: "Available Now" | "Available in") => {
    setAvailability(option);
    if (option !== "Available in") {
      setAvailableDate(null);
    }
  };

  const handleApplyFilters = () => {
    const filters = {
      location: selectedLocation,
      priceRange: priceRange,
      roomTypes: selectedRoom,
      amenities: selectedAmenities,
      availability,
      availableDate,
    };
    onApplyFilters(filters);
    onClose();
  };

  const handleResetFilters = () => {
    setSelectedLocation("");
    setPriceRange([0, 1000000]);
    setSelectedRoom("single");
    setSelectedAmenities([]);
    setAvailability("Available Now");
    setAvailableDate(null);

    onApplyFilters({
      location: "",
      priceRange: [0, 1000000],
      roomTypes: "",
      amenities: [],
      availability: "Available Now",
      availableDate: null,
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Location */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-dark">
          Location
        </label>
        <div className="relative">
          <Location size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter location..."
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-dark">
          Price Range
        </label>

        <div className="relative pt-6">
          <div
            className="absolute -top-2 transform -translate-x-1/2 z-10"
            style={{ left: `${calculatePercentage(priceRange[1])}%` }}
          >
            <div className="bg-primary text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
              {formatPrice(priceRange[1])}
            </div>
          </div>

          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-full bg-primary rounded-full"
              style={{
                left: `${calculatePercentage(priceRange[0])}%`,
                right: `${100 - calculatePercentage(priceRange[1])}%`,
              }}
            />

            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[0]}
              data-thumb="min"
              onChange={handleSliderChange}
              className="absolute top-1 w-full h-2 appearance-none bg-transparent pointer-events-none"
              style={{ WebkitAppearance: "none" }}
            />

            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[1]}
              data-thumb="max"
              onChange={handleSliderChange}
              className="absolute top-1 w-full h-2 appearance-none bg-transparent pointer-events-none"
              style={{ WebkitAppearance: "none" }}
            />
          </div>
        </div>

        {/* <div className="flex gap-3">
          <input
            type="text"
            value={priceRange[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            placeholder="₦0"
          />
          <input
            type="text"
            value={priceRange[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            placeholder="₦1,000,000"
          />
        </div> */}
      </div>

      {/* Room Type */}
      {/* <div className="space-y-3">
        <label className="block text-sm font-semibold text-dark">
          Room Type
        </label>
        <div className="flex gap-3">
          <button
            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
              selectedRoom === "single"
                ? "bg-primary border-primary text-white shadow-lg"
                : "border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-primary/5"
            }`}
            onClick={() => handleRoomTypeSelect("single")}
          >
            Single Room
          </button>
          <button
            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
              selectedRoom === "shared"
                ? "bg-primary border-primary text-white shadow-lg"
                : "border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-primary/5"
            }`}
            onClick={() => handleRoomTypeSelect("shared")}
          >
            Shared Room
          </button>
        </div>
      </div> */}

      {/* Amenities */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-dark">
          Amenities
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200 ${
              selectedAmenities.includes("Wi-Fi") 
                ? "bg-primary border-primary text-white" 
                : "border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-primary/5"
            }`}
            onClick={() => handleAmenitySelect("Wi-Fi")}
          >
            <Wifi size={16} />
            <span className="text-sm font-medium">Wi-Fi</span>
          </button>
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200 ${
              selectedAmenities.includes("Laundry") 
                ? "bg-primary border-primary text-white" 
                : "border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-primary/5"
            }`}
            onClick={() => handleAmenitySelect("Laundry")}
          >
            <span className="text-sm font-medium">Laundry</span>
          </button>
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200 ${
              selectedAmenities.includes("24/7 Security") 
                ? "bg-primary border-primary text-white" 
                : "border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-primary/5"
            }`}
            onClick={() => handleAmenitySelect("24/7 Security")}
          >
            <Shield size={16} />
            <span className="text-sm font-medium">24/7 Security</span>
          </button>
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-dark">
          Availability
        </label>
        <div className="flex gap-3">
          <button
            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
              availability === "Available Now" 
                ? "bg-primary border-primary text-white shadow-lg" 
                : "border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-primary/5"
            }`}
            onClick={() => handleAvailabilitySelect("Available Now")}
          >
            Available Now
          </button>
          <button
            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
              availability === "Available in" 
                ? "bg-primary border-primary text-white shadow-lg" 
                : "border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-primary/5"
            }`}
            onClick={() => handleAvailabilitySelect("Available in")}
          >
            Available in
          </button>
        </div>

        {availability === "Available in" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Select Date
            </label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <DatePicker
                selected={availableDate}
                onChange={(date: Date | null) => setAvailableDate(date)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                placeholderText="Select a date"
                dateFormat="MMM dd, yyyy"
                minDate={new Date()}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={handleResetFilters}
          className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
        >
          Reset Filters
        </button>
        <button
          onClick={handleApplyFilters}
          className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-custom"
        >
          Apply Filters
        </button>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border: 3px solid #A64E1B;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          margin-top: -9px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border: 3px solid #A64E1B;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default Filter;
