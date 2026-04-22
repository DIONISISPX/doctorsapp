package com.ergasia.backend.services;

import com.ergasia.backend.dto.CredentialsDto;
import com.ergasia.backend.dto.DoctorDto;
import com.ergasia.backend.dto.PatientDto;
import com.ergasia.backend.dto.SignUpDto;
import com.ergasia.backend.entities.Patient;
import com.ergasia.backend.exceptions.AppException;
import com.ergasia.backend.mappers.PatientMapper;
import com.ergasia.backend.repositories.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;
    private final PasswordEncoder passwordEncoder;

    public PatientDto findByLogin(String login){
        Patient patient = patientRepository.findByLogin(login)
                .orElseThrow(()->new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return patientMapper.toPatientDto(patient);
    }

    public PatientDto login(CredentialsDto credentialsDto){
        Patient patient = patientRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(()->new AppException("Unknown Error",HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()),patient.getPassword())){
            return patientMapper.toPatientDto(patient);
        }
        throw new AppException("Invalid password",HttpStatus.BAD_REQUEST);
    }
    @Transactional
    public PatientDto register(SignUpDto patientDto){
        Optional<Patient>optionalPatient = patientRepository.findByLogin(patientDto.getLogin());

        if (optionalPatient.isPresent()){
            throw new AppException("Login already exists",HttpStatus.BAD_REQUEST);
        }

        Patient patient = patientMapper.signUpToPatient(patientDto);

        patient.setPassword(passwordEncoder.encode(CharBuffer.wrap(patientDto.getPassword())));

        Patient savedPatient = patientRepository.save(patient);
        return patientMapper.toPatientDto(patient);
    }

}
