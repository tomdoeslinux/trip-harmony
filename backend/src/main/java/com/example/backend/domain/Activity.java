package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "activity")
public class Activity extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Embedded
    private Destination destination;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "trip_day_id", foreignKey = @ForeignKey(name = "fk_trip_day_id"))
    private Day day;
}
