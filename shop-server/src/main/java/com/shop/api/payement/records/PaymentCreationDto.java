package com.shop.api.payement.records;

import java.util.List;


public record PaymentCreationDto(
    String email,
    String fullname,
    double amount,
    Integer userId,
    List<ItemDto> items,
    AddressDto fullAddress,
    String paymentId
    


) {

}
