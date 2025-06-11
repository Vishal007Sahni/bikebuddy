package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RideDetailsDto {
    private Integer rid;
    private String source;
    private String dest;
    private double charges;
    private LocalTime time;
    private LocalDate date;
    private String driverName;
    private long driverPhone;
}
