package com.shop.api.auth.controllers;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.shop.api.auth.others.AuthResponse;
import com.shop.api.auth.others.LoginDto;
import com.shop.api.auth.others.SignUpDto;
import com.shop.api.auth.others.TokenDto;
import com.shop.api.auth.services.AuthMapping;
import com.shop.api.auth.services.AuthenticationService;
import com.shop.api.users.User;

import jakarta.validation.Valid;
@CrossOrigin(origins = {"${cors.allowed.origin}"})
@RequestMapping("/api/auth")
@RestController
public class AuthController {

    private final AuthenticationService authenticationService;

    private final AuthMapping authMapping;

    public AuthController( AuthenticationService authenticationService,AuthMapping authMapping) {
        this.authenticationService = authenticationService;
        this.authMapping = authMapping;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(
       @Valid @RequestBody SignUpDto dto
    ) {
       
        try {
            User registered;
            TokenDto token;
            if(dto.type().equals("google")) {
                registered = authenticationService.googleSignin(dto);
            } else {
                registered = authenticationService.signup(dto);   
            }

           token = authMapping.authentication(dto.email(),dto.password());

            return ResponseEntity.ok(authMapping.changeToAuthResponse(registered,token));

        } catch (IllegalArgumentException e) {
            String message = e.getMessage();
            if(null == message) {
                return ResponseEntity.badRequest().body(new AuthResponse(null,null,null, null, null, null, null, null, null, message));
            } else return switch (message) {
                case "Passwords do not match" -> ResponseEntity.badRequest().body(new AuthResponse(null,null,null, null, null, null, null, null, null, "con_password:"+message));
                case "Email is already in use" -> ResponseEntity.badRequest().body(new AuthResponse(null,null,null, null, null, null, null, null, null, "email:"+message));
                default -> ResponseEntity.badRequest().body(new AuthResponse(null,null,null, null, null, null, null, null, null, message));
            };
        }
        
    }       
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
        @Valid @RequestBody LoginDto info) {
        try {
            User user = authenticationService.getInfo(info.email());
            TokenDto token = authMapping.authentication(info.email(),info.password());
    
            return  ResponseEntity.ok(authMapping.changeToAuthResponse(user, token));
            
        } catch (IllegalArgumentException e) {
            String message = e.getMessage();
            if("Incorrect password.".equals(message)) {
                return ResponseEntity.badRequest().body(new AuthResponse(null,null,null, null, null, null, null, null, null, "password:"+message));

            } else {
                return ResponseEntity.badRequest().body(new AuthResponse(null,null,null, null, null, null, null, null, null, "email:"+message));
            }
        }


    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validationError(
        MethodArgumentNotValidException e
    ) {
        var errors = new HashMap<String,String>();
        e.getBindingResult().getAllErrors()
                .forEach(error -> {
                    var errorName = ((FieldError) error).getField();
                    var errorMessage = ((FieldError) error).getDefaultMessage();
                    errors.put(errorName,errorMessage);
                });
        
        return new ResponseEntity<>(errors,HttpStatus.NOT_ACCEPTABLE);
    }

}
