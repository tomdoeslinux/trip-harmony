package com.example.backend.services;

import com.example.backend.controllers.dtos.UpdateTripDTO;
import com.example.backend.domain.Trip;
import com.example.backend.repository.TripRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class TripService {

    private final TripRepository tripRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public TripService(TripRepository tripRepository, ObjectMapper objectMapper) {
        this.tripRepository = tripRepository;
        this.objectMapper = objectMapper;
    }

    public Trip getTripById(Long id) {
        return tripRepository.findById(id).orElseThrow();
    }

    public void editTrip(Long id, UpdateTripDTO dto) {
        Trip trip = getTripById(id);

        try {
            objectMapper.updateValue(trip, dto);
        } catch (Exception ex) {
            throw new RuntimeException();
        }

        trip.generateDays();
        tripRepository.save(trip);
    }

    public void deleteTrip(Long id) {
        Trip tripToDelete = getTripById(id);

        tripRepository.delete(tripToDelete);
    }
}
