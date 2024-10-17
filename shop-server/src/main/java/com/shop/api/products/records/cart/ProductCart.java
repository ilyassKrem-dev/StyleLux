package com.shop.api.products.records.cart;

import java.util.List;

import com.shop.api.products.media.Media;
import com.shop.api.products.size.misc.SizeEnum;

public record ProductCart(
    Integer id,
    String uid,
    String name,
    Media media,
    double price,
    List<SizeEnum> sizes,
    int maxQuantity
) {

}
