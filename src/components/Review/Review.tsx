import { useEffect, useState } from "react"
import RatingSystem from "../Reuseables/RatingSystem"
import { useNavigate, useParams } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { sendReview } from "../../utils/reviews"
import { ArrowLeft, Star, TickCircle } from "iconsax-react"
import { errorToast, successToast } from "oasis-toast"

const Review = () => {
  const navigate = useNavigate()
  const { hostelId } = useParams()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")
  const [rating, setRating] = useState<number>(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (comment.trim() && rating > 0) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [comment, rating])

  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const mutation = useMutation({
    mutationKey: ["review"],
    mutationFn: async () => sendReview(comment, rating, hostelId as string),
    onSuccess: () => {
      successToast("Review submitted successfully!", "")
      setIsSubmitted(true)
    },
    onError: (error) => {
      errorToast("Failed to submit review", "Please try again")
      console.error("Review submission error:", error)
    },
  })

  const handleSubmit = () => {
    if (!isButtonDisabled) {
      mutation.mutate()
    }
  }

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-theme">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold text-dark dark:text-white">Write Review</h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="p-4">
        {isSubmitted ? (
          /* Success State */
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <TickCircle size={40} className="text-green-600 dark:text-green-400" />
            </div>

            <h2 className="text-2xl font-bold text-dark dark:text-white mb-3">Thank you for your review!</h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
              Your feedback helps us improve and helps others make better choices.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Back to Hostel
            </button>
          </div>
        ) : (
          /* Review Form */
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={32} className="text-primary" />
                </div>

                <h2 className="text-2xl font-bold text-dark dark:text-white">
                  How would you rate your overall experience?
                </h2>

                <p className="text-gray-600 dark:text-gray-300">Please take a moment to rate and review this hostel.</p>
              </div>

              {/* Rating System */}
              <div className="space-y-4">
                <div className="text-center">
                  <RatingSystem totalStars={5} onRatingChange={handleRatingChange} otherStyles="justify-center" />
                  {rating > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      You rated this hostel {rating} out of 5 stars
                    </p>
                  )}
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Review</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this hostel..."
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-xl resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    rows={5}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">{comment.length}/500 characters</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isButtonDisabled || mutation.isPending}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                  isButtonDisabled || mutation.isPending
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {mutation.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Review Tips</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Be specific about what you liked or didn't like</li>
                <li>• Mention cleanliness, facilities, and staff</li>
                <li>• Share your overall experience honestly</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Review
