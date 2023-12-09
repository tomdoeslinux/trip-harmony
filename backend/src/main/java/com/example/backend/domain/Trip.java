package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "trip")
public class Trip {

    @Id
    @Column(name = "trip_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(
            name = "name",
            column = @Column(name = "destination_name", nullable = false)
        ),
        @AttributeOverride(
            name = "lat",
            column = @Column(name = "destination_lat", nullable = false)
        ),
        @AttributeOverride(
            name = "lon",
            column = @Column(name = "destination_lon", nullable = false)
        )
    })
    private Location destination;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(
        name = "user_id",
        foreignKey = @ForeignKey(name = "fk_user_id")
    )
    private User user;

    @OneToMany(mappedBy = "trip", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<TripDay> tripDays = new ArrayList<>();
}
