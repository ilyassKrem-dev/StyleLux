package com.shop.api.payement.records;



public record RefundDto(
    String id,
    double amount,
    String currency,
    String status

) {
    
}
