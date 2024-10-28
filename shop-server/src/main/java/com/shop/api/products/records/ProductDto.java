package com.shop.api.products.records;

import java.util.List;

import com.shop.api.categories.records.CategoryDto;
import com.shop.api.products.media.Media;
import com.shop.api.products.others.GenderEnum;
import com.shop.api.products.size.misc.SizeEnum;



public record ProductDto(
    Integer id,
    String uid,
    String name,
    Media media,
    double price,
    GenderEnum gender,
    List<SizeEnum> sizes,
    CategoryDto category,
    int quantity,
    int sold
) {

}
