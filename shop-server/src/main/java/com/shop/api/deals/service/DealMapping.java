package com.shop.api.deals.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.shop.api.deals.Deal;
import com.shop.api.deals.records.DealDto;
import com.shop.api.deals.records.GetDealsDto;


@Service
public class DealMapping {
    

    public DealDto changeToDealDto(Deal deal) {

        return new DealDto(
            deal.getId(), 
            deal.getName(), 
            deal.getStatus(), 
            deal.getStartDate(), 
            deal.getEndDate());
    }

    public GetDealsDto changeToGetDealsDto(Page<Deal> deals) {
        return new GetDealsDto(
        deals.map(this::changeToDealDto).toList(), 
        deals.getTotalPages(),
        deals.getTotalElements());
    }
}
