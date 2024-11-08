package com.shop.api.admin.records.orders;




public record GetAllOrdersDto(
    Integer id,
    String uid,
    String userName,
    Integer userId,
    double total,
    int items
) {
    
}
