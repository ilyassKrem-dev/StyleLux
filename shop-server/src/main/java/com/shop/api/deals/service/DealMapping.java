package com.shop.api.deals.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.shop.api.deals.Deal;
import com.shop.api.deals.records.DealDto;
import com.shop.api.deals.records.GetDealInfoDto;
import com.shop.api.deals.records.GetDealsDto;
import com.shop.api.products.records.ProductDto;


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

    public GetDealInfoDto changeToGetDealInfoDto(Deal deal,List<ProductDto> products) { 
        

        return new GetDealInfoDto(
            deal.getId(), 
            products,
            deal.getName(), 
            deal.getDiscount(), 
            deal.getStartDate(), 
            deal.getEndDate(), 
            deal.getStatus());
    }
}
