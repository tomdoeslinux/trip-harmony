package com.example.backend.controllers;

import com.example.backend.domain.Activity;
import com.example.backend.services.DayService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void addActivity(@PathVariable Long id, @RequestBody Activity activity) {
        dayService.addActivity(id, activity);
    }
}
