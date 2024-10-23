package com.shop.api.users.services;

import org.springframework.stereotype.Service;
import com.shop.api.users.User;
import com.shop.api.users.others.UserRepository;
import com.shop.api.users.records.GetUserReponseDto;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final UserMapping userMapping;
    public UserService(UserRepository userRepository,UserMapping userMapping) {
        this.userRepository = userRepository;
        this.userMapping = userMapping;
    }

    public User getUser(Integer id) {
        return userRepository.findById(id)
                            .orElseThrow();    
    }

    public GetUserReponseDto getSpecificUser(String uid) {
        User user = userRepository.findByUid(uid);
        return userMapping.changeUserTGetUserReponseDto(user);
    }

}
