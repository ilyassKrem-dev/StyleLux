package com.shop.api.users.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.api.payement.order.Order;
import com.shop.api.payement.service.OrderService;
import com.shop.api.users.User;
import com.shop.api.users.others.UserRepository;
import com.shop.api.users.records.GetUserOrdersDto;
import com.shop.api.users.records.GetUserReponseDto;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final UserMapping userMapping;
    private final OrderService orderService;
    public UserService(UserRepository userRepository,UserMapping userMapping,OrderService orderService) {
        this.userRepository = userRepository;
        this.userMapping = userMapping;
        this.orderService = orderService;
    }

    public User getUser(Integer id) {
        return userRepository.findById(id)
                            .orElseThrow();    
    }

    public GetUserReponseDto getSpecificUser(String uid) {
        User user = userRepository.findByUid(uid);
        return userMapping.changeUserTGetUserReponseDto(user);
    }
    public List<GetUserOrdersDto> getUserOrders(String uid,Pageable pageable) {
        User user = userRepository.findByUid(uid);
        List<Order> orders = orderService.getUserOrders(user, pageable);
        
        
        return orders.stream()
                .map(userMapping::chaGetUserOrdersDto)
                .collect(Collectors.toList());

    }
}
