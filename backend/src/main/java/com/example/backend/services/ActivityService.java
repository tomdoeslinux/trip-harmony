package com.example.backend.services;

import com.example.backend.controllers.dtos.UpdateActivityTimesDTO;
import com.example.backend.domain.Activity;
import com.example.backend.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ActivityService {

    private final ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }

    public void deleteActivityTimes(Long id) {
        Activity activity = activityRepository.findById(id).orElseThrow();
        activity.setStartTime(null);
        activity.setEndTime(null);

        activityRepository.save(activity);
    }

    public void updateActivityTimes(Long id, UpdateActivityTimesDTO dto) {
        Activity activity = activityRepository.findById(id).orElseThrow();
        activity.setStartTime(dto.startTime());
        activity.setEndTime(dto.endTime());

        activityRepository.save(activity);
    }
}
