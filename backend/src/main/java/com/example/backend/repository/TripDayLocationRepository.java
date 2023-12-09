package com.example.backend.repository;

import com.example.backend.domain.TripDayLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripDayLocationRepository extends JpaRepository<TripDayLocation, Long> {  }
