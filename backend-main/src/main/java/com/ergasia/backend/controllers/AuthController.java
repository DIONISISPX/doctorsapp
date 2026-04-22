package com.ergasia.backend.controllers;


import com.ergasia.backend.config.UserAuthProvider;
import com.ergasia.backend.dto.CredentialsDto;
import com.ergasia.backend.dto.DoctorDto;
import com.ergasia.backend.dto.PatientDto;
import com.ergasia.backend.dto.SignUpDto;
import com.ergasia.backend.entities.Patient;
import com.ergasia.backend.services.DoctorService;
import com.ergasia.backend.services.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController

public class AuthController {

    private final PatientService patientService;
    private final UserAuthProvider userAuthProvider;


    @PostMapping("/login")
    public ResponseEntity<PatientDto> login(@RequestBody CredentialsDto credentialsDto){
        PatientDto patient = patientService.login(credentialsDto);

        patient.setToken(userAuthProvider.createToken(patient.getLogin()));
        return ResponseEntity.ok(patient);
    }

    @PostMapping("/register")
    public ResponseEntity<PatientDto> register(@RequestBody SignUpDto signUpDto){
        PatientDto patient = patientService.register(signUpDto);
        patient.setToken(userAuthProvider.createToken(patient.getLogin()));
        return ResponseEntity.created(URI.create("/patients/"+patient.getId()))
                .body(patient);
    }




}
