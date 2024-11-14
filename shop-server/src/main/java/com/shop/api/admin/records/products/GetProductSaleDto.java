package com.shop.api.admin.records.products;



public record GetProductSaleDto(
    String month,
    String year,
    double sales,
    int quantity
) {
    
}
