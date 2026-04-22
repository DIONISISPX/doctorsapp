package com.ergasia.backend.dto;

import com.ergasia.backend.entities.AppointmentStatus;
import com.ergasia.backend.entities.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AppointmentDto {
    private Long id;
    private Long doctorId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    private String reason;
}
