package com.shop.api.users.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.api.others.NotFoundException;
import com.shop.api.payement.order.Order;
import com.shop.api.payement.service.OrderService;
import com.shop.api.payement.user_pay_info.UserPayInfo;
import com.shop.api.products.Product;
import com.shop.api.products.records.ProductDto;
import com.shop.api.products.repository.ProductRepository;
import com.shop.api.products.servers.ProductMapping;
import com.shop.api.users.User;
import com.shop.api.users.others.UserRepository;
import com.shop.api.users.records.GetUserOrdersDto;
import com.shop.api.users.records.GetUserReponseDto;
import com.shop.api.users.records.UpdateAddressesDto;
import com.shop.api.users.records.UpdateNameDto;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final UserMapping userMapping;
    private final OrderService orderService;
    private final ProductRepository productRepository;
    private final ProductMapping productMapping;
    public UserService(
    UserRepository userRepository,
    UserMapping userMapping,
    OrderService orderService,
    ProductRepository productRepository,
    ProductMapping productMapping) {
        this.userRepository = userRepository;
        this.userMapping = userMapping;
        this.orderService = orderService;
        this.productRepository = productRepository;
        this.productMapping = productMapping;
    }

    public User getUser(Integer id) {
        return userRepository.findById(id)
                            .orElseThrow();    
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
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

    public String changeFavorite(String uid,String productUid) {
        Product product = productRepository.findByUid(productUid);
        User user = userRepository.findByUid(uid);
        if(user.getFavorites().contains(product)) {
            user.removeFavorite(product);
        } else {
            user.addFavorite(product);
        }
        userRepository.save(user);

        return "Favorite is now : " + user.getFavorites().contains(product);
    }

    public List<ProductDto> getAllFavorites(String uid) {
        User user = userRepository.findByUid(uid);
        return user.getFavorites()
                    .stream()
                    .map(productMapping::changeToProductDto)
                    .collect(Collectors.toList());
    }


    public String updateFullName(UpdateNameDto fullname,String uid) {
        User user = userRepository.findByUid(uid);
        if(user==null) {
            throw new NotFoundException("User not found");
        }
        if(user.getFirstname().equals(fullname.fname()) && user.getLastname().equals(fullname.lname())) {
            throw new IllegalArgumentException("The First name and last name are the same as before");
        }
        user.setFirstname(fullname.fname());
        user.setLastname(fullname.lname());

        userRepository.save(user);
        return "Success";
    }
    public String updateNumber(String number,String uid) {
        User user = userRepository.findByUid(uid);
        if(user==null) {
            throw new NotFoundException("User not found");
        }
        if(user.getNumber().equals(number)) {
            throw new IllegalArgumentException("Phone number matches the old one");
        }
        user.setNumber(number);
        userRepository.save(user);
        return "Success";
    }

    public String updateAddresses(UpdateAddressesDto addressesDto,String uid) {
        User user = userRepository.findByUid(uid);
        if(user ==null) {
            throw new NotFoundException("User not found");
        }
        UserPayInfo userPayinfo = user.getUserPayInfo();
        userPayinfo.setAddress(addressesDto.address());
        userPayinfo.setCity(addressesDto.city());
        userPayinfo.setRegion(addressesDto.country());
        userPayinfo.setPostalCode(addressesDto.postalCode());
        userRepository.save(user);
        return "Success";

    }
}
