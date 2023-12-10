package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
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
@Table(name = "day")
public class Day extends BaseEntity {

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "day", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Activity> activities = new ArrayList<>();

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "trip_id", foreignKey = @ForeignKey(name = "fk_trip_id"))
    private Trip trip;
}
