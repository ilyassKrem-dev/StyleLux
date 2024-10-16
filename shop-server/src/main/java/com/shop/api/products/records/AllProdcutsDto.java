package com.shop.api.products.records;

import java.util.List;


public record AllProdcutsDto(
    List<ProductDto> products,
    int pages
) 
{
    
}
