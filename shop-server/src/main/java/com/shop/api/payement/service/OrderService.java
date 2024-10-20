package com.shop.api.payement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shop.api.payement.order.Order;
import com.shop.api.payement.order.misc.StatusEnum;
import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.payement.repositories.OrderRepository;
import com.shop.api.users.User;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(
        double amount,
        String paymentId,
        User user,
        List<OrderItem> items) {
        Order order = new Order();
        order.setStatus(StatusEnum.pending);
        order.setTotalAmount(amount);
        order.setPaymentId(paymentId);
        order.setUser(user);
        for(OrderItem item : items) {
            item.setOrder(order);
        }
        order.setOrderItems(items);
        return orderRepository.save(order);
        
    }
}
