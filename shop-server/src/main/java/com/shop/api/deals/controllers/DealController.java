package com.shop.api.deals.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.deals.service.DealService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.shop.api.deals.records.GetDealInfoDto;


@RestController
@RequestMapping("/api/deals")
public class DealController {
    
    private final DealService dealService;

    public DealController(DealService dealService) {
        this.dealService = dealService;
    }

    
    @GetMapping("/home")
    public ResponseEntity<List<GetDealInfoDto>> getHomeDeals() {
        return ResponseEntity.ok(dealService.getHomeDeals());
    }
    
}
