import { FaStar } from "react-icons/fa";
import { useState } from "react";
import PatientService from "../service/PatientService.js";
import "./Stars.css"; // Import your CSS file for styling

export default function Stars({ rating, rateCount, doctorId }) {
  const [selectedRating, setSelectedRating] = useState(0); // Track the selected rating before submission
  const [currentRating, setCurrentRating] = useState(rating); // Current average rating
  const [currentRateCount, setCurrentRateCount] = useState(rateCount); // Current number of ratings
  const [hoverRating, setHoverRating] = useState(0); // Track the star being hovered over
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleRateSubmit = async () => {
    if (selectedRating === 0) {
      setError("Please select a rating before submitting");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to be logged in to rate a doctor");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await PatientService.rateDoctor(doctorId, selectedRating, token);
      
      // Update the displayed rating and count
      setCurrentRating(response.stars);
      setCurrentRateCount(response.rateCount);
      setSelectedRating(0); // Reset selection after submission
    } catch (err) {
      console.error("Error updating rating:", err);
      setError(err.response?.data?.message || "Failed to submit rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rating-container">
      <div className="stars-wrapper">
        <div className="rating-info">
          <p>{currentRating.toFixed(1)} ({currentRateCount})</p>
        </div>
        <div className="stars-container">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <FaStar
                  className="star"
                  size={15}
                  color={
                    ratingValue <= hoverRating
                      ? "#d4a017" 
                      : ratingValue <= (selectedRating || currentRating)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  cursor={"pointer"}
                  onMouseEnter={() => setHoverRating(ratingValue)} 
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleStarClick(ratingValue)}
                />
              </label>
            );
          })}
        </div>
        {selectedRating > 0 && (
          <button 
            className="rate-button" 
            onClick={handleRateSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Rate"}
          </button>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
