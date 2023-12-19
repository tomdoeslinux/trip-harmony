package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PostPersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@ToString
@Slf4j
@Table(name = "trip")
public class Trip extends BaseEntity {

    @Embedded
    private Destination destination;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "photo")
    private String photo;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "trip", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Day> days = new ArrayList<>();

    @PostPersist
    public void generateDays() {
        List<Day> newDays = new ArrayList<>();
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            Day day = new Day();
            day.setDate(currentDate);
            day.setTrip(this);

            newDays.add(day);

            currentDate = currentDate.plusDays(1);
        }

        this.days = newDays;
    }
}
