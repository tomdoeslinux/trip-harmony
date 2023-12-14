package com.example.backend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
        UserNotFoundException.class,
        TripNotFoundException.class,
        DayNotFoundException.class,
        ActivityNotFoundException.class
    })
    public ResponseEntity<?> handleEntityNotFoundException() {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception exception) {
        return ResponseEntity.internalServerError().build();
    }
}
