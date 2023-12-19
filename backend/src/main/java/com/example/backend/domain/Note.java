package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@Table(name = "note")
public class Note extends BaseEntity {

    @Column(name = "text", nullable = false)
    private String text;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "day_id")
    private Day day;
}
