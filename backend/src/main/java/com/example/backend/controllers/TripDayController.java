package com.example.backend.controllers;

import com.example.backend.domain.TripDayLocation;
import com.example.backend.services.TripDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trip-days")
public class TripDayController {

    private final TripDayService tripDayService;

    @Autowired
    public TripDayController(TripDayService tripDayService) {
        this.tripDayService = tripDayService;
    }

    @PostMapping("/{tripDayId}/locations")
    public void addLocation(@PathVariable Long tripDayId, @RequestBody TripDayLocation location) {
        tripDayService.addLocation(tripDayId, location);
    }
}
