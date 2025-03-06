import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatPrice } from "../../utils/formatPrice";
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
  const [selectedRoom, setSelectedRoom] = useState<"single" | "shared">(
    "single"
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availability, setAvailability] = useState<
    "Available Now" | "Available in"
  >("Available Now");
  const [availableDate, setAvailableDate] = useState<Date | null>(null);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);
  const maxPrice = 1000000;

  const calculatePercentage = (value: number) => {
    return (value / maxPrice) * 100;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    const isMin = e.target.dataset.thumb === "min";
    console.log(isDragging);
    console.log(activeThumb);

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

  const handleInputChange = (index: number, value: string) => {
    // Remove non-numeric characters
    const newValue = value.replace(/\D/g, "");
  
    // Allow empty input for controlled input behavior
    if (newValue === "") {
      setPriceRange((prev) => (index === 0 ? [0, prev[1]] : [prev[0], 0]));
      return;
    }
  
    const parsedValue = parseInt(newValue, 10);
  
    // Ensure min is always <= max and max is within allowed range
    if (index === 0) {
      setPriceRange([Math.min(parsedValue, priceRange[1]), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(0, Math.min(parsedValue, maxPrice))]);
    }
    console.log("Updated Price Range:", priceRange);
  };
  

  // Handle room type selection
  const handleRoomTypeSelect = (type: "single" | "shared") => {
    setSelectedRoom(type); // Update the selected room type
  };

  // Handle amenity selection
  const handleAmenitySelect = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Handle availability selection
  const handleAvailabilitySelect = (
    option: "Available Now" | "Available in"
  ) => {
    setAvailability(option);
    if (option !== "Available in") {
      setAvailableDate(null); // Reset date if not "Available in"
    }
  };
  const handleApplyFilters = () => {
    const filters = {
      location: selectedLocation,
      priceRange: priceRange, // No need to spread, use directly
      roomTypes: selectedRoom,  
      amenities: selectedAmenities,
      availability,
      availableDate,
    };
    console.log("Applied Filters:", filters); // Debugging log
    onApplyFilters(filters);
    onClose();
  };
  
  

  // Handle filter reset
  const handleResetFilters = () => {
    setSelectedLocation("");
    setPriceRange([0, 1000000]); // Reset to default price range
    setSelectedRoom("single"); // Reset room type
    setSelectedAmenities([]); // Clear all selected amenities
    setAvailability("Available Now"); // Reset availability filter
    setAvailableDate(null); // Reset available date
  
    // Apply the reset filters
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
    <div className="pb-20">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Location
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Your Location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B85A6]"
          />
          <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-500"></i>
        </div>
      </div>

      <div className="w-full p-4">
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Price Range</h2>

          <div className="relative pt-8">
            {/* Price Label */}
            <div
              className="absolute -top-2 transform -translate-x-1/2 z-10"
              style={{ left: `${calculatePercentage(priceRange[1])}%` }}
            >
              <div className="bg-primary text-white px-3 py-1 rounded text-sm">
                {formatPrice(priceRange[1])}
              </div>
            </div>

            {/* Slider Track */}
            <div className="relative h-2 bg-gray-200 rounded-full">
              {/* Active Track */}
              <div
                className="absolute h-full bg-primary rounded-full"
                style={{
                  left: `${calculatePercentage(priceRange[0])}%`,
                  right: `${100 - calculatePercentage(priceRange[1])}%`,
                }}
              />

              {/* Min Thumb */}
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[0]}
                data-thumb="min"
                onChange={handleSliderChange}
                onMouseDown={() => {
                  setIsDragging(true);
                  setActiveThumb("min");
                }}
                onMouseUp={() => {
                  setIsDragging(false);
                  setActiveThumb(null);
                }}
                className="absolute top-1 w-full h-2 appearance-none bg-transparent pointer-events-none"
                style={{
                  WebkitAppearance: "none",
                }}
              />

              {/* Max Thumb */}
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                data-thumb="max"
                onChange={handleSliderChange}
                onMouseDown={() => {
                  setIsDragging(true);
                  setActiveThumb("max");
                }}
                onMouseUp={() => {
                  setIsDragging(false);
                  setActiveThumb(null);
                }}
                className="absolute top-1 w-full h-2 appearance-none bg-transparent pointer-events-none"
                style={{
                  WebkitAppearance: "none",
                }}
              />
            </div>
          </div>

          {/* Input Fields */}
          <div className="flex gap-4">
          <input
  type="text"
  value={priceRange[0]}
  onChange={(e) => handleInputChange(0, e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
  placeholder="₦0"
/>
<input
  type="text"
  value={priceRange[1]}
  onChange={(e) => handleInputChange(1, e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
  placeholder="₦1,000,000"
/>

          </div>
        </div>
        <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border: 2px solid #A64E1B;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          margin-top: -7px;
        }
        
        input[type='range']::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: white;
          border: 2px solid #A64E1B;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
        }
      `}</style>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Room Type
        </label>
        <div className="flex space-x-2">
          <button
            className={`w-1/2 px-3 py-2 rounded-md ${
              selectedRoom === "single"
                ? "bg-primary text-white"
                : "bg-white border"
            }`}
            onClick={() => handleRoomTypeSelect("single")}
          >
            Single Room
          </button>
          <button
            className={`w-1/2 px-3 py-2 rounded-md ${
              selectedRoom === "shared"
                ? "bg-primary text-white"
                : "bg-white border"
            }`}
            onClick={() => handleRoomTypeSelect("shared")}
          >
            Shared Room
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Amenities
        </label>
        <div className="flex space-x-2 flex-wrap">
          <button
            className={`px-3 py-2 border rounded-md ${
              selectedAmenities.includes("Wi-Fi") ? "bg-primary text-white" : ""
            }`}
            onClick={() => handleAmenitySelect("Wi-Fi")}
          >
            Wi-Fi
          </button>
          <button
            className={`px-3 py-2 border rounded-md ${
              selectedAmenities.includes("Laundry")
                ? "bg-primary text-white"
                : ""
            }`}
            onClick={() => handleAmenitySelect("Laundry")}
          >
            Laundry
          </button>
          <button
            className={`px-3 py-2 border rounded-md ${
              selectedAmenities.includes("24/7 Security")
                ? "bg-primary text-white"
                : ""
            }`}
            onClick={() => handleAmenitySelect("24/7 Security")}
          >
            24/7 Security
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Availability
        </label>
        <div className="flex space-x-2">
          <div className="flex items-center justify-between space-x-2 p-3">
            <button
              className={`w-1/2 px-3 py-2 border rounded-md text-nowrap ${
                availability === "Available Now" ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleAvailabilitySelect("Available Now")}
            >
              Available Now
            </button>
            <button
              className={`w-1/2 px-3 py-2 border rounded-md text-nowrap ${
                availability === "Available in" ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleAvailabilitySelect("Available in")}
            >
              Available in
            </button>
          </div>
        </div>
        <div className="p-3">
          {/* Show Date Picker only if "Available in" is selected */}
          {availability === "Available in" && (
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select a Date
              </label>
              <DatePicker
                selected={availableDate}
                onChange={(date: Date | null) => setAvailableDate(date)} // Update date when user picks one
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholderText="Select a date"
                dateFormat="yyyy/MM/dd"
              />
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleResetFilters}
            className="w-1/2 p-3 bg-[#E6CDBF] text-primary font-semibold leading-5 text-[14px] rounded-md"
          >
            Reset Filters
          </button>
          <button
            onClick={handleApplyFilters}
            className="w-1/2 p-3 bg-primary text-white font-semibold leading-5 text-[14px] rounded-md"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
