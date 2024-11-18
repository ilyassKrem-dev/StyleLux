package com.shop.api.payement.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.products.Product;

public interface OrderItemReposotiry extends  JpaRepository<OrderItem,Integer> {


    @Query("SELECT COUNT(oi.product), oi.product, SUM(oi.quantity), SUM(oi.price) " +
       "FROM OrderItem oi " +
       "JOIN oi.order o " +
       "WHERE o.status = 'completed' " +
       "GROUP BY oi.product " +
       "ORDER BY COUNT(oi.product) DESC " +
       "LIMIT 4")
    List<Object[]> getGroupedOrderItems();

    List<OrderItem> findAllByProduct(Product product,Pageable pageable);
}
