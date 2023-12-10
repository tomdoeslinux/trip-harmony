package com.example.backend.controllers;

import com.example.backend.controllers.dtos.UserLoginDTO;
import com.example.backend.domain.Trip;
import com.example.backend.domain.User;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/{id}/trips")
    public ResponseEntity<Trip> addTrip(@PathVariable Long id, @RequestBody Trip trip) {
        Trip createdTrip = userService.addTrip(id, trip);

        return ResponseEntity.ok(createdTrip);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userService.register(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody UserLoginDTO dto) {
        User user = userService.login(dto);

        return ResponseEntity.ok(user);
    }
}
