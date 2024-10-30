package com.shop.api.users.controllers;


import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.others.ChechAuth;
import com.shop.api.others.NotFoundException;
import com.shop.api.products.records.ProductDto;
import com.shop.api.users.records.GetUserOrdersDto;
import com.shop.api.users.records.GetUserReponseDto;
import com.shop.api.users.records.UpdateNameDto;
import com.shop.api.users.records.UpdateNumberDto;
import com.shop.api.users.services.UserService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final ChechAuth checkAuth;
    public UserController(UserService userService,ChechAuth checkAuth) {
        this.userService = userService;
        this.checkAuth = checkAuth;
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<GetUserReponseDto> getUser(
        @PathVariable(name="id") String uid,
        @RequestHeader(name = "Authorization") String authHeader
    ) {
        boolean auth = checkAuth.checkAuth(authHeader, uid);
        if(auth) {
            GetUserReponseDto user = userService.getSpecificUser(uid);
            return  ResponseEntity.ok(user);
        } else {
            return  ResponseEntity.status(403).body(null);
        }
    }
    
    @GetMapping("/users/{id}/orders")
    public ResponseEntity<List<GetUserOrdersDto>> getOrders(
        @PathVariable(name = "id") String uid,
        @RequestHeader(name = "Authorization") String authHeader,
        @RequestParam(required=false,defaultValue = "0") int page
    ) {
        Pageable pageable = PageRequest.of(page, 8,Sort.by(Sort.Direction.DESC,"createdAt"));
        boolean auth = checkAuth.checkAuth(authHeader, uid);
        if(auth) {
            return  ResponseEntity.ok(userService.getUserOrders(uid, pageable));
        } else {
            return ResponseEntity.status(403).body(null);
        }
    }

    @PatchMapping("/users/{id}/favorites/{productId}")
    public ResponseEntity<String>  changeFavorite(
        @PathVariable(name="id") String uid,
        @PathVariable(name="productId") String productUid,
        @RequestHeader(name= "Authorization" ) String authHeader

    ) {
        boolean auth = checkAuth.checkAuth(authHeader, uid);
        if(auth) {
            return ResponseEntity.ok(userService.changeFavorite(uid, productUid));
        } else {
            return ResponseEntity.status(403).body(null);
        }
    }
    
    @GetMapping("/users/{id}/favorites")
    public ResponseEntity<List<ProductDto>> getAllFavorites(
        @PathVariable(name = "id") String uid,
        @RequestHeader(name= "Authorization" ) String authHeader
    ) {
        boolean auth = checkAuth.checkAuth(authHeader, uid);
        if(auth) {
            List<ProductDto> favorites = userService.getAllFavorites(uid);
            return ResponseEntity.ok(favorites);
        } else {
            return ResponseEntity.status(403).body(null);
        }
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



