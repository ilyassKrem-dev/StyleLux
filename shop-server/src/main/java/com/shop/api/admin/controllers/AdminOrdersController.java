package com.shop.api.admin.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.admin.records.orders.GetAllOrdersDto;
import com.shop.api.admin.services.orders.AdminOrdersService;


@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrdersController {

    private final AdminOrdersService adminOrdersService;

    public AdminOrdersController(AdminOrdersService adminOrdersService) {
        this.adminOrdersService = adminOrdersService;
    }


    


    @GetMapping("")
    public ResponseEntity<List<GetAllOrdersDto>> getAllOrders(
        @RequestParam(required=false,defaultValue = "0") int page
    ) {
        Pageable pageable = PageRequest.of(page, 15);

        try {
            return ResponseEntity.ok(adminOrdersService.getAllOrders(pageable));
        } catch (Exception e) {
            return  ResponseEntity.status(500).body(null);

        }
        
    }
   
}
