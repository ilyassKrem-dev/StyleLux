package com.shop.api.products.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.api.products.size.Size;


public interface SizeRepository extends JpaRepository<Size,Integer> {

    List<Size> findAllBySizeIn(List<String> sizes);
}

