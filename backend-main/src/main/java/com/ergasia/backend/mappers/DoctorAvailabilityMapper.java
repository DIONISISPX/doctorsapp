package com.ergasia.backend.mappers;

import com.ergasia.backend.dto.DoctorAvailabilityDto;
import com.ergasia.backend.entities.DoctorAvailability;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DoctorAvailabilityMapper {
    DoctorAvailabilityDto toDoctorAvailabilityDto(DoctorAvailability doctorAvailability);
}
