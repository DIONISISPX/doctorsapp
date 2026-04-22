import { useState, useEffect, useRef } from "react";
import PatientService from "../service/PatientService.js";
import "./Home.css";
import Sidebar from "../common/Sidebar.jsx";
import Stars from "./Stars.jsx";
import Navbar from "../common/Navbar.jsx";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]); // State for filtered doctors
  const [selectedSpecialty, setSelectedSpecialty] = useState(""); // State for selected specialty
  const [selectedLocation, setSelectedLocation] = useState(""); // State for selected location
  const [selectedMinimumRating, setSelectedMinimumRating] = useState(0); // State for minimum rating
  const [error, setError] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const observerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await PatientService.getAllDoctors(token);
        setDoctors(response);
        setFilteredDoctors(response); // Initialize filteredDoctors with all doctors
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to fetch doctors. Please try again.");
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let filtered = doctors;

    if (selectedSpecialty) {
      filtered = filtered.filter(
        (doctor) => doctor.department === selectedSpecialty
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (doctor) => doctor.location.split(" ")[0] === selectedLocation
      );
    }

    if (selectedMinimumRating > 0) {
      filtered = filtered.filter((doctor) => doctor.stars >= selectedMinimumRating);
    }

    // Sort the filtered doctors by rating in descending order
    filtered = filtered.sort((a, b) => b.stars - a.stars);

    setFilteredDoctors(filtered);
  }, [selectedSpecialty, selectedLocation, selectedMinimumRating, doctors]);

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty); // Update the selected specialty
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location); // Update the selected location
  };

  const handleMinimumRatingChange = (rating) => {
    setSelectedMinimumRating(rating); // Update the selected minimum rating
  };

  const handleFilterReset = () => {
    setSelectedSpecialty(""); // Reset specialty filter
    setSelectedLocation(""); // Reset location filter
    setSelectedMinimumRating(0); // Reset minimum rating filter
    setFilteredDoctors([...doctors]); // Reset to the original doctors list without sorting
  };

  const handleBookingOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  const handleBookingClose = () => {
    setIsBookingOpen(false);
    setSelectedDoctor(null);
    setBookingData({
      date: "",
      time: "",
      reason: "",
    });
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!selectedDoctor || !token) {
      setError("Missing required information for booking");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const startTime = new Date(`${bookingData.date}T${bookingData.time}`);
      const endTime = new Date(startTime.getTime() + 30 * 60000);

      const appointmentData = {
        doctorId: selectedDoctor.id,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: "SCHEDULED",
        reason: bookingData.reason,
      };

      await PatientService.bookAppointment(appointmentData, token);

      alert(
        `Successfully booked appointment with Dr. ${selectedDoctor.fullName} on ${bookingData.date} at ${bookingData.time}`,
      );
      handleBookingClose();
    } catch (err) {
      console.error("Error booking appointment:", err);
      setError(
        err.response?.data?.message ||
          "Failed to book appointment. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Extract unique departments from the doctors array
  const uniqueDepartments = [
    ...new Set(doctors.map((doctor) => doctor.department)),
  ];

  // Extract the first word of each location and ensure uniqueness
  const uniqueLocations = [
    ...new Set(doctors.map((doctor) => doctor.location.split(" ")[0])),
  ];

  // Initialize the intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe new doctor cards when they are added
  useEffect(() => {
    const cards = document.querySelectorAll('.doctor-card:not(.fade-in)');
    cards.forEach(card => {
      if (observerRef.current) {
        observerRef.current.observe(card);
      }
    });
  }, [filteredDoctors]);

  return (
    <div className="home-container">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar
            departments={uniqueDepartments}
            locations={uniqueLocations}
            onSpecialtyChange={handleSpecialtyChange}
            onLocationChange={handleLocationChange}
            onMinimumRatingChange={handleMinimumRatingChange}
            onFilterReset={handleFilterReset}
            selectedSpecialty={selectedSpecialty}
            selectedLocation={selectedLocation}
        />
    </div>

      <div className="doctors-content">
        <h1 className="page-title">Available Doctors</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.fullName}</h3>
                <p className="doctor-specialty">{doctor.department}</p>
                <p className="doctor-location">{doctor.location}</p>
                <p className="doctor-contact">{doctor.email}</p>
                <p className="doctor-contact">{doctor.phone}</p>
                <Stars rating={doctor.stars} rateCount={doctor.rateCount} doctorId={doctor.id} />
              </div>
              <button
                className="book-button"
                onClick={() => handleBookingOpen(doctor)}
                disabled={isLoading}
              >
                {isLoading && selectedDoctor?.id === doctor.id ? (
                  <span className="loading-spinner"></span>
                ) : (
                  "BOOK APPOINTMENT"
                )}
              </button>
            </div>
          ))}
        </div>

        {isBookingOpen && selectedDoctor && (
          <div className="booking-modal-overlay">
            <div className="booking-modal">
              <button className="close-modal" onClick={handleBookingClose}>
                ×
              </button>
              <h2 className="modal-title">
                Book with {selectedDoctor.fullName}
              </h2>
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleBookingChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="form-group">
                  <label>Time:</label>
                  <input
                    type="time"
                    name="time"
                    value={bookingData.time}
                    onChange={handleBookingChange}
                    required
                    min="08:00"
                    max="17:00"
                  />
                </div>
                <div className="form-group">
                  <label>Reason for visit:</label>
                  <textarea
                    name="reason"
                    value={bookingData.reason}
                    onChange={handleBookingChange}
                    required
                    placeholder="Describe your symptoms or reason for visit"
                  />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      "CONFIRM APPOINTMENT"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
