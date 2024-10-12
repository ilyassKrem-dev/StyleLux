package com.shop.api.auth.others;

public record RestoreDto(
    String email,
    String code
) {

}
