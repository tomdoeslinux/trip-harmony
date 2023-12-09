package com.example.backend.services;

import com.example.backend.domain.Trip;
import com.example.backend.domain.TripDay;
import com.example.backend.exceptions.TripNotFoundException;
import com.example.backend.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TripService {

    private final TripRepository tripRepository;

    @Autowired
    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public Trip getTripById(Long tripId) {
        return tripRepository.findById(tripId).orElseThrow(TripNotFoundException::new);
    }
}
