package com.example.backend.controllers;

import com.example.backend.services.TripDayLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trip-day-locations")
public class TripDayLocationController {

    private final TripDayLocationService tripDayLocationService;

    @Autowired
    public TripDayLocationController(TripDayLocationService tripDayLocationService) {
        this.tripDayLocationService = tripDayLocationService;
    }

    @DeleteMapping("/{tripDayLocationId}")
    public void deleteTripDayLocation(@PathVariable Long tripDayLocationId) {
        tripDayLocationService.deleteLocation(tripDayLocationId);
    }
}
