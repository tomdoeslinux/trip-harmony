package com.example.backend.controllers;

import com.example.backend.controllers.dtos.UpdateTripDTO;
import com.example.backend.domain.Day;
import com.example.backend.domain.Trip;
import com.example.backend.repository.TripRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripRepository tripRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public TripController(TripRepository tripRepository, ObjectMapper objectMapper) {
        this.tripRepository = tripRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping( "/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        return ResponseEntity.ok(tripRepository.findById(id).orElseThrow());
    }

    @GetMapping("/{id}/days")
    public ResponseEntity<List<Day>> getTripDays(@PathVariable Long id) {
        return ResponseEntity.ok(tripRepository.findById(id).orElseThrow().getDays());
    }

    @PatchMapping("/{id}")
    public void updateTrip(@PathVariable Long id, @RequestBody UpdateTripDTO dto) {
        Trip trip = tripRepository.findById(id).orElseThrow();

        try {
            objectMapper.updateValue(trip, dto);
        } catch (Exception ex) {
            throw new RuntimeException();
        }

        trip.generateDays();
        tripRepository.save(trip);
    }

    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable Long id) {
        tripRepository.deleteById(id);
    }
}
