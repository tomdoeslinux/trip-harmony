package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@Table(name = "trip_day_location")
public class TripDayLocation extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lat", nullable = false)
    private Double lat;

    @Column(name = "lon", nullable = false)
    private Double lon;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(
        name = "trip_day_id",
        foreignKey = @ForeignKey(name = "fk_trip_day_id")
    )
    private TripDay tripDay;
}
