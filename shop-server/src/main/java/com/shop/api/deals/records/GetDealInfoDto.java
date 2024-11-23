package com.shop.api.deals.records;


import java.util.Date;
import java.util.List;

import com.shop.api.deals.misc.DealStatusEnum;
import com.shop.api.products.records.ProductDto;

public record GetDealInfoDto(
    Integer id,
    List<ProductDto> products,
    String name,
    int discount,
    Date startDate,
    Date endDate,
    DealStatusEnum status
    


) {

}
