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

import com.shop.api.auth.email.EmailServers;
import com.shop.api.auth.others.AuthResponse;
import com.shop.api.auth.others.LoginDto;
import com.shop.api.auth.others.ResetDto;
import com.shop.api.auth.others.RestoreDto;
import com.shop.api.auth.others.SignUpDto;
import com.shop.api.auth.others.TokenDto;
import com.shop.api.auth.services.AuthMapping;
import com.shop.api.auth.services.AuthenticationService;
import com.shop.api.users.User;

import jakarta.validation.Valid;
@RequestMapping("/api/auth")
@RestController
public class AuthController {

    private final AuthenticationService authenticationService;

    private final AuthMapping authMapping;
    private final EmailServers emailServers;
    public AuthController( AuthenticationService authenticationService,AuthMapping authMapping,EmailServers emailServers) {
        this.authenticationService = authenticationService;
        this.authMapping = authMapping;
        this.emailServers = emailServers;
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
    @PostMapping("/restore")
    public ResponseEntity<String> restorePassword(
        @RequestBody RestoreDto request) {
        String email = request.email();
        String code = request.code();
        String check = authenticationService.checkEmail(email);
        try {
            if(check.isEmpty()) {
                return new ResponseEntity<>("Email not found",HttpStatus.NOT_FOUND);
            } else {
                emailServers.sendVerifivatioEmail(email, code);
                return new ResponseEntity<>(check,HttpStatus.OK);
            }
            
        } catch (Exception e) {
            return new ResponseEntity<>("Something happened!",HttpStatus.BAD_GATEWAY);
        }
        
        
        
    }
    @PostMapping("/restore/pass")
    public ResponseEntity<String> changePassword(
        @RequestBody ResetDto request) {
        boolean isUpdated = authenticationService.resetPassword(request);
        if(!isUpdated) {
            return new ResponseEntity<>("Error updating password",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Updated",HttpStatus.OK);
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
