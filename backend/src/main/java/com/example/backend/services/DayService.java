package com.example.backend.services;

import com.example.backend.domain.Day;
import com.example.backend.domain.Activity;
import com.example.backend.domain.Note;
import com.example.backend.exceptions.DayNotFoundException;
import com.example.backend.repository.ActivityRepository;
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

    @Autowired
    public DayService(DayRepository dayRepository, ActivityRepository activityRepository, NoteRepository noteRepository) {
        this.dayRepository = dayRepository;
        this.activityRepository = activityRepository;
        this.noteRepository = noteRepository;
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

    private Day getDayById(Long tripDayId) {
        return dayRepository.findById(tripDayId).orElseThrow(DayNotFoundException::new);
    }
}
