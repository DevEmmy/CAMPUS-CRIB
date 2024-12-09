/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import TitleHead from "../Ui/TitleHead";
import CustomInput from "../Reuseables/CustomInput";
import { CiCalendarDate } from "react-icons/ci";
import imageAdd from "/icons/image-add-01.svg";
import sent from "/icons/sent.svg";
import ImageUploading from "react-images-uploading";

const Step1 = () => {
  return (
    <div className="grid gap-2.5">
      <p className="text-dark/60 text-sm my-2">
        Tell us about the basics of your hostel
      </p>
      <CustomInput type="text" placeholder="Hostel name" onChange={() => {}} />
      <CustomInput
        type="text"
        placeholder="Address of the hostel"
        onChange={() => {}}
      />
      <CustomInput
        type="select"
        placeholder="Hostel Type"
        options={["a", "b", "c"]}
        onChange={() => {}}
      />
      <CustomInput
        type="textarea"
        placeholder="Describe your hostel (max 150 chararcters"
        options={["a", "b", "c"]}
        onChange={() => {}}
      />
    </div>
  );
};

const Step2 = () => {
  return (
    <div className="grid gap-2.5">
      <p className="text-dark/60 text-sm my-2">
        Provide details about the rooms in your hostel
      </p>
      <CustomInput
        type="select"
        placeholder="Number of Room Types"
        options={["a", "b", "c"]}
        onChange={() => {}}
      />
      <CustomInput type="number" placeholder="Room price" onChange={() => {}} />
      <div className="flex items-center justify-between mt-2">
        <p className="text-dark/70 fontsemibold">availability</p>
        <CiCalendarDate className="size-6 text-dark" />
      </div>

      <CustomInput
        type="toggle"
        placeholder="Room price"
        onChange={() => {}}
        notBordered
      />

      <div>
        <p className="text-dark/70 mb-2">amenities</p>
        <div className="flex flex-wrap gap-x-2">
          {["wifi", "air conditioning", "study desk", "ward-rope"].map(
            (item) => (
              <CustomInput
                key={item}
                type="checkbox"
                placeholder={item}
                onChange={() => {}}
                notBordered
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

const Step3 = () => {
  // const [media,setMedia] = useState();
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
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
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }: any) => (
          // write your building UI
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
                  PG, PNG (Max 10MB per image)
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

const Step4 = () => {
  return (
    <div>
      <Step1 />
      <Step2 />
      <Step3 />
    </div>
  );
};

const Step5 = () => {
  return (
    <section className="h-[80vh] w-full p-5 grid place-items-center">
      <div className="">
        <img src={sent} className="mx-auto" />

        <p className="mb-2.5 text-xl text-center">Submitted</p>
        <p className="text-[#7d8a9e] text-center my-3">
          Your listing has been submitted for review. We’ll notify you once it’s
          approved.
        </p>
        <button className="p-3 w-full bg-primary flex justify-center items-center rounded-lg text-white">
          <p>Go to home</p>
        </button>
      </div>
    </section>
  );
};

const CreateHostel = () => {
  const [step, setStep] = useState<number>(0);

  const create = () => {
    switch (step) {
      case 0:
        return <Step1 />;
        break;
      case 1:
        return <Step2 />;
        break;
      case 2:
        return <Step3 />;
        break;
      case 3:
        return <Step4 />;
      default:
        return <Step5 />;
        break;
    }
  };

  return (
    <main>
      <TitleHead title="" />
      <section className="mt-14 p-5">
        {step != 4 && (
          <h3 className="text-xl text-primary font-semibold">
            Create a Hostel
          </h3>
        )}
        {create()}

        {step != 4 && (
          <div className="flex items-center justify-between mt-6">
            {(step > 0 || step < 3) && (
              <button
                onClick={() => setStep((prev) => prev - 1)}
                className="w-1/2 py-2.5 border bg-[#E6CDBF] text-xs border-[#A64e1b] text-brown-500 rounded-lg mr-2"
              >
                back
              </button>
            )}
            {step < 4 && (
              <button
                onClick={() => (step < 4 ? setStep((prev) => prev + 1) : "")}
                className="w-1/2 p-3 bg-primary text-white text-xs rounded-lg"
              >
                {step < 3 ? "next" : "submit"}
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default CreateHostel;
