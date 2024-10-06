package com.shop.api.auth.services;

import java.util.HashMap;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class ValidationError {

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
