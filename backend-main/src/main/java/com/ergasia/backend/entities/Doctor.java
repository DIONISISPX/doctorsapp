package com.ergasia.backend.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "doctor")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "doctor_amka")
    private String amka;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "department")
    private String department;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "location")
    private String location;
    @Column(name = "stars", columnDefinition = "double default 0.0")
    private Double stars= 0.0;
    @Column(name = "rate_count", columnDefinition = "double default 0.0")
    private Double rateCount= 0.0;
}
