package com.shop.api.users.records;

import jakarta.validation.constraints.NotEmpty;

public record UpdateNumberDto(
    @NotEmpty(
            message="Number must be valid"
        )
    String number
) {

}