package com.shop.api.admin.records.orders;

import com.shop.api.payement.order.misc.StatusEnum;

public record GetAllOrdersDto(
    Integer id,
    String uid,
    String userName,
    Integer userId,
    double total,
    StatusEnum status
) {
    
}
