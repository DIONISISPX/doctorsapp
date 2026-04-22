package com.ergasia.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class DoctorDto {
    private Long id;
    private String amka;
    private String fullName;
    private String department;
    private String email;
    private String phone;
    private String location;
    private Double stars;
    private Double rateCount;
}
