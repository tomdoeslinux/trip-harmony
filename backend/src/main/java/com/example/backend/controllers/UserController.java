package com.example.backend.controllers;

import com.example.backend.domain.LoginParam;
import com.example.backend.domain.Trip;
import com.example.backend.domain.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @GetMapping("/{userId}/trips")
    public ResponseEntity<List<Trip>> getTrips(@PathVariable Long userId) {
        List<Trip> trips = userService.getTrips(userId);

        return ResponseEntity.ok(trips);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userService.save(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginParam loginParam) {
        User user = userService.login(loginParam);

        return ResponseEntity.ok(user);
    }
}
