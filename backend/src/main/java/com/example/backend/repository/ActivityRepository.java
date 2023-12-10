package com.example.backend.repository;

import com.example.backend.domain.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Modifying
    @Query(value = "UPDATE activity SET start_time = NULL, end_time = NULL WHERE activity_id = :id", nativeQuery = true)
    void deleteActivityTimes(@Param("id") Long id);

    @Modifying
    @Query(value = "UPDATE activity SET start_time = :startTime, end_time = :endTime WHERE activity_id = :id", nativeQuery = true)
    void updateActivityTimes(
        @Param("id") Long id,
        @Param("startTime") LocalTime startTime,
        @Param("endTime") LocalTime endTime
    );
}
