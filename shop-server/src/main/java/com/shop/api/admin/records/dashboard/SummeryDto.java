package com.shop.api.admin.records.dashboard;



public record SummeryDto(
    double sales,
    int ordersPending,
    int shipping,
    double oldSales,
    int oldOrdersPending,
    int oldShipping
) {
    
}
