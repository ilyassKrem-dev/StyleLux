package com.shop.api.products.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.api.products.Product;
import com.shop.api.products.others.GenderEnum;

public interface ProductRepository extends JpaRepository<Product,Integer> {

    List<Product> findByNameContaining(String name);
    

    @Query("select p from Product p join p.sizes s where"
            + "(:sizes is NULL or s.size in :sizes) and"
            +  "(:category is NULL or p.category.name = :category) and"
            + "(:gender is NULL or p.gender = :gender) and"
            + "(:minPrice is NULL or p.price >= :minPrice) and"
            + "(:maxPrice is NULL or p.price <= :maxPrice)"
            + "order by rand()")
    Page<Product> findFilterdProducts(
        List<String> sizes,
        GenderEnum gender,
        String category,
        Double minPrice, 
        Double maxPrice,
        Pageable pageable);
}
