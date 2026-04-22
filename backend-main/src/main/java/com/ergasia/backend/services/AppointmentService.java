package com.ergasia.backend.services;


import com.ergasia.backend.dto.AppointmentDto;
import com.ergasia.backend.dto.DoctorDto;
import com.ergasia.backend.dto.PatientDto;
import com.ergasia.backend.entities.Appointment;
import com.ergasia.backend.entities.AppointmentStatus;
import com.ergasia.backend.entities.Doctor;
import com.ergasia.backend.entities.Patient;
import com.ergasia.backend.exceptions.AppException;
import com.ergasia.backend.mappers.AppointmentMapper;
import com.ergasia.backend.repositories.AppointmentRepository;
import com.ergasia.backend.repositories.DoctorRepository;
import com.ergasia.backend.repositories.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;


    @Transactional
    public AppointmentDto addAppointment (AppointmentDto appointmentDto){
        if (appointmentDto.getDoctorId() == null) {
            throw new AppException("Doctor not specified", HttpStatus.BAD_REQUEST);
        }

        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Logged in as: " + login); // Debug line

        Doctor doctor = doctorRepository.findById(appointmentDto.getDoctorId())
                .orElseThrow(() -> new AppException("Doctor not found", HttpStatus.NOT_FOUND));

        Patient patient = patientRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));

        if (appointmentDto.getStartTime().isAfter(appointmentDto.getEndTime())) {
            throw new AppException("End time must be after start time", HttpStatus.BAD_REQUEST);
        }

        boolean hasConflict = appointmentRepository.existsByDoctorIdAndStartTimeLessThanAndEndTimeGreaterThanAndStatusNot(
                doctor.getId(),
                appointmentDto.getEndTime(),
                appointmentDto.getStartTime(),
                AppointmentStatus.CANCELLED
        );

        if (hasConflict) {
            throw new AppException("Time slot already booked", HttpStatus.CONFLICT);
        }

        Appointment appointment = appointmentMapper.toAppointment(appointmentDto);
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);

        return appointmentMapper.toAppointmentDto(appointmentRepository.save(appointment));
    }

    public List<AppointmentDto> findAppointmentsForCurrentPatient() {
        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        Patient patient = patientRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));

        return appointmentRepository.findByPatientIdAndStatus(patient.getId(), AppointmentStatus.SCHEDULED).stream()
                .map(appointmentMapper::toAppointmentDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteAppointment(Long appointmentId) {
        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        Patient patient = patientRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new AppException("Appointment not found", HttpStatus.NOT_FOUND));

        if (!appointment.getPatient().getId().equals(patient.getId())) {
            throw new AppException("You can only delete your own appointments", HttpStatus.FORBIDDEN);
        }
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    @Transactional
    public AppointmentDto updateStatus(Long appointmentId, AppointmentStatus appointmentStatus) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new AppException("Appointment not found", HttpStatus.NOT_FOUND));

        // Only allow updating to COMPLETED if currently SCHEDULED
        if (appointment.getStatus() != AppointmentStatus.SCHEDULED) {
            throw new AppException("Appointment status cannot be updated", HttpStatus.BAD_REQUEST);
        }

        appointment.setStatus(appointmentStatus);
        return appointmentMapper.toAppointmentDto(appointmentRepository.save(appointment));
    }

}
