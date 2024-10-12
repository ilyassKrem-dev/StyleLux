package com.shop.api.auth.others;



public record  ResetDto(
    String uid,
    String password,
    String con_password,
    String email
){
    
}
