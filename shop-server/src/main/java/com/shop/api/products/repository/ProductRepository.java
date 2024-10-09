package com.shop.api.products.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.api.products.Product;

public interface ProductRepository extends JpaRepository<Product,Integer> {

    List<Product> findByNameContaining(String name);
}
