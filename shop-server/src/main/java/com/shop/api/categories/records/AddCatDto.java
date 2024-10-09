package com.shop.api.categories.records;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record AddCatDto(
    @NotEmpty(
        message="Name is required"
    )
    @Size(
        min=2,
        message="Name should be more the 2 character"
    )
    String name
) {

}
