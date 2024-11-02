package com.shop.api.users.controllers;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.others.ChechAuth;
import com.shop.api.others.NotFoundException;
import com.shop.api.users.records.UpdateAddressesDto;
import com.shop.api.users.records.UpdateNameDto;
import com.shop.api.users.records.UpdateNumberDto;
import com.shop.api.users.services.UserService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api")
public class UserInfoController {
    private final UserService userService;
    private final ChechAuth checkAuth;
    public UserInfoController(UserService userService,ChechAuth checkAuth) {
        this.userService = userService;
        this.checkAuth = checkAuth;
    }

        
    @PatchMapping("/users/{id}/name/update")
    public ResponseEntity<String> updateFullName(
        @PathVariable(name="id") String uid,
        @Valid @RequestBody UpdateNameDto fullName,
        @RequestHeader(name= "Authorization" ) String authHeader
    ) {
        try {
            boolean auth = checkAuth.checkAuth(authHeader, uid);
            if(auth) {
                String updated = userService.updateFullName(fullName, uid);
                return ResponseEntity.ok(updated);
            } else {
                return ResponseEntity.status(403).body("Forbidden");
            }
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(406).body(e.getMessage());
 
        } catch(NullPointerException e) {
            return ResponseEntity.status(404).body("No user found");
        }  
        catch(Exception e) {
            return ResponseEntity.status(500).body("Something happened");
        } 
    }
    @PatchMapping("/users/{id}/number/update")
    public ResponseEntity<String> updatePhoneNumber(
        @PathVariable(name="id") String uid,
        @Valid @RequestBody UpdateNumberDto number,
        @RequestHeader(name= "Authorization" ) String authHeader
    ) {
        try {
            
            boolean auth = checkAuth.checkAuth(authHeader, uid);
            if(auth) {
                String updated = userService.updateNumber(number.number(), uid);
                return ResponseEntity.ok(updated);
            } else {
                return ResponseEntity.status(403).body("Forbidden");
            }
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(406).body(e.getMessage());
 
        } catch(NullPointerException e) {
            return ResponseEntity.status(404).body("No user found");
        }  
        catch(Exception e) {
            return ResponseEntity.status(500).body("Something happened");
        } 
    }

    @PatchMapping("/users/{id}/address/update")
    public ResponseEntity<String> changeAddresses(
        @PathVariable(name="id") String uid,
        @RequestHeader(name= "Authorization" ) String authHeader,
        @Valid @RequestBody UpdateAddressesDto addressesDto    
        ) {
            try {
                boolean auth = checkAuth.checkAuth(authHeader, uid);
                if(auth) {
                    String check = userService.updateAddresses(addressesDto, uid);
                    return ResponseEntity.ok(check);
                } else {
                    return ResponseEntity.status(403).body("Forbidden");
                }
                
            } catch (NotFoundException e) {
                return ResponseEntity.status(404).body(e.getMessage());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(406).body(e.getMessage());
     
            } catch(NullPointerException e) {
                return ResponseEntity.status(404).body("No user found");
            }  
            catch(Exception e) {
                return ResponseEntity.status(500).body("Something happened");
            } 
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validationHandler(
        MethodArgumentNotValidException e
        ) {
        var errors = new HashMap<String,String>();
        e.getBindingResult().getAllErrors()
                            .forEach(error -> {
                                String fieldName = ((FieldError)error).getField();
                                String msgError = ((FieldError) error).getDefaultMessage();
                                errors.put(fieldName,msgError);
                            });

        return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);            
    }
}
