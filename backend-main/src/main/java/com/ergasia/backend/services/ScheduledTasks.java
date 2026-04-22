package com.ergasia.backend.services;

import com.ergasia.backend.entities.Appointment;
import com.ergasia.backend.entities.AppointmentStatus;
import com.ergasia.backend.repositories.AppointmentRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ScheduledTasks {
    private final AppointmentRepository appointmentRepository;

    public ScheduledTasks(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void markPastAppointmentsAsCompleted() {
        LocalDateTime now = LocalDateTime.now();
        List<Appointment> pastAppointments = appointmentRepository
                .findByEndTimeBeforeAndStatus(now, AppointmentStatus.SCHEDULED);

        pastAppointments.forEach(appointment -> {
            appointment.setStatus(AppointmentStatus.COMPLETED);
            appointmentRepository.save(appointment);
        });
    }
}

