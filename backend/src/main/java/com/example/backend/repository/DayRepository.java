package com.example.backend.repository;

import com.example.backend.domain.Day;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayRepository extends JpaRepository<Day, Long> { }
