package com.example.backend.controllers.dtos;

import com.example.backend.domain.Destination;

import java.time.LocalDate;

public record UpdateTripDTO(String name, Destination destination, LocalDate startDate, LocalDate endDate) { }
