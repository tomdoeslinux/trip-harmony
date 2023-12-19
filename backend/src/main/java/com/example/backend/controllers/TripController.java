package com.example.backend.controllers;

import com.example.backend.controllers.dtos.UpdateTripDTO;
import com.example.backend.domain.Trip;
import com.example.backend.services.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    @Autowired
    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping( "/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        Trip trip = tripService.getTripById(id);

        return ResponseEntity.ok(trip);
    }

    @PatchMapping("/{id}")
    public void editTrip(@PathVariable Long id, @RequestBody UpdateTripDTO dto) {
        tripService.editTrip(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
    }
}
