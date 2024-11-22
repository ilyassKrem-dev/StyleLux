package com.shop.api.deals.records;

import java.util.List;

public record GetDealsDto(
    List<DealDto> deals,
    int pages,
    long maxElements
) {
    
}
