package com.example.backend.controllers;

import com.example.backend.controllers.dtos.trip.NewTripDTO;
import com.example.backend.controllers.dtos.user.RegisterUserDTO;
import com.example.backend.controllers.dtos.user.LoginUserDTO;
import com.example.backend.domain.Trip;
import com.example.backend.domain.User;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}/trips")
    public ResponseEntity<List<Trip>> getTrips(@PathVariable Long id) {
        List<Trip> trips = userService.getTrips(id);

        return ResponseEntity.ok(trips);
    }

    @PostMapping(value = "/{id}/trips", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Trip> newTrip(
        @PathVariable Long id,
        @RequestPart("trip") NewTripDTO dto,
        @RequestPart(value = "file", required = false) MultipartFile multipartFile
    ) {
        Trip trip = userService.newTrip(id, dto, multipartFile);

        return ResponseEntity.ok(trip);
    }

    @PostMapping
    public ResponseEntity<User> register(@RequestBody RegisterUserDTO dto) {
        User newUser = userService.register(dto);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginUserDTO dto) {
        User user = userService.login(dto);

        return ResponseEntity.ok(user);
    }
}
