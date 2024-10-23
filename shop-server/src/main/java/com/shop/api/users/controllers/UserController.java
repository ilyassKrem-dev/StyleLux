package com.shop.api.users.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.auth.JwtService;
import com.shop.api.users.records.GetUserReponseDto;
import com.shop.api.users.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    public UserController(UserService userService,JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<GetUserReponseDto> getUser(
        @PathVariable(name="id") String uid,
        @RequestHeader(name = "Authorization") String authHeader
    ) {
        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String userFromToken = jwtService.extractUsername(token);
            GetUserReponseDto user = userService.getSpecificUser(uid);
           
            if(!userFromToken.equals(user.email())) {
                return  ResponseEntity.status(403).body(null);
            }
            return  ResponseEntity.ok(user);
        } else {
            return  ResponseEntity.status(403).body(null);
        }
    }
    
}



