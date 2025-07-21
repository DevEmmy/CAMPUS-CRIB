import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchHostelById, updateHostel } from "../../lib/fetchHostels";
import { ArrowLeft, Save2, Trash } from "iconsax-react";
import { errorToast, successToast } from "oasis-toast";
import CustomInput from "../../components/Reuseables/CustomInput";
import ButtonFileUploader from "../../components/Reuseables/ButtonFileUploader";
import { WhiteLoader } from "../../components/Ui/Loader";

const EditHostel = () => {
  const { hostelId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { data: hostel, isLoading: isFetching } = useQuery({
    queryKey: ["hostel", hostelId],
    queryFn: () => fetchHostelById(hostelId as string),
  });

  const [formState, setFormState] = useState({
    hostelName: "",
    location: "",
    hostelType: "",
    description: "",
    price: "",
    availableRooms: "",
    isAvailable: true,
    features: [] as string[],
    images: [] as string[],
  });

  // Pre-fill form when hostel data is loaded
  useEffect(() => {
    if (hostel) {
      setFormState({
        hostelName: hostel.hostelName || "",
        location: hostel.location || "",
        hostelType: hostel.hostelType || "",
        description: hostel.description || "",
        price: hostel.price?.toString() || "",
        availableRooms: hostel.availableRooms?.toString() || "",
        isAvailable: hostel.isAvailable ?? true,
        features: hostel.features || [],
        images: hostel.images || [],
      });
    }
  }, [hostel]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeImage = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleUploadComplete = (uploadUrls?: string[]) => {
    if (uploadUrls) {
      setFormState((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadUrls],
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Transform formState to match the expected interface
    //   const hostelData = {
    //     hostelName: formState.hostelName,
    //     hostelType: formState.hostelType,
    //     address: formState.location,
    //     hostelDesc: formState.description,
    //     roomTypes: formState.availableRooms,
    //     roomPrice: formState.price,
    //     availability: formState.isAvailable,
    //     amenities: formState.features,
    //     images: formState.images,
    //   };

      const response = await updateHostel(hostelId as string, formState);
      
      if (response.status === 200) {
        successToast("Hostel updated successfully", "");
        navigate(`/hostels/agent/${hostelId}`);
      } else {
        errorToast("Failed to update hostel", "Please try again");
      }
    } catch (error) {
      errorToast("An error occurred", "Failed to update hostel");
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  if (isFetching) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hostel Not Found</h2>
          <p className="text-gray-600 mb-4">The hostel you're trying to edit doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? <WhiteLoader /> : <Save2 size={16} />}
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-dark">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              type="text"
              name="hostelName"
              placeholder="Hostel name"
              value={formState.hostelName}
              handleChange={handleChange}
            />
            
            <CustomInput
              type="text"
              name="location"
              placeholder="Address of the hostel"
              value={formState.location}
              handleChange={handleChange}
            />
            
            <CustomInput
              type="select"
              name="hostelType"
              placeholder="Hostel Type"
              value={formState.hostelType}
              options={["SINGLE_ROOMS", "SHARED_ROOMS", "APARTMENTS", "SUITES"]}
              handleChange={handleChange}
            />
            
            <CustomInput
              type="number"
              name="price"
              placeholder="Room price"
              value={formState.price}
              handleChange={handleChange}
            />
          </div>
          
          <CustomInput
            type="textarea"
            name="description"
            placeholder="Describe your hostel (max 150 characters)"
            value={formState.description}
            handleChange={handleChange}
          />
        </div>

        {/* Room Details */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-dark">Room Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              type="select"
              name="availableRooms"
              placeholder="Number of Available Rooms"
              value={formState.availableRooms}
              options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              handleChange={handleChange}
            />
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <span className="text-gray-700">Availability</span>
              <CustomInput
                type="toggle"
                name="isAvailable"
                value={formState.isAvailable}
                handleChecked={() =>
                  setFormState(prev => ({
                    ...prev,
                    isAvailable: !prev.isAvailable,
                  }))
                }
                placeholder="Availability"
                notBordered
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-dark">Features</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["WiFi", "Air Conditioning", "Study Desk", "Wardrobe", "Kitchen", "Laundry", "Security", "Parking"].map(
              (feature) => (
                <CustomInput
                  key={feature}
                  name="features"
                  type="checkbox"
                  placeholder={feature}
                  value={formState.features.includes(feature)}
                  handleChecked={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { checked } = e.target;
                    setFormState((prev) => {
                      const updatedFeatures = checked
                        ? [...prev.features, feature]
                        : prev.features.filter((f: string) => f !== feature);

                      return {
                        ...prev,
                        features: updatedFeatures,
                      };
                    });
                  }}
                  notBordered
                />
              )
            )}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-dark">Images</h2>
          
          {/* Current Images */}
          {formState.images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Current Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formState.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <button
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                      onClick={() => removeImage(index)}
                    >
                      <Trash size={14} />
                    </button>
                    <img
                      src={image}
                      alt={`Hostel image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload New Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Add More Images</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <ButtonFileUploader
                title="Upload Images"
                onUploadComplete={handleUploadComplete}
                multiple
              />
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG, PDF (Max size: 5MB)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditHostel; 