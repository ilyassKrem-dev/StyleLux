package com.shop.api.admin.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.admin.services.AdminService;




@RestController
@RequestMapping("/api/admin")
public class UserAdmin {
    
    private final AdminService adminService;

    public UserAdmin(AdminService adminService) {
        this.adminService = adminService;
    }

    
    
    @GetMapping("/{id}/isadmin")
    public ResponseEntity<String> isUserAdmin(
        @PathVariable(name="id") String uid,
        @RequestHeader(name = "Authorization") String authHeader) {
            try {
                boolean isAdmin = adminService.isAdmin(uid);
                if(isAdmin) {
                    return ResponseEntity.ok("True");

                } else {
                    return ResponseEntity.ok("False");
                }
                
            } catch (Exception e) {
                return ResponseEntity.status(401).body("UNAUTHORIZED");
            }

    }
    
}
