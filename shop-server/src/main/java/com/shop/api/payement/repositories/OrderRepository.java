package com.shop.api.payement.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.api.payement.order.Order;
import com.shop.api.users.User;


public interface OrderRepository extends JpaRepository<Order,Integer> {


    List<Order> findByUser(User user,Pageable Pageable);
}
