package com.ergasia.backend.repositories;

import com.ergasia.backend.entities.DoctorAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailability,Long> {
}
