package com.example.backend.controllers.dtos;

import com.example.backend.domain.Destination;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UpdateTripDTO(
    @JsonProperty String name,
    @JsonProperty Destination destination,
    @JsonProperty LocalDate startDate,
    @JsonProperty LocalDate endDate
) { }
