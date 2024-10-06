package com.shop.api.auth.others;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record LoginDto(
    @Email
    @NotEmpty
    String email,
    @NotEmpty
    String password
) {

}
