package com.shop.api.admin.records.products;

public record AdminProductDto(
    Integer id,
    String uid,
    String name,
    String category,
    double price,
    int stock
) {
    
}
