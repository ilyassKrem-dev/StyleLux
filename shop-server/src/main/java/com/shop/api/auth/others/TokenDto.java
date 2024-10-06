package com.shop.api.auth.others;

public record TokenDto(
    String token,
    long expiresIn
) {

}
