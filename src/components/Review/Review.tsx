import { useState } from "react";
import RatingSystem from "../Reuseables/RatingSystem";
import { useNavigate } from "react-router";

import successful from '/icons/successTick.svg';
import { RiCloseLine } from "react-icons/ri";

const Review = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleRatingChange = (rating) => {
    console.log(`Selected rating: ${rating}`);
  };

  const handleSubmit = () => {
      setIsSubmitted(true);
  }
  return (
    <div className="p-5">
      <button className="border border-primary rounded-lg">
        <RiCloseLine className="size-8  text-primary" />
      </button>
      <div className="grid place-items-center text-center h-[90vh]">
        <div className="flex flex-col gap-4">
          {
            isSubmitted &&  <img src={successful} alt="Successful" className="size-20 mx-auto" /> 
          }
          <p className={`text-xl text-dark font-semibold`}>
            {isSubmitted
              ? "Thank you for your review!"
              : "How would you rate your overall experience?"}
          </p>
          <p className="text-[#64748B]">
            {isSubmitted
              ? "Your feedback helps us improve and helps others make better choices."
              : "Please take a moment to rate and review.."}
          </p>
          {!isSubmitted && (
            <RatingSystem totalStars={5} onRatingChange={handleRatingChange} otherStyles='justify-center my-3' />
          )}
          <button 
            onClick={() => (!isSubmitted ? handleSubmit() : navigate(-1))}
          className="w-full p-4 bg-primary text-white text-sm rounded-lg">
            {isSubmitted ? "Back to home." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
