package com.example.backend.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PostPersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime memberSince;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Trip> trips = new ArrayList<>();

    @PostPersist
    private void generateDummyTrips() {
        for (int i = 1; i <= 5; i++) {
            Trip trip = new Trip();
            trip.setDestination(new Location("Destination", 40.7128, 74.0060));
            trip.setName("Neu Dummy Trip " + i);
            trip.setStartDate(LocalDate.now().plusDays(i));
            trip.setEndDate(trip.getStartDate().plusDays(7)); // 7 days trip duration
            trip.setUser(this);

            Random random = new Random();

            for (int day = 1; day <= 5; day++) {
                TripDay tripDay = new TripDay();
                tripDay.setDate(trip.getStartDate().plusDays(day));
                tripDay.setTrip(trip);

                Location location = new Location();
                location.setName("Location " + day);
                location.setLat(-90 + 180 * random.nextDouble());
                location.setLon(-180 + 360 * random.nextDouble());

                tripDay.getLocations().add(location);
                trip.getTripDays().add(tripDay);
            }

            trips.add(trip);
        }
    }
}
