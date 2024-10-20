package com.shop.api.payement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.api.payement.order.Order;

public interface OrderRepository extends JpaRepository<Order,Integer> {

}
