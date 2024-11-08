package com.shop.api.admin.services.users;

import org.springframework.stereotype.Service;

import com.shop.api.admin.records.users.GetSimpleUserDto;
import com.shop.api.users.User;

@Service
public class AdminUsersMapping {
    

    public GetSimpleUserDto changeToGetSimpleUserDto(User user) {
        
        return new GetSimpleUserDto(
            user.getId(), 
            user.getUid(), 
            user.getFirstname(), 
            user.getLastname(), 
            user.getEmail(), 
            user.getNumber());
    }
}
