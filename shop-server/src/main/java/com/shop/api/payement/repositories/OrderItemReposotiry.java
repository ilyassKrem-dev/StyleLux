package com.shop.api.payement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.api.payement.order_item.OrderItem;

public interface OrderItemReposotiry extends  JpaRepository<OrderItem,Integer> {

}
