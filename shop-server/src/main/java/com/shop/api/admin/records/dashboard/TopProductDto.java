package com.shop.api.admin.records.dashboard;



public record TopProductDto(
    Integer id,
    String uid,
    String name,
    double total,
    int sold
) {
    
}
