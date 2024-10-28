package com.shop.api.users.controllers;


import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.shop.api.others.ChechAuth;
import com.shop.api.products.records.ProductDto;
import com.shop.api.users.records.GetUserOrdersDto;
import com.shop.api.users.records.GetUserReponseDto;
import com.shop.api.users.services.UserService;


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
    
}



