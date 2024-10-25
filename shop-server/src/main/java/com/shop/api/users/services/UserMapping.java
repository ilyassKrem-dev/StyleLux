package com.shop.api.users.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shop.api.payement.order.Order;
import com.shop.api.payement.records.AddressDto;
import com.shop.api.payement.user_pay_info.UserPayInfo;
import com.shop.api.products.records.cart.ProductCart;
import com.shop.api.products.servers.ProductMapping;
import com.shop.api.users.User;
import com.shop.api.users.records.GetUserOrdersDto;
import com.shop.api.users.records.GetUserReponseDto;

@Service
public class UserMapping {
        
    private final ProductMapping productMapping;

    public UserMapping(ProductMapping productMapping) {
        this.productMapping = productMapping;
    }
    

    public GetUserReponseDto changeUserTGetUserReponseDto(User user) {
        UserPayInfo userInfo = user.getUserPayInfo();
        AddressDto addressDto;
        if(userInfo != null) {
            addressDto = new AddressDto(
            userInfo.getAddress(),
            userInfo.getCity(),  
            userInfo.getRegion(), 
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

    public GetUserOrdersDto chaGetUserOrdersDto(Order order) {
        List<ProductCart> products = order.getOrderItems()
                                            .stream()
                                            .map(item -> item.getProduct())
                                            .map(productMapping::changeToProductCart)
                                            .collect(Collectors.toList());
        
        
        return new GetUserOrdersDto(
            order.getId(), 
            order.getUid(),
            products, 
            order.getTotalAmount(), 
            order.getCreatedAt(), 
            order.getCountry() + "|" + order.getAddress(), 
            order.getStatus());
    }
}
