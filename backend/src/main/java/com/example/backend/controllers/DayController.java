package com.example.backend.controllers;

import com.example.backend.domain.Activity;
import com.example.backend.domain.Note;
import com.example.backend.services.DayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/days")
public class DayController {

    private final DayService dayService;

    @Autowired
    public DayController(DayService dayService) {
        this.dayService = dayService;
    }

    @PostMapping("/{id}/activities")
    public ResponseEntity<Activity> addActivity(@PathVariable Long id, @RequestBody Activity activity) {
        return ResponseEntity.ok(dayService.addActivity(id, activity));
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<Note> addNote(@PathVariable Long id, @RequestBody Note note) {
        return ResponseEntity.ok(dayService.addNote(id, note));
    }
}
