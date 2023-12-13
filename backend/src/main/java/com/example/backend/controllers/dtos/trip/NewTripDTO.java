package com.example.backend.controllers.dtos.trip;

import com.example.backend.domain.Destination;

import java.time.LocalDate;

public record NewTripDTO(
    String name,
    Destination destination,
    LocalDate startDate,
    LocalDate endDate
) { }
