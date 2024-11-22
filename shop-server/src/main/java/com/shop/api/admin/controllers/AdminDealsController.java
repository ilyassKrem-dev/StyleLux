package com.shop.api.admin.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.deals.service.DealService;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/admin/deals")
public class AdminDealsController {
    

    private final DealService dealService;

    public AdminDealsController(DealService dealService) {
        this.dealService = dealService;
    }

    
    @GetMapping({"","/"})
    public ResponseEntity<?> getDeals(
        @RequestParam(required=false,defaultValue="0") int page
        ) {
        try {
            Pageable pageable = PageRequest.of(page,15);
            return ResponseEntity.ok(dealService.getAllDeals(pageable));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    
}
