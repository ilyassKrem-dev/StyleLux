package com.shop.api.admin.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.admin.records.orders.GetAllOrdersDto;
import com.shop.api.admin.records.orders.GetOrderDetails;
import com.shop.api.admin.services.orders.AdminOrdersService;


@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrdersController {

    private final AdminOrdersService adminOrdersService;

    public AdminOrdersController(AdminOrdersService adminOrdersService) {
        this.adminOrdersService = adminOrdersService;
    }


    


    @GetMapping({"","/"})
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
    @GetMapping("/search")
    public ResponseEntity<List<GetAllOrdersDto>> getSearchResults(
        @RequestParam(name="value") String param
        ) {
        return ResponseEntity.ok(adminOrdersService.getAllSearchResults(param));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<GetOrderDetails> getOrderDetails(
        @PathVariable(name="id") Integer id
    ) {
        try {
            return ResponseEntity.ok(adminOrdersService.getOrderDetails(id));

        } catch (NoSuchElementException | NullPointerException e) {
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);

        }
    }
}
