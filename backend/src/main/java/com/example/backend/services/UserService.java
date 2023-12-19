package com.example.backend.services;

import com.example.backend.FileUtils;
import com.example.backend.controllers.dtos.NewTripDTO;
import com.example.backend.controllers.dtos.LoginUserDTO;
import com.example.backend.controllers.dtos.RegisterUserDTO;
import com.example.backend.domain.Trip;
import com.example.backend.domain.User;
import com.example.backend.repository.TripRepository;
import com.example.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final UnsplashProxyService unsplashProxyService;

    @Autowired
    public UserService(UserRepository userRepository, TripRepository tripRepository, UnsplashProxyService unsplashProxyService) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
        this.unsplashProxyService = unsplashProxyService;
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

        if (multipartFile != null) {
            String fileName = FileUtils.generateUniqueFileName(multipartFile);

            try {
                FileUtils.createFile(fileName, multipartFile);
            } catch (IOException ex) {
                throw new RuntimeException("Unable to process file: " + ex);
            }

            trip.setPhoto(fileName);
        } else {
            List<URL> urls = unsplashProxyService.searchPhotos(dto.destination().getName());
            int rand = ThreadLocalRandom.current().nextInt(0, urls.size() - 1);
            URL randUrl = urls.get(rand);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

            try (InputStream inputStream = randUrl.openStream()) {
                byte[] chunk = new byte[4096];
                int n;

                while ((n = inputStream.read(chunk)) > 0) {
                    byteArrayOutputStream.write(chunk, 0, n);
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            String fileName = UUID.randomUUID() + ".png";

            try {
                FileUtils.createFile(fileName, byteArrayOutputStream.toByteArray());
            } catch (IOException ex) {
                throw new RuntimeException("Unable to process file: " + ex);
            }

            trip.setPhoto(fileName);
        }

        return tripRepository.save(trip);
    }

    public User login(LoginUserDTO dto) {
        User user = userRepository.findByUsername(dto.username()).orElseThrow();

        if (dto.password().equals(user.getPassword())) {
            return user;
        }

        throw new NoSuchElementException();
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }
}
