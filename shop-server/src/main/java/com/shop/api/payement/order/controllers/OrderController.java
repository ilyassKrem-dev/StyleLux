package com.shop.api.payement.order.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.others.NotFoundException;
import com.shop.api.payement.service.OrderService;


@RequestMapping("/api")
@RestController
public class OrderController {
    
    private final OrderService orderService;
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    
    @PostMapping("/orders/{id}/refund")
    public ResponseEntity<?> refundOrder(
        @PathVariable(name="id") Integer id,
        @RequestHeader(name="Authorization") String authHeader
    ) {
        try {
            if(authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                return orderService.createRefund(id, token);
            } else {
                return ResponseEntity.status(403).body("Unauthorised");
            }
        } catch (IllegalArgumentException e) {
            String msg = e.getMessage();
            if(msg.startsWith("P")) {
                return ResponseEntity.status(423).body(msg);
            }
            return ResponseEntity.status(403).body("Unauthorised");
        } catch(NotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }  catch(Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());

        }
        
        
    }
    

}   
