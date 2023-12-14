package com.example.backend.controllers.dtos.trip;

import com.example.backend.domain.Destination;

import java.time.LocalDate;

public record EditTripDTO(String name, Destination destination, LocalDate startDate, LocalDate endDate) { }
