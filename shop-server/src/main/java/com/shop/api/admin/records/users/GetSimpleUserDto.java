package com.shop.api.admin.records.users;




public record  GetSimpleUserDto(
    Integer id,
    String uid,
    String firstName,
    String lastName,
    String email,
    String number
    
) {
    
}
