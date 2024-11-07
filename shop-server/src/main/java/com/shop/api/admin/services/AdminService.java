package com.shop.api.admin.services;

import org.springframework.stereotype.Service;

import com.shop.api.products.repository.ProductRepository;
import com.shop.api.users.User;
import com.shop.api.users.others.UserRepository;

@Service
public class AdminService {
    
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final AdminMapping adminMapping;
    public AdminService(UserRepository userRepository,  ProductRepository productRepository,AdminMapping adminMapping) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.adminMapping = adminMapping;
    }


    public boolean isAdmin(String uid) {
        User user = userRepository.findByUid(uid);
        return user.getRole().equals("admin");
    }

}
