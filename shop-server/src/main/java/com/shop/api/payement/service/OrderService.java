package com.shop.api.payement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.api.payement.order.Order;
import com.shop.api.payement.order.misc.StatusEnum;
import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.payement.records.AddressDto;
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
}
