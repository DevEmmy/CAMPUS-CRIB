/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import TitleHead from "../Ui/TitleHead";
import CustomInput from "../Reuseables/CustomInput";
import { ArrowLeft, ArrowRight, Calendar, CloseCircle } from "iconsax-react";
import ButtonFileUploader from "../Reuseables/ButtonFileUploader";
import { createHostel } from "../../lib/fetchHostels";
import { useNavigate } from "react-router";
import { WhiteLoader } from "../Ui/Loader";
import { errorToast, successToast } from "oasis-toast";

const CreateHostel = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const totalSteps = 3;
  const [formState, setFormState] = useState({
    hostelName: "",
    location: "", // Changed from address to match interface
    hostelType: "",
    description: "", // Changed from hostelDesc to match interface
    price: "", // Changed from roomPrice to match interface
    availableRooms: "", // Added to match interface
    isAvailable: true, // Changed from availability to match interface
    features: [] as string[], // Changed from amenities to match interface
    images: [] as string[],
  });

  // Handle form field change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const removeItem = (index: number) => {
    setFormState((prevState) => {
      // Create a new array without the item at the specified index
      const updatedImages = [
        ...prevState.images.slice(0, index),
        ...prevState.images.slice(index + 1),
      ];

      // Return the updated state with the new images array
      return {
        ...prevState,
        images: updatedImages,
      };
    });
  };

  const handleInputChange = (name: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Transform formState to match the expected interface
      // const hostelData = {
      //   hostelName: formState.hostelName,
      //   hostelType: formState.hostelType,
      //   address: formState.location, // Map location to address
      //   hostelDesc: formState.description, // Map description to hostelDesc
      //   roomTypes: formState.availableRooms, // Map availableRooms to roomTypes
      //   roomPrice: formState.price, // Map price to roomPrice
      //   availability: formState.isAvailable, // Map isAvailable to availability
      //   amenities: formState.features, // Map features to amenities
      //   images: formState.images,
      // };
      
      const response = await createHostel(formState);
      if (response.status == 200) {
        successToast("Hostel created successfully",'');
        navigate("/");
      } else { 
        errorToast("An error occurred", "Invalid form data");
      }
      return;
    } catch (error) {
      errorToast("An error occurred", "Invalid form data");
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const canProceedToNextStep = () => {
    switch (step) {
      case 0:
        const step0Valid = formState.hostelName && formState.location && formState.hostelType;
        return step0Valid;
      case 1:
        const step1Valid = formState.availableRooms && formState.price;
        return step1Valid;
      case 2:
        return true; // Allow proceeding even without images
      default:
        return true;
    }
  };

  // const [images, setImages] = useState([]);
  // const maxNumber = 69;

  // const onChange = (imageList: any) => {
  //   setImages(imageList);
  //   handleInputChange("images", imageList);
  // };

  const handleUploadComplete = (uploadUrls?: string[]) => {
    handleInputChange("images", uploadUrls);
    // Handle the uploaded file URLs if needed
  };

  const step1 = [
    {
      type: "text",
      name: "hostelName",
      placeholder: "Hostel name",
      value: formState?.hostelName || "",
      handleChange: handleChange,
    },
    {
      type: "text",
      name: "location",
      placeholder: "Address of the hostel",
      value: formState?.location || "",
      handleChange: handleChange,
    },
    {
      type: "select",
      name: "hostelType",
      placeholder: "Hostel Type",
      value: formState?.hostelType || "",
      options: ["SINGLE_ROOMS", "SHARED_ROOMS", "APARTMENTS", "SUITES"],
      handleChange: handleChange,
    },
    {
      type: "textarea",
      name: "description",
      placeholder: "Describe your hostel (max 150 characters)",
      value: formState?.description || "",
      handleChange: handleChange,
    },
  ];

  const create = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-2.5">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-dark mb-2">Basic Information</h2>
              <p className="text-dark/60 text-sm">
                Tell us about the basics of your hostel
              </p>
            </div>
            {step1?.map((item: any, i: number) => (
              <CustomInput
                key={i}
                type={item?.type}
                name={item?.name}
                placeholder={item?.placeholder}
                value={item?.value}
                options={item?.options} // Only applicable for select inputs
                handleChange={item?.handleChange}
                
              />
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid gap-2.5">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-dark mb-2">Room Details</h2>
              <p className="text-dark/60 text-sm">
                Provide details about the rooms in your hostel
              </p>
            </div>
            <CustomInput
              value={formState?.availableRooms}
              name="availableRooms"
              type="select"
              placeholder="Number of Available Rooms"
              options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              handleChange={handleChange}
            />
            <CustomInput
              name="price"
              type="number"
              placeholder="Room price"
              value={formState?.price}
              handleChange={handleChange}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-dark/70 font-semibold">Availability</p>
              <Calendar size={24} className="text-dark" />
            </div>
            <CustomInput
              value={formState?.isAvailable}
              name="isAvailable"
              type="toggle"
              placeholder="Availability"
              handleChecked={() =>
                setFormState({
                  ...formState,
                  isAvailable: !formState?.isAvailable,
                })
              }
              notBordered
            />
            <div>
              <p className="text-dark/70 mb-2">Features</p>
              <div className="flex flex-wrap gap-x-2">
                {["WiFi", "Air Conditioning", "Study Desk", "Wardrobe"].map(
                  (item) => (
                    <CustomInput
                      key={item}
                      name="features" // Use a fixed name for the group of features
                      type="checkbox"
                      placeholder={item}
                      value={formState.features.includes(item)} // Check if this feature is selected
                      handleChecked={(e: ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        setFormState((prevState) => {
                          const updatedFeatures = checked
                            ? [...prevState.features, item]
                            : prevState.features.filter(
                                (feature: string) => feature !== item
                              );

                          return {
                            ...prevState,
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
          </div>
        );
      case 2:
        return (
          <div className="grid gap-2.5">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-dark mb-2">Upload Images</h2>
              <p className="text-dark/60 text-sm">
                Upload high-quality images to attract more students
              </p>
            </div>
            {/* <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, isDragging, dragProps }) => (
                <div className="upload__image-wrapper">
                  <button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    className="w-full"
                  >
                    <div className="rounded-lg border border-primary p-4 border-lg grid place-items-center">
                      <img src={imageAdd} className="size-6 mb-3" />
                      <button
                        type="button"
                        className="capitalize bg-primary my-2 text-white p-3 rounded-lg disabled:bg-primary/60"
                        disabled
                      >
                        Upload from gallery
                      </button>
                      <p className="text-dark/60 text-xs ">
                        JPG, PNG (Max 10MB per image)
                      </p>
                    </div>
                  </button>
                  <div className="grid grid-cols-3 gap-1 my-2">
                    {imageList.map((image, index) => (
                      <img
                        key={index}
                        src={image.data_url}
                        className="w-full rounded-lg h-24 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading> */}

            <div className="space-y-4">
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

              {/* Uploaded Images Grid */}
              {formState?.images && formState?.images?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Uploaded Images ({formState.images.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formState.images.map((item, idx) => (
                      <div key={idx} className="relative group">
                        <button
                          className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                          onClick={() => removeItem(idx)}
                        >
                          <CloseCircle size={14} />
                        </button>
                        <img
                          className="w-full h-32 rounded-lg object-cover shadow-sm hover:shadow-md transition-shadow"
                          src={item}
                          alt={`Hostel image ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {(!formState?.images || formState?.images?.length === 0) && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">
                    No images uploaded yet. Upload some images to showcase your hostel.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <div>Thank you for submitting!</div>;
    }
  };

  return (
    <main>
      <TitleHead title="Create Hostel" />
      
      {/* Progress Bar */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {step + 1} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((step + 1) / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className={`text-xs ${step >= 0 ? 'text-primary font-medium' : 'text-gray-400'}`}>
            Basic Info
          </span>
          <span className={`text-xs ${step >= 1 ? 'text-primary font-medium' : 'text-gray-400'}`}>
            Room Details
          </span>
          <span className={`text-xs ${step >= 2 ? 'text-primary font-medium' : 'text-gray-400'}`}>
            Images
          </span>
        </div>
      </div>
      
      <section className="mt-6 p-5">
        {create()}
        <div className="flex items-center justify-between mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="flex-1 py-3 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg mr-3 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
          {step < 3 && (
            <button
              disabled={isLoading || !canProceedToNextStep()}
              onClick={
                step < 2
                  ? () => {
                      setStep((prev) => prev + 1);
                    }
                  : () => {
                      setIsLoading(true);
                      handleSubmit();
                    }
              }
              className={`flex-1 py-3 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isLoading || !canProceedToNextStep()
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 text-white'
              }`}
            >
              {step < 2 ? (
                <>
                  Next
                  <ArrowRight size={16} />
                </>
              ) : isLoading ? (
                <WhiteLoader />
              ) : (
                "Create Hostel"
              )}
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default CreateHostel;
