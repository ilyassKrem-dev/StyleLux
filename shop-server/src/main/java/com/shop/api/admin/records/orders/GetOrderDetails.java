package com.shop.api.admin.records.orders;

import java.util.Date;
import java.util.List;

import com.shop.api.payement.order.misc.StatusEnum;
import com.shop.api.products.records.ProductDto;
import com.shop.api.users.records.GetUserReponseDto;



public record GetOrderDetails(
    Integer id,
    String uid,
    double total,
    StatusEnum status,
    GetUserReponseDto client,
    List<ProductDto> products,
    String address,
    String city,
    String country,
    String postalCode,
    Date createdAt,
    Date updatedAt
    
    
) {
    
}
