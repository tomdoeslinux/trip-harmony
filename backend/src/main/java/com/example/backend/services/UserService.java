package com.example.backend.services;

import com.example.backend.domain.LoginParam;
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

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<Trip> getTrips(Long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new).getTrips();
    }

    public Trip addTrip(Long userId, Trip trip) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        trip.setUser(user);

        return tripRepository.save(trip);
    }

    public User login(LoginParam loginParam) {
        User user = userRepository.findByUsername(loginParam.username()).orElseThrow(UserNotFoundException::new);

        if (loginParam.password().equals(user.getPassword())) {
            return user;
        }

        throw new UserNotFoundException();
    }
}
