import { useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa6"

interface ratingProps {
  totalStars: number
  onRatingChange?: (rating: number) => void
  otherStyles?: string
}

const RatingSystem = ({ totalStars, onRatingChange, otherStyles }: ratingProps) => {
  const [rating, setRating] = useState(0) 

  const handleClick = (index: number) => {
    setRating(index + 1)
    if (onRatingChange) {
      onRatingChange(index + 1) 
    }
  }

  return (
    <div className={` flex space-x-1 items-center ${otherStyles && otherStyles}`}>
      {Array.from({ length: totalStars }, (_, index) => (
        <button key={index} type="button" className="focus:outline-none" onClick={() => handleClick(index)}>
          {index < rating ? (
            <FaStar className="text-yellow-500" size={24} />
          ) : (
            <FaRegStar className="text-gray-400 dark:text-gray-600" size={24} />
          )}
        </button>
      ))}
    </div>
  )
}

export default RatingSystem
