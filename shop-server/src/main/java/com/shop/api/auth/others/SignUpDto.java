package com.shop.api.auth.others;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record SignUpDto(
    @NotBlank(
        message = "First name is required"
    )
    String firstname,
    @NotBlank(
        message = "Last name is required"
    )
    String lastname,
    @NotEmpty(
        message="Email is required"
    )
    @Email(
        message = "Email must be valid"
    )
    String email,
    String number,
    @Size(
        min = 6,
        message="Password must be more than 6 characters"
    )
    String password,
    String con_password,
    String type
) {

}
