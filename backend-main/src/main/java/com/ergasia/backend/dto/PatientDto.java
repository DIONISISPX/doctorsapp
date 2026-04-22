package com.ergasia.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PatientDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String login;

    private String token;
}
