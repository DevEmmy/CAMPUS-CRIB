/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import TitleHead from "../Ui/TitleHead";
import CustomInput from "../Reuseables/CustomInput";
import { CiCalendarDate } from "react-icons/ci";
// import imageAdd from "/icons/image-add-01.svg";
// import sent from "/icons/sent.svg";
// import ImageUploading from "react-images-uploading";
import ButtonFileUploader from "../Reuseables/ButtonFileUploader";
import { createHostel } from "../../lib/fetchHostels";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router";
import { WhiteLoader } from "../Ui/Loader";
import { errorToast, successToast } from "oasis-toast";

const CreateHostel = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [formState, setFormState] = useState({
    hostelName: "",
    address: "",
    hostelType: "",
    hostelDesc: "",
    roomTypes: "",
    roomPrice: "",
    availability: true,
    amenities: [""],
    images: [""],
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
      // createPostFn(postData);

      const response = await createHostel(formState);
      console.log("Success:", response);
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

  // const [images, setImages] = useState([]);
  // const maxNumber = 69;

  // const onChange = (imageList: any) => {
  //   setImages(imageList);
  //   handleInputChange("images", imageList);
  // };

  const handleUploadComplete = (uploadUrls?: string[]) => {
    handleInputChange("images", uploadUrls);
    // Handle the uploaded file URLs if needed
    console.log("Files uploaded:", uploadUrls);
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
      value: formState?.address || "",
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
      value: formState?.hostelDesc || "",
      handleChange: handleChange,
    },
  ];

  const create = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-2.5">
            <p className="text-dark/60 text-sm my-2">
              Tell us about the basics of your hostel
            </p>
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
            <p className="text-dark/60 text-sm my-2">
              Provide details about the rooms in your hostel
            </p>
            <CustomInput
              value={formState?.roomTypes}
              name="roomTypes"
              type="select"
              placeholder="Number of Room Types"
              options={["1", "2", "3"]}
              handleChange={handleChange}
            />
            <CustomInput
              name="price"
              type="number"
              placeholder="Room price"
              value={formState?.roomPrice}
              handleChange={handleChange}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-dark/70 fontsemibold">Availability</p>
              <CiCalendarDate className="size-6 text-dark" />
            </div>
            <CustomInput
              value={formState?.availability}
              name="availability"
              type="toggle"
              placeholder="Availability"
              handleChecked={() =>
                setFormState({
                  ...formState,
                  availability: !formState?.availability,
                })
              }
              notBordered
            />
            <div>
              <p className="text-dark/70 mb-2">Amenities</p>
              <div className="flex flex-wrap gap-x-2">
                {["WiFi", "Air Conditioning", "Study Desk", "Wardrobe"].map(
                  (item) => (
                    <CustomInput
                      key={item}
                      name="amenities" // Use a fixed name for the group of amenities
                      type="checkbox"
                      placeholder={item}
                      value={formState.amenities.includes(item)} // Check if this amenity is selected
                      handleChecked={(e: ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        setFormState((prevState) => {
                          const updatedAmenities = checked
                            ? [...prevState.amenities, item]
                            : prevState.amenities.filter(
                                (amenity) => amenity !== item
                              );

                          return {
                            ...prevState,
                            amenities: updatedAmenities,
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
            <p className="text-dark/60 text-sm my-2">
              Upload high-quality images to attract more students
            </p>
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

            <ButtonFileUploader
              title="Upload"
              onUploadComplete={handleUploadComplete}
              multiple
            />
            <small className="text-dark text-[12px] leading-5 font-normal">
              JPG, PNG, PDF (Max size: 5MB).
            </small>

            <div className="flex gap-3 overflow-scroll py-4">
              {formState?.images &&
                formState?.images?.map((item, idx) => (
                  <div key={idx} className="relative">
                    <button
                      className="absolute -top-3 -right-2 p-1 rounded-full bg-red-500 text-white"
                      onClick={() => removeItem(idx)}
                    >
                      <HiX />
                    </button>
                    <img
                      className="min-w-[150px] h-[150px] rounded-lg object-cover"
                      src={item}
                    />
                  </div>
                ))}
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
      <section className="mt-14 p-5">
        {create()}
        <div className="flex items-center justify-between mt-6">
          {step > 0 && (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="w-1/2 py-2.5 border bg-[#E6CDBF] text-xs border-[#A64e1b] text-brown-500 rounded-lg mr-2"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              disabled={isLoading}
              onClick={
                step < 2
                  ? () => {
                      // setIsLoading(true);
                      setStep((prev) => prev + 1);
                    }
                  : () => {
                      setIsLoading(true);

                      handleSubmit();
                    }
              }
              className="w-1/2 p-3 bg-primary text-white text-xs rounded-lg"
            >
              {step < 2 ? "Next" : isLoading ? <WhiteLoader /> : "Submit"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default CreateHostel;
