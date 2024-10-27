package com.shop.api.payement;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.payement.records.OrderDto;
import com.shop.api.payement.records.PaymentCreationDto;
import com.shop.api.payement.service.PaymentService;


@RequestMapping("/api")
@RestController
public class PaymentContoller {
    private final PaymentService paymentService;

    public PaymentContoller(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    

    @PostMapping("/checkout/create_payment")
    public ResponseEntity<Map<String,String>> createPayment(
        @RequestBody PaymentCreationDto data
    ) {
        return paymentService.createPayment(data);
    }
    @PostMapping("/checkout/create_order")
    public ResponseEntity<String> createOrder(
        @RequestBody OrderDto data
    ) {
        
        return paymentService.createOrder(data);
    }
    
}
