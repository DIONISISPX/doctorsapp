package com.ergasia.backend.repositories;

import com.ergasia.backend.dto.PatientDto;
import com.ergasia.backend.entities.Patient;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient,Long> {
    Optional<Patient> findByLogin(String login);
}
