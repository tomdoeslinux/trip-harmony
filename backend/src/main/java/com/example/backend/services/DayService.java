package com.example.backend.services;

import com.example.backend.domain.*;
import com.example.backend.repository.ActivityRepository;
import com.example.backend.repository.ChecklistRepository;
import com.example.backend.repository.DayRepository;
import com.example.backend.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DayService {

    private final DayRepository dayRepository;
    private final ActivityRepository activityRepository;

    private final NoteRepository noteRepository;

    private final ChecklistRepository checklistRepository;

    @Autowired
    public DayService(
        DayRepository dayRepository,
        ActivityRepository activityRepository,
        NoteRepository noteRepository,
        ChecklistRepository checklistRepository
    ) {
        this.dayRepository = dayRepository;
        this.activityRepository = activityRepository;
        this.noteRepository = noteRepository;
        this.checklistRepository = checklistRepository;
    }

    public Activity addActivity(Long tripDayId, Activity location) {
        Day day = getDayById(tripDayId);
        location.setDay(day);

        return activityRepository.save(location);
    }

    public Note addNote(Long dayId, Note note) {
        Day day = getDayById(dayId);
        note.setDay(day);

        return noteRepository.save(note);
    }

    public Checklist addChecklist(Long dayId, Checklist checklist) {
        Day day = getDayById(dayId);
        checklist.setDay(day);

        return checklistRepository.save(checklist);
    }

    private Day getDayById(Long tripDayId) {
        return dayRepository.findById(tripDayId).orElseThrow();
    }
}
