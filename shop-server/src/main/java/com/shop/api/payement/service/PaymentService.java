package com.shop.api.payement.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.payement.records.ItemDto;
import com.shop.api.payement.records.OrderDto;
import com.shop.api.payement.records.PaymentCreationDto;
import com.shop.api.users.User;
import com.shop.api.users.services.UserService;

@Service
public class PaymentService {


    private final OrderItemService orderItemService;
    private final OrderService orderService;
    private final UserPayInfoService userPayInfoService;
    private final StripeService stripeService;
    private final UserService userService;
    public PaymentService(OrderItemService orderItemService, OrderService orderService, UserPayInfoService userPayInfoService,StripeService stripeService,UserService userService) {
        this.orderItemService = orderItemService;
        this.orderService = orderService;
        this.userPayInfoService = userPayInfoService;
        this.stripeService = stripeService;
        this.userService = userService;
    }
    
    public ResponseEntity<Map<String,String>>  createPayment(
        PaymentCreationDto data
    ) {
        try {
            String customerId = stripeService.createStipeCustomer(data.email(), data.fullname());

            String paymentId = stripeService.createPaymentIntent(customerId, data.amount(),data.paymentId());

            User user = userService.getUser(data.userId());
            if(data.fullAddress().save()) {
                userPayInfoService.createUserPayInfoService(user, data.fullAddress(), customerId);
            }

            Map<String,String> res = new HashMap<>();
            res.put("customerId", customerId);
            res.put("paymentId",paymentId);

            return ResponseEntity.ok(res);

            
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Payment creation failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    

    public ResponseEntity<String> createOrder(OrderDto data) {
        try {
            List<OrderItem> items = new ArrayList<>();
                for(ItemDto item : data.items()) {
                    items.add(orderItemService.createItem(item.productId(), item.quantity()));
                }
            User user = userService.getUser(data.userId());
            
            orderService.createOrder(
                data.amount(), 
                data.paymentId(), 
                user, 
                items,
                data.location());

            
            return  ResponseEntity.ok("Order has been created");
        } catch (Exception e) {

            return new ResponseEntity<>("Failed to create order",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
