package com.shop.api.admin.records.products;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;

public record AddOrUpdateProductDto(
    @NotEmpty(
        message = "Name is required"
    )
    @Size(
        min=3,
        message="Name must be more than 3 character"
    )
    String name,
    @NotEmpty(
        message = "Category is required"
    )
    String category,
    @Min(
        value = 1,
        message="Price must be more than 0"
    )
    double price,
    @Min(
        value = 1,
        message="Quantity must be more than 0"
    )
    int quantity,
    @NotEmpty(
        message = "Gender is required"
    )
    String gender,
    @Size(
        min=1,
        message="Medias are required"
    )
    List<MediaDto> medias
) {
    
}
