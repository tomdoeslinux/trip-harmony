package com.example.backend.repository;

import com.example.backend.domain.TripDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripDayRepository extends JpaRepository<TripDay, Long> { }
