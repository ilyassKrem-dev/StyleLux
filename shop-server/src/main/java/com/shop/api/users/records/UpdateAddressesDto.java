package com.shop.api.users.records;

import jakarta.validation.constraints.NotEmpty;

public record  UpdateAddressesDto(
    @NotEmpty(
        message = "Country is required"
    )
    String country,
    @NotEmpty(
        message = "Address is required"
    )
    String address,
    @NotEmpty(
        message = "City is required"
    )
    String city,
    @NotEmpty(
        message = "Postal Code is required"
    )
    String postalCode

) {
    
}
