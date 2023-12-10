package com.example.backend.services;

import com.example.backend.controllers.dtos.UpdateActivityTimesDTO;
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
        activityRepository.deleteActivityTimes(id);
    }

    public void updateActivityTimes(Long id, UpdateActivityTimesDTO dto) {
        activityRepository.updateActivityTimes(id, dto.startTime(), dto.endTime());
    }
}
