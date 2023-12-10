package com.example.backend.controllers.dtos;

import java.time.LocalTime;

public record UpdateActivityTimesDTO(LocalTime startTime, LocalTime endTime) { }
