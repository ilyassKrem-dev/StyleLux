package com.shop.api.admin.records.products;

import java.util.List;


public record GetAllAdminProductsDto(
    List<AdminProductDto> products,
    int pages,
    long maxElements
) {
}