package com.ergasia.backend.repositories;

import com.ergasia.backend.entities.Appointment;
import com.ergasia.backend.entities.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

    boolean existsByDoctorIdAndStartTimeLessThanAndEndTimeGreaterThanAndStatusNot(Long doctorId, LocalDateTime endTime, LocalDateTime startTime, AppointmentStatus appointmentStatus);

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByPatientIdAndStatus(Long patientId, AppointmentStatus status);

    List<Appointment> findByEndTimeBeforeAndStatus(LocalDateTime endTime, AppointmentStatus status);

}
