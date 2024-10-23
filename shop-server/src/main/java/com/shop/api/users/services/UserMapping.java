package com.shop.api.users.services;

import org.springframework.stereotype.Service;

import com.shop.api.payement.records.AddressDto;
import com.shop.api.payement.user_pay_info.UserPayInfo;
import com.shop.api.users.User;
import com.shop.api.users.records.GetUserReponseDto;

@Service
public class UserMapping {
        


    public GetUserReponseDto changeUserTGetUserReponseDto(User user) {
        UserPayInfo userInfo = user.getUserPayInfo();
        AddressDto addressDto;
        if(userInfo != null) {
            addressDto = new AddressDto(
            userInfo.getRegion(),
            userInfo.getAddress(),  
            userInfo.getCity(), 
            userInfo.getPostalCode(), 
            false
            );
        } else {
            addressDto = new AddressDto(null, null, null, null, false);
        }
        return  new GetUserReponseDto(
        user.getId(), 
        user.getFirstname(), 
        user.getLastname(), 
        user.getEmail(), 
        user.getNumber(), 
        addressDto);
    }
}
