package com.ergasia.backend.controllers;


import com.ergasia.backend.dto.DoctorDto;
import com.ergasia.backend.services.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/doctors")
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        List<DoctorDto> doctorDtoList = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctorDtoList);
    }

    @PutMapping("/doctors/{doctorId}/rate")
    public ResponseEntity<DoctorDto> rateDoctor(
            @PathVariable Long doctorId,
            @RequestParam Double rating) {
        DoctorDto updatedDoctor = doctorService.updateRating(doctorId, rating);
        return ResponseEntity.ok(updatedDoctor);
    }

}
