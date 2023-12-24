package com.example.backend.controllers;

import com.example.backend.domain.Activity;
import com.example.backend.domain.Checklist;
import com.example.backend.domain.Day;
import com.example.backend.domain.Note;
import com.example.backend.repository.ActivityRepository;
import com.example.backend.repository.ChecklistRepository;
import com.example.backend.repository.DayRepository;
import com.example.backend.repository.NoteRepository;
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

    private final DayRepository dayRepository;

    private final ActivityRepository activityRepository;

    private final NoteRepository noteRepository;

    private final ChecklistRepository checklistRepository;

    @Autowired
    public DayController(DayRepository dayRepository, ActivityRepository activityRepository, NoteRepository noteRepository, ChecklistRepository checklistRepository) {
        this.dayRepository = dayRepository;
        this.activityRepository = activityRepository;
        this.noteRepository = noteRepository;
        this.checklistRepository = checklistRepository;
    }

    @PostMapping("/{id}/activities")
    public ResponseEntity<Activity> addActivity(@PathVariable Long id, @RequestBody Activity activity) {
        Day day = dayRepository.findById(id).orElseThrow();
        activity.setDay(day);

        return ResponseEntity.ok(activityRepository.save(activity));
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<Note> addNote(@PathVariable Long id, @RequestBody Note note) {
        Day day = dayRepository.findById(id).orElseThrow();
        note.setDay(day);

        return ResponseEntity.ok(noteRepository.save(note));
    }

    @PostMapping("/{id}/checklists")
    public ResponseEntity<Checklist> addChecklist(@PathVariable Long id, @RequestBody Checklist checklist) {
        Day day = dayRepository.findById(id).orElseThrow();
        checklist.setDay(day);

        return ResponseEntity.ok(checklistRepository.save(checklist));
    }
}
