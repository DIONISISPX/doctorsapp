import React from 'react';
import './Sidebar.css';

const Sidebar = ({
    departments,
    locations,
    onSpecialtyChange,
    onLocationChange,
    onMinimumRatingChange,
    onFilterReset,
    selectedSpecialty,
    selectedLocation
}) => {
    return (
        <div className="sidebar-content">
            <h2 className="sidebar-title">Filter Doctors</h2>
            
            <div className="filter-group">
                <label className="filter-label">Specialty</label>
                <select 
                    value={selectedSpecialty}
                    onChange={(e) => onSpecialtyChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Specialties</option>
                    {departments.map((department) => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label className="filter-label">Location</label>
                <select
                    value={selectedLocation}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label className="filter-label">Minimum Rating</label>
                <div className="rating-options">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                            key={rating}
                            className="rating-option"
                            onClick={() => onMinimumRatingChange(rating)}
                        >
                            {'★'.repeat(rating)}{'☆'.repeat(5-rating)}
                        </button>
                    ))}
                </div>
            </div>

            <button className="clear-filters" onClick={onFilterReset}>
                Clear All Filters
            </button>
        </div>
    );
};

export default Sidebar;
