package com.shop.api.admin.services.users;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.shop.api.admin.records.users.GetSimpleUserDto;
import com.shop.api.users.User;
import com.shop.api.users.others.UserRepository;

@Service
public class AdminUsersService {
    

    private final AdminUsersMapping adminUsersMapping;
    private final UserRepository userRepository;

    public AdminUsersService(AdminUsersMapping adminUsersMapping, UserRepository userRepository) {
        this.adminUsersMapping = adminUsersMapping;
        this.userRepository = userRepository;
    }

    public GetSimpleUserDto getSimpleUser(Integer id) {

        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()) {
            throw new NullPointerException("User not found");
        }
        return adminUsersMapping.changeToGetSimpleUserDto(user.get());
    }
}
