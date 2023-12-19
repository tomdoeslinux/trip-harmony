package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "checklist")
public class Checklist extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "checklist", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ChecklistItem> items = new ArrayList<>();

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "day_id")
    private Day day;
}
