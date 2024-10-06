package com.shop.api.auth.others;

import java.util.Date;

public record AuthResponse(
    String firstname,
    String lastname,
    String email,
    Integer id,
    String uid,
    String role,
    Date createdAt,
    Date updatedAt,
    TokenDto token,
    String message
) {

}
