package com.example.backend;

import com.example.backend.domain.User;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner cmd(UserRepository userRepository) {
        return (data) -> {
            User user = new User("Tom", "todoescode@gmail.com", "ASD123");
            userRepository.save(user);
        };
    }
}
