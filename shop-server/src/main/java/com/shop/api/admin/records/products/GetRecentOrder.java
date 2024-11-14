package com.shop.api.admin.records.products;

import com.shop.api.payement.order.misc.StatusEnum;

public record GetRecentOrder(
    Integer id,
    double total,
    StatusEnum status,
    String date,
    String clientName
) {
    
}
