package com.shop.api.admin.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.admin.records.users.GetSimpleUserDto;
import com.shop.api.admin.services.users.AdminUsersService;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUsersController {
    
    private final AdminUsersService adminUsersService;

    public AdminUsersController(AdminUsersService adminUsersService) {
        this.adminUsersService = adminUsersService;
    }

    
    @GetMapping("/{id}/simple")
    public ResponseEntity<GetSimpleUserDto> getSimpleUserInfo(
        @PathVariable(name="id") Integer id
    ) {

        try {
            return ResponseEntity.ok(adminUsersService.getSimpleUser(id));
        } catch(NullPointerException e) {
            return ResponseEntity.status(404).body(null);
        }   catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

}
