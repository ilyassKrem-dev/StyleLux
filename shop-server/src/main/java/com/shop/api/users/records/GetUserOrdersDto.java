package com.shop.api.users.records;

import java.util.Date;
import java.util.List;

import com.shop.api.payement.order.misc.StatusEnum;
import com.shop.api.products.records.cart.ProductCart;

public record GetUserOrdersDto(
    Integer id,
    String uid,
    List<ProductCart> product,
    double total,
    Date placedAt,
    String address,
    StatusEnum status
) 
{
    
}
