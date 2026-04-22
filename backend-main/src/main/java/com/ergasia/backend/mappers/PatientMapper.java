package com.ergasia.backend.mappers;


import com.ergasia.backend.dto.PatientDto;
import com.ergasia.backend.dto.SignUpDto;
import com.ergasia.backend.entities.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PatientMapper {

    PatientDto toPatientDto(Patient patient);

    @Mapping(target = "password", ignore = true)
    Patient signUpToPatient(SignUpDto patientDto);
}
