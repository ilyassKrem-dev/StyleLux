package com.shop.api.auth.services;
import com.shop.api.auth.others.LoginDto;
import com.shop.api.auth.others.SignUpDto;
import com.shop.api.users.User;
import com.shop.api.users.others.UserRepository;

import jakarta.validation.Valid;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(
        @Valid SignUpDto input
        ) {
        if(!input.password().equals(input.con_password())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        Optional<User> existingUser = userRepository.findByEmail(input.email());
        if (existingUser.isPresent() && !input.type().equals("google") ) {
            throw new IllegalArgumentException("Email is already in use");
        }
        
        User user = new User();
        user.setEmail(input.email());
        user.setFirstname(input.firstname());
        user.setLastname(input.lastname());
        user.setNumber(input.number());
        user.setPassword(passwordEncoder.encode(input.password()));
        user.setRole("user");
        
        return userRepository.save(user);
    }
    public User getInfo(String email) {
        if(!userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("No account found with the provided email");
        }
        return userRepository.findByEmail(email).get();
    }
    public User googleSignin(SignUpDto info) {
        User userFound;
        if(userRepository.findByEmail(info.email()).isPresent()) {
            userFound = userRepository.findByEmail(info.email()).get();
            return userFound;
        }
        User user = new User();
        user.setEmail(info.email());
        user.setLastname(info.lastname());
        user.setFirstname(info.firstname());
        user.setPassword(passwordEncoder.encode(info.password()));
        user.setRole("user");
        user.setNumber("");
        return  userRepository.save(user);
    }
    public User authenticate(
        @Valid LoginDto input) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.email(),
                            input.password()
                    )
            );
            
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Incorrect password.");
        }

        return userRepository.findByEmail(input.email())
                .orElseThrow();
    }
}