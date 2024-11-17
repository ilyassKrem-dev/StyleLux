package com.shop.api.admin.records.products;

import com.shop.api.products.media.misc.MediaEnum;

public record MediaDto(
    boolean isDefault,
    String name,
    MediaEnum type,
    String url
) {
    
}
