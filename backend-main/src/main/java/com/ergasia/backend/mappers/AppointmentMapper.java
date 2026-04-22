package com.ergasia.backend.mappers;

import com.ergasia.backend.dto.AppointmentDto;
import com.ergasia.backend.entities.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    @Mapping(source = "doctor.id", target = "doctorId")
    AppointmentDto toAppointmentDto(Appointment appointment);

    @Mapping(source = "doctorId", target = "doctor.id")
    Appointment toAppointment(AppointmentDto appointmentDto);
}
