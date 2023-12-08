package com.example.backend.services;

import com.example.backend.domain.LoginParam;
import com.example.backend.domain.User;
import com.example.backend.exceptions.UserNotFoundException;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User login(LoginParam loginParam) {
        User user = userRepository.findByUsername(loginParam.getUsername()).orElseThrow(UserNotFoundException::new);

        if (loginParam.getPassword().equals(user.getPassword())) {
            return user;
        }

        throw new UserNotFoundException();
    }
}
