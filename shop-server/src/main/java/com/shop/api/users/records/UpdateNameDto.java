package com.shop.api.users.records;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record UpdateNameDto(
    @NotEmpty(
        message="First name is required"
    )
    @Size(
        min=3,
        message="First name must be  more than 3 characters"
    )
    String fname,
    @NotEmpty(
        message="Last name is required"
    )
    @Size(
        min=3,
        message="Last name must be  more than 3 characters"
    )
    String lname
) {
    
}