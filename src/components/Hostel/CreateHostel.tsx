/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TitleHead from "../Ui/TitleHead";
import CustomInput from "../Reuseables/CustomInput";
import { CiCalendarDate } from "react-icons/ci";
import imageAdd from "/icons/image-add-01.svg";
// import sent from "/icons/sent.svg";
import ImageUploading from "react-images-uploading";

const CreateHostel = () => {
  const [step, setStep] = useState<number>(0);
  const [formState, setFormState] = useState({
    hostelName: "",
    address: "",
    hostelType: "",
    description: "",
    roomTypes: "",
    roomPrice: "",
    availability: false,
    amenities: [],
    images: [],
  });

  console.log(formState)

  const handleInputChange = (name: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Step1 = () => (
    <div className="grid gap-2.5">
      <p className="text-dark/60 text-sm my-2">
        Tell us about the basics of your hostel
      </p>
      <CustomInput
        type="text"
        placeholder="Hostel name"
        onChange={(value: any) => handleInputChange("hostelName", value)}
      />
      <CustomInput
        type="text"
        placeholder="Address of the hostel"
        onChange={(value: any) => handleInputChange("address", value)}
      />
      <CustomInput
        type="select"
        placeholder="Hostel Type"
        options={["Type A", "Type B", "Type C"]}
        onChange={(value: any) => handleInputChange("hostelType", value)}
      />
      <CustomInput
        type="textarea"
        placeholder="Describe your hostel (max 150 characters)"
        onChange={(value: any) => handleInputChange("description", value)}
      />
    </div>
  );

  const Step2 = () => (
    <div className="grid gap-2.5">
      <p className="text-dark/60 text-sm my-2">
        Provide details about the rooms in your hostel
      </p>
      <CustomInput
        type="select"
        placeholder="Number of Room Types"
        options={["1", "2", "3"]}
        onChange={(value: any) => handleInputChange("roomTypes", value)}
      />
      <CustomInput
        type="number"
        placeholder="Room price"
        onChange={(value: any) => handleInputChange("roomPrice", value)}
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-dark/70 fontsemibold">Availability</p>
        <CiCalendarDate className="size-6 text-dark" />
      </div>
      <CustomInput
        type="toggle"
        placeholder="Availability"
        onChange={(value: any) => handleInputChange("availability", value)}
        notBordered
      />
      <div>
        <p className="text-dark/70 mb-2">Amenities</p>
        <div className="flex flex-wrap gap-x-2">
          {["WiFi", "Air Conditioning", "Study Desk", "Wardrobe"].map((item) => (
            <CustomInput
              key={item}
              type="checkbox"
              placeholder={item}
              onChange={(checked: any) => {
                setFormState((prev : any) => ({
                  ...prev,
                  amenities: checked
                    ? [...prev.amenities, item]
                    : prev.amenities.filter((amenity : any) => amenity !== item),
                }));
              }}
              notBordered
            />
          ))}
        </div>
      </div>
    </div>
  );

  const Step3 = () => {
    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const onChange = (imageList: any) => {
      setImages(imageList);
      handleInputChange("images", imageList);
    };

    return (
      <div className="grid gap-2.5">
        <p className="text-dark/60 text-sm my-2">
          Upload high-quality images to attract more students
        </p>
        <ImageUploading
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
        </ImageUploading>
      </div>
    );
  };

  const create = () => {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
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
              onClick={() => setStep((prev) => prev + 1)}
              className="w-1/2 p-3 bg-primary text-white text-xs rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default CreateHostel;
