package com.shop.api.payement.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.shop.api.payement.records.AddressDto;
import com.shop.api.payement.repositories.UserPayInfoReposotiry;
import com.shop.api.payement.user_pay_info.UserPayInfo;
import com.shop.api.users.User;

@Service
public class UserPayInfoService {
    

    private final UserPayInfoReposotiry userPayReposotiry;

    public UserPayInfoService(UserPayInfoReposotiry userPayReposotiry) {
        this.userPayReposotiry = userPayReposotiry;
    }

    public UserPayInfo createUserPayInfoService(
        User user,
        AddressDto fullAddress,
        String customerId) 
        {
            Optional<UserPayInfo> findUser = userPayReposotiry.findByUser(user);
            UserPayInfo userPayInfo;
            if(findUser.isPresent()) {
                userPayInfo = findUser.get();
            } else {
                userPayInfo = new UserPayInfo();
            }
            userPayInfo.setUser(user);
            userPayInfo.setAddress(fullAddress.address());
            userPayInfo.setCity(fullAddress.city());
            userPayInfo.setPostalCode(fullAddress.postalCode());
            userPayInfo.setRegion(fullAddress.region());
            userPayInfo.setCustomerId(customerId);
            return userPayReposotiry.save(userPayInfo);
    }
    
    public AddressDto getUserAddress(User user) {
        UserPayInfo userPay = userPayReposotiry.findByUser(user)
                                        .orElse(new UserPayInfo());
        return new AddressDto(
            userPay.getAddress(), 
            userPay.getCity(), 
            userPay.getRegion(), 
            userPay.getPostalCode(), 
            true);
    }
}
