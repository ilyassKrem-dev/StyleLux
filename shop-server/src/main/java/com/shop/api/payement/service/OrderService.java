package com.shop.api.payement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.shop.api.auth.JwtService;
import com.shop.api.others.NotFoundException;
import com.shop.api.payement.order.Order;
import com.shop.api.payement.order.misc.StatusEnum;
import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.payement.records.AddressDto;
import com.shop.api.payement.records.RefundDto;
import com.shop.api.payement.repositories.OrderRepository;
import com.shop.api.users.User;
import com.stripe.exception.StripeException;
import com.stripe.model.Refund;
import com.stripe.param.RefundCreateParams;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final JwtService jwtService;
    public OrderService(OrderRepository orderRepository,JwtService jwtService) {
        this.orderRepository = orderRepository;
        this.jwtService = jwtService;
    }

    public Order createOrder(
        double amount,
        String paymentId,
        User user,
        List<OrderItem> items,
        AddressDto location) {
        Order order = new Order();
        order.setStatus(StatusEnum.pending);
        order.setTotalAmount(amount);
        order.setPaymentId(paymentId);
        order.setUser(user);
        order.setAddress(location.address());
        order.setCity(location.city());
        order.setCountry(location.region());
        order.setPostalCode(location.postalCode());
        for(OrderItem item : items) {
            item.setOrder(order);
        }
        order.setOrderItems(items);
        return orderRepository.save(order);
        
    }

    public List<Order> getUserOrders(User user,Pageable pageable) {

        return orderRepository.findByUser(user, pageable);

    }

    public ResponseEntity<RefundDto> createRefund(Integer id,String token) throws StripeException {
        Order order = orderRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("This order is not found"));
        User user = order.getUser();
        String userFromToken = jwtService.extractUsername(token);
        if(!user.getEmail().equals(userFromToken)) {
            throw new IllegalArgumentException("Unauthorised");
        }
        if(!order.getStatus().equals(StatusEnum.pending)) {
            throw new IllegalArgumentException("Product is past the pending state!");
        }
        RefundCreateParams params = RefundCreateParams.builder()
                            .setPaymentIntent(order.getPaymentId())
                            .build();
        Refund refund = Refund.create(params);
        order.setStatus(StatusEnum.refunded);
        orderRepository.save(order);
        RefundDto refundDto = new RefundDto(refund.getId(), refund.getAmount(), refund.getCurrency(), refund.getStatus());
        return ResponseEntity.ok(refundDto);
    }
}
