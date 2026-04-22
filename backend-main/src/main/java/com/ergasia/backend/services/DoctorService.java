package com.ergasia.backend.services;

import com.ergasia.backend.dto.DoctorDto;
import com.ergasia.backend.entities.Doctor;
import com.ergasia.backend.exceptions.AppException;
import com.ergasia.backend.repositories.DoctorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public List<DoctorDto> getAllDoctors(){
        return doctorRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public DoctorDto getDoctorById(Long doctorId){
        return doctorRepository.findById(doctorId).stream()
                .map(this::convertToDto)
                .findFirst().orElseThrow(()->new AppException("Cant find Doctor",HttpStatus.NOT_FOUND));
    }

    public Double calculateStars(DoctorDto doctorDto, Double stars) {
        double curStars = doctorDto.getStars() != null ? doctorDto.getStars() : 0.0;
        double curRates = doctorDto.getRateCount() != null ? doctorDto.getRateCount() : 0.0;

        return Math.round(((curStars * curRates) + stars) / (curRates + 1) * 10) / 10.0;
    }


    @Transactional
    public DoctorDto updateRating(Long doctorId, Double stars) {
        DoctorDto doctorDto = getDoctorById(doctorId);
        doctorDto.setStars(calculateStars(doctorDto, stars));

        double currentRateCount = doctorDto.getRateCount() != null ? doctorDto.getRateCount() : 0.0;
        doctorDto.setRateCount(currentRateCount + 1);

        Doctor doctor = convertFromDto(doctorDto);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return convertToDto(savedDoctor);
    }


    private DoctorDto convertToDto(Doctor doctor) {
        DoctorDto dto = new DoctorDto();
        dto.setId(doctor.getId());
        dto.setAmka(doctor.getAmka());
        dto.setFullName(doctor.getFullName());
        dto.setDepartment(doctor.getDepartment());
        dto.setEmail(doctor.getEmail());
        dto.setPhone(doctor.getPhone());
        dto.setLocation(doctor.getLocation());
        dto.setStars(doctor.getStars() != null ? doctor.getStars() : 0.0);
        dto.setRateCount(doctor.getRateCount() != null ? doctor.getRateCount() : 0.0);
        return dto;
    }

    private Doctor convertFromDto(DoctorDto doctorDto){
        Doctor doctor = new Doctor();
        doctor.setId(doctorDto.getId());
        doctor.setAmka(doctorDto.getAmka());
        doctor.setFullName(doctorDto.getFullName());
        doctor.setDepartment(doctorDto.getDepartment());
        doctor.setEmail(doctorDto.getEmail());
        doctor.setPhone(doctorDto.getPhone());
        doctor.setLocation(doctorDto.getLocation());
        doctor.setStars(doctorDto.getStars());
        doctor.setRateCount(doctorDto.getRateCount());
        return doctor;
    }
}
