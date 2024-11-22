package com.shop.api.deals.records;

import java.util.Date;

import com.shop.api.deals.misc.DealStatusEnum;

public record DealDto(
    Integer id,
    String name,
    DealStatusEnum status,
    Date startDate,
    Date endDate
) {
    
}
