package com.shop.api.deals.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.shop.api.deals.Deal;
import com.shop.api.deals.DealRepository;
import com.shop.api.deals.misc.DealStatusEnum;
import com.shop.api.deals.records.GetDealsDto;

@Service
public class DealService {


    private final DealRepository dealRepository;
    private final DealMapping dealMapping;
    public DealService(DealRepository dealRepository,DealMapping dealMapping) {
        this.dealRepository = dealRepository;
        this.dealMapping = dealMapping;
    }

    public GetDealsDto getAllDeals(Pageable pageable) {

        Page<Deal> deals = dealRepository.findAllPagination(pageable);

        return dealMapping.changeToGetDealsDto(deals);
    }

    @Scheduled(cron="0 0/30 * * * ?")
    public void checkDeals() {
        Date now = new Date();
        List<Deal> deals = dealRepository.findAll();

        for(Deal deal : deals) {
            if(deal.getEndDate().after(now) && deal.getStartDate().before(now) && !DealStatusEnum.ongoing.equals(deal.getStatus())) {
                deal.setStatus(DealStatusEnum.ongoing);
            }
            if(deal.getEndDate().before(now) && !DealStatusEnum.finished.equals(deal.getStatus())) {
                deal.setStatus(DealStatusEnum.finished);
            }
            dealRepository.save(deal);
        }
    }
    
}   
