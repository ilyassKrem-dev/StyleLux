package com.shop.api.admin.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.admin.records.dashboard.GraphDto;
import com.shop.api.admin.records.dashboard.SummeryDto;
import com.shop.api.admin.records.dashboard.TopProductDto;
import com.shop.api.admin.services.dashboard.DashboardService;




@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    

    @GetMapping("/summery")
    public ResponseEntity<SummeryDto> getSummery() {
        try {
            return ResponseEntity.ok(dashboardService.getSummery());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @GetMapping("/graph")
    public ResponseEntity<GraphDto> getGraphSummery() {
        try {
            return ResponseEntity.ok(dashboardService.getGraphSummery());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @GetMapping("/top")
    public ResponseEntity<List<TopProductDto>> getTopProducts() {
        try {
            return ResponseEntity.ok(dashboardService.getTopProducts());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

}
