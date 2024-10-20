package com.shop.api.users.services;

import org.springframework.stereotype.Service;

import com.shop.api.users.User;
import com.shop.api.users.others.UserRepository;

@Service
public class UserService {


    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(Integer id) {
        return userRepository.findById(id)
                            .orElseThrow();    
    }
}
