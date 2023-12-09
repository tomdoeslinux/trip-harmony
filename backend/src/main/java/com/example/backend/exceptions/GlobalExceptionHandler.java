package com.example.backend.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ UserNotFoundException.class, TripNotFoundException.class })
    public ResponseEntity<?> handleEntityNotFoundException() {
        return ResponseEntity.notFound().build();
    }
}
