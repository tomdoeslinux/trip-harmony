package com.example.backend.controllers;

import com.example.backend.controllers.dtos.UpdateActivityTimesDTO;
import com.example.backend.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @DeleteMapping("/{id}")
    public void deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
    }

    @DeleteMapping("/{id}/times")
    public void deleteActivityTimes(@PathVariable Long id) {
        activityService.deleteActivityTimes(id);
    }

    @PutMapping("/{id}/times")
    public void updateActivityTimes(@PathVariable Long id, @RequestBody UpdateActivityTimesDTO dto) {
        activityService.updateActivityTimes(id, dto);
    }
}
