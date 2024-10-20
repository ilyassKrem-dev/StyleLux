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
            if(findUser.isPresent()) {
                return findUser.get();
            }
            UserPayInfo userPayInfo = new UserPayInfo();
            userPayInfo.setUser(user);
            userPayInfo.setAddress(fullAddress.address());
            userPayInfo.setCity(fullAddress.city());
            userPayInfo.setPostalCode(fullAddress.postalCode());
            userPayInfo.setRegion(fullAddress.region());
            userPayInfo.setCustomerId(customerId);
            return userPayReposotiry.save(userPayInfo);
    }
    
}
