import { useEffect, useState } from "react";
import RatingSystem from "../Reuseables/RatingSystem";
import { useNavigate, useParams } from "react-router";

import successful from "/icons/successTick.svg";
import { RiCloseLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { sendReview } from "../../utils/reviews";

const Review = () => {
  const navigate = useNavigate();
  const {hostelId: hostel} = useParams()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>()
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (comment && rating !== null) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [comment, rating]);

  const handleRatingChange = (rating: any) => {
    console.log(`Selected rating: ${rating}`);
    setRating(rating);
  };

  const mutation = useMutation({
    mutationKey: ["review"],
    mutationFn: async () => sendReview(comment, rating as number, hostel as string),
  });

  const handleSubmit = () => {
    setIsSubmitted(true);
    mutation.mutate();
    // setComment("");
    // setRating(null);
  };

  return (
    <div className="p-5">
      <button onClick={() => navigate(-1)} className="border border-primary rounded-lg">
        <RiCloseLine className="size-8  text-primary" />
      </button>
      <div className="grid place-items-center text-center h-[90vh]">
        <div className="flex flex-col gap-4">
          {isSubmitted && (
            <img
              src={successful}
              alt="Successful"
              className="size-20 mx-auto"
            />
          )}
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
            <RatingSystem
              totalStars={5}
              onRatingChange={handleRatingChange}
              otherStyles="justify-center my-3"
            />
          )}

          <div>
            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              className="border border-primary p-3 rounded-lg my-5 w-full"
              placeholder="Type a review"
            />
          </div>
          <button
            onClick={() => (!isSubmitted ? handleSubmit() : navigate(-1))}
            disabled={isButtonDisabled}
            className={`w-full p-4 text-sm rounded-lg ${isButtonDisabled ? "bg-gray-300" : "bg-primary text-white"}`}
          >
            {isSubmitted ? "Back to home." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
