package com.example.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Destination {

    @Column(name = "destination_name", nullable = false)
    private String name;

    @Column(name = "destination_lat", nullable = false)
    private Double lat;

    @Column(name = "destination_lon", nullable = false)
    private Double lon;
}
