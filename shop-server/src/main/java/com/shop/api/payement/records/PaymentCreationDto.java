package com.shop.api.payement.records;



public record PaymentCreationDto(
    String email,
    String fullname,
    double amount,
    Integer userId,
    AddressDto fullAddress,
    String paymentId
    


) {

}
