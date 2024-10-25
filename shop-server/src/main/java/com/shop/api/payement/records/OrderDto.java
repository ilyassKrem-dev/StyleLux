package com.shop.api.payement.records;

import java.util.List;

public record OrderDto(
    List<ItemDto> items,
    double amount,
    Integer userId,
    String paymentId,
    AddressDto location

) 
{
    
}
