package com.shop.api.users.records;

import com.shop.api.payement.records.AddressDto;

public record GetUserReponseDto(
    Integer id,
    String firstName,
    String lastName,
    String email,
    String number,
    AddressDto addresses
) {

}
