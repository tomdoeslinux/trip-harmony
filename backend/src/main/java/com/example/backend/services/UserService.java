package com.example.backend.services;

import com.example.backend.controllers.dtos.UserLoginDTO;
import com.example.backend.domain.Trip;
import com.example.backend.domain.User;
import com.example.backend.exceptions.UserNotFoundException;
import com.example.backend.repository.TripRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;

    @Autowired
    public UserService(UserRepository userRepository, TripRepository tripRepository) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
    }

    public User register(User user) {
        return userRepository.save(user);
    }

    public List<Trip> getTrips(Long userId) {
        return getUserById(userId).getTrips();
    }

    public Trip addTrip(Long userId, Trip trip) {
        User user = getUserById(userId);
        trip.setUser(user);

        return tripRepository.save(trip);
    }

    public User login(UserLoginDTO dto) {
        User user = userRepository.findByUsername(dto.username()).orElseThrow(UserNotFoundException::new);

        if (dto.password().equals(user.getPassword())) {
            return user;
        }

        throw new UserNotFoundException();
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }
}
