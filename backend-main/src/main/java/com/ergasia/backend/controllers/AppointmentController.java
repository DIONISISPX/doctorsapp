package com.ergasia.backend.controllers;


import com.ergasia.backend.dto.AppointmentDto;
import com.ergasia.backend.dto.DoctorDto;
import com.ergasia.backend.entities.Appointment;
import com.ergasia.backend.entities.AppointmentStatus;
import com.ergasia.backend.services.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class AppointmentController {
    final private AppointmentService appointmentService;
    @PostMapping("/appointments")
    public ResponseEntity<AppointmentDto> bookAppointment(@RequestBody AppointmentDto appointmentDto){
        AppointmentDto saved = appointmentService.addAppointment(appointmentDto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/appointments/my-appointments")
    public ResponseEntity<List<AppointmentDto>> getAllAppointments(){
        List<AppointmentDto> appointmentDtoList = appointmentService.findAppointmentsForCurrentPatient();
        return ResponseEntity.ok(appointmentDtoList);
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/appointments/{appointmentId}/status")
    public ResponseEntity<AppointmentDto> updateAppointmentStatus(
            @PathVariable Long appointmentId,
            @RequestParam AppointmentStatus appointmentStatus) {
        AppointmentDto updatedAppointment = appointmentService.updateStatus(appointmentId, appointmentStatus);
        return ResponseEntity.ok(updatedAppointment);
    }

}
