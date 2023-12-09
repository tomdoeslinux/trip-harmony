package com.example.backend.services;

import com.example.backend.repository.TripDayLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TripDayLocationService {

    private final TripDayLocationRepository tripDayLocationRepository;

    @Autowired
    public TripDayLocationService(TripDayLocationRepository tripDayLocationRepository) {
        this.tripDayLocationRepository = tripDayLocationRepository;
    }

    public void deleteLocation(Long locationId) {
        tripDayLocationRepository.deleteById(locationId);
    }
}
