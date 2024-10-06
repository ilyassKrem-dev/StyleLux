package com.shop.api.auth.others;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record SignUpDto(
    @NotEmpty(
        message = "First name is required"
    )
    String firstname,
    @NotEmpty(
        message = "Last name is required"
    )
    String lastname,
    @Email(
        message = "Email must be valid"
    )
    String email,
    @NotEmpty(
        message = "Password is required"
    )
    @Size(
        min = 6
    )
    String number,
    String password,
    String con_password
) {

}
