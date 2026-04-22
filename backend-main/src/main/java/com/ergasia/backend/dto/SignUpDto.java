package com.ergasia.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SignUpDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String login;
    private char[] password;
}
