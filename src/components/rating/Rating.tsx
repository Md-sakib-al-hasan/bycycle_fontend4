import { FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number; // Number of yellow stars
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <FaRegStar key={index} color={index < rating ? "red" : "gray"} />
      ))}
    </div>
  );
};

export default Rating;
