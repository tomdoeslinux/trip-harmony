package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "trip_day")
public class TripDay {

    @Id
    @Column(name = "trip_day_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ElementCollection
    @CollectionTable(
        name = "location",
        joinColumns = @JoinColumn(
            name = "trip_day_id",
            foreignKey = @ForeignKey(name = "fk_trip_day_id")
        )
    )
    private List<Location> locations = new ArrayList<>();

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(
        name = "trip_id",
        foreignKey = @ForeignKey(name = "fk_trip_id")
    )
    private Trip trip;
}
