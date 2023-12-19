package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "checklist_item")
public class ChecklistItem extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "is_checked", columnDefinition = "BOOLEAN DEFAULT FALSE", nullable = false)
    private Boolean isChecked;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "checklist_id")
    private Checklist checklist;
}
