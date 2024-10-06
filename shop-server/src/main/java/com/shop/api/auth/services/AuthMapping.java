package com.shop.api.auth.services;

import org.springframework.stereotype.Service;

import com.shop.api.auth.JwtService;
import com.shop.api.auth.others.AuthResponse;
import com.shop.api.auth.others.LoginDto;
import com.shop.api.auth.others.TokenDto;
import com.shop.api.users.User;

@Service
public class AuthMapping {
    public final JwtService jwtService;
    public final AuthenticationService authenticationService;

    public AuthMapping(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    

    public AuthResponse changeToAuthResponse(User user,TokenDto token) {
        return new AuthResponse(
            user.getFirstname(),
            user.getLastname(),
            user.getEmail(), 
            user.getId(), 
            user.getUid(), 
            user.getRole(), 
            user.getCreatedAt(),
            user.getUpdatedAt(),
            token,
            "");
        
    }
    public LoginDto changeToLoginResponse(String email ,String pass) {
        return new LoginDto(email, pass);
    }

    public TokenDto authentication(String email ,String pass) {
        User authenticatedUser = authenticationService.authenticate(this.changeToLoginResponse(email, pass));

        String jwtToken = jwtService.generateToken(authenticatedUser);
        
        TokenDto tokenRes = new TokenDto(jwtToken,jwtService.getExpirationTime());

        return tokenRes;

    }
}
