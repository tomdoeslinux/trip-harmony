package com.example.backend.controllers.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UpdateChecklistItemDTO(@JsonProperty String name, @JsonProperty Boolean isChecked) { }

