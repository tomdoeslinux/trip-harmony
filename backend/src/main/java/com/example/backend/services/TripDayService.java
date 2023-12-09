package com.example.backend.services;

import com.example.backend.domain.TripDay;
import com.example.backend.domain.TripDayLocation;
import com.example.backend.exceptions.TripDayNotFoundException;
import com.example.backend.repository.TripDayLocationRepository;
import com.example.backend.repository.TripDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TripDayService {

    private final TripDayRepository tripDayRepository;
    private final TripDayLocationRepository tripDayLocationRepository;

    @Autowired
    public TripDayService(TripDayRepository tripDayRepository, TripDayLocationRepository tripDayLocationRepository) {
        this.tripDayRepository = tripDayRepository;
        this.tripDayLocationRepository = tripDayLocationRepository;
    }

    public TripDayLocation addLocation(Long tripDayId, TripDayLocation location) {
        TripDay tripDay = getTripDayById(tripDayId);
        location.setTripDay(tripDay);

        return tripDayLocationRepository.save(location);
    }

    private TripDay getTripDayById(Long tripDayId) {
        return tripDayRepository.findById(tripDayId).orElseThrow(TripDayNotFoundException::new);
    }
}
