package com.example.backend.services;

import com.example.backend.FileUtils;
import com.example.backend.controllers.dtos.trip.NewTripDTO;
import com.example.backend.controllers.dtos.user.LoginUserDTO;
import com.example.backend.controllers.dtos.user.RegisterUserDTO;
import com.example.backend.domain.Trip;
import com.example.backend.domain.User;
import com.example.backend.exceptions.UserNotFoundException;
import com.example.backend.repository.TripRepository;
import com.example.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;

    @Autowired
    public UserService(UserRepository userRepository, TripRepository tripRepository) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
    }

    public User register(RegisterUserDTO dto) {
        User user = new User();
        user.setUsername(dto.username());
        user.setEmail(dto.email());
        user.setPassword(dto.password());

        return userRepository.save(user);
    }

    public List<Trip> getTrips(Long userId) {
        return getUserById(userId).getTrips();
    }

    public Trip newTrip(Long userId, NewTripDTO dto, MultipartFile multipartFile) {
        User user = getUserById(userId);

        Trip trip = new Trip();
        trip.setUser(user);
        trip.setName(dto.name());
        trip.setDestination(dto.destination());
        trip.setStartDate(dto.startDate());
        trip.setEndDate(dto.endDate());

        String fileName = FileUtils.generateUniqueFileName(multipartFile);

        try {
            FileUtils.createFile(fileName, multipartFile);
        } catch (IOException ex) {
            throw new RuntimeException("Unable to process file: " + ex);
        }

        trip.setPhoto(fileName);

        return tripRepository.save(trip);
    }

    public User login(LoginUserDTO dto) {
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
