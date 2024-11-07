package com.shop.api.payement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.api.payement.order_item.OrderItem;

public interface OrderItemReposotiry extends  JpaRepository<OrderItem,Integer> {


    @Query("SELECT count(product),product,sum(quantity),sum(price) from OrderItem"
        + " GROUP BY product"
        + " ORDER BY count(product) desc"
        + " LIMIT 4")
    List<Object[]> getGroupedOrderItems();
}
