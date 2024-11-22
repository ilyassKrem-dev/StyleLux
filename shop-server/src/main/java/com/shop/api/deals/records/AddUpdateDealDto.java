package com.shop.api.deals.records;

import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;



public record AddUpdateDealDto(
    @Size(
        min=1,
        message = "Products id is required"
    )
    List<Integer> productIds,
    @NotEmpty(
        message = "Name is required"
    )
    String name,
    @NotNull(
        message = "Discount is required"
    )
    Integer discount,
    @NotNull(
        message = "Starting date is required"
    )
    Date startDate,
    @NotNull(
        message = "Ending date is required"
    )
    Date endDate
) {
    
}
