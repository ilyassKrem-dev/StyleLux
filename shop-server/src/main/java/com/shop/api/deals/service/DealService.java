package com.shop.api.deals.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shop.api.deals.Deal;
import com.shop.api.deals.DealRepository;
import com.shop.api.deals.misc.DealStatusEnum;
import com.shop.api.deals.records.AddUpdateDealDto;
import com.shop.api.deals.records.GetDealInfoDto;
import com.shop.api.deals.records.GetDealsDto;
import com.shop.api.products.Product;
import com.shop.api.products.records.ProductDto;
import com.shop.api.products.repository.ProductRepository;
import com.shop.api.products.servers.ProductMapping;

@Service
public class DealService {


    private final DealRepository dealRepository;
    private final DealMapping dealMapping;
    private final ProductRepository productRepository;
    private final ProductMapping productMapping;
    public DealService(DealRepository dealRepository,DealMapping dealMapping,ProductRepository productRepository,ProductMapping productMapping) {
        this.dealRepository = dealRepository;
        this.dealMapping = dealMapping;
        this.productRepository = productRepository;
        this.productMapping = productMapping;
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

    @Transactional
    public Deal updateOrAddDeal(AddUpdateDealDto data,String type,Integer id) {
        Deal deal = new Deal();
        if(type.equals("edit")) {
            deal = dealRepository.findById(id)
                                    .orElseThrow();
        }
        deal.setDiscount(data.discount());
        deal.setName(data.name());
        deal.setStartDate(data.startDate());
        deal.setEndDate(data.endDate());
        deal.getProducts().clear();
        List<Product> products = new ArrayList<>();
        for(Integer productId : data.productIds()) {
            Product product = productRepository.findById(productId)
                                        .orElseThrow();
            product.getDeals().remove(deal);
            product.getDeals().add(deal);
            products.add(product);               
        }
        deal.setProducts(products);
        dealRepository.save(deal);
        return deal;
    }
    

    public GetDealInfoDto getDealDeatails(
        Integer id
    ) {
        Deal deal = dealRepository.findById(id)
                                    .orElseThrow();
        List<ProductDto> products = deal.getProducts().stream().map(productMapping::changeToProductDto).collect(Collectors.toList());

        return dealMapping.changeToGetDealInfoDto(deal, products);
    }  
    
    
    public List<GetDealInfoDto> getHomeDeals() {
        Pageable pageable = PageRequest.of(0,3);
        Page<Deal> deals = dealRepository.findAllByStatus(pageable,DealStatusEnum.ongoing);
        List<GetDealInfoDto> dealsChanged = new ArrayList<>();
        for(Deal deal : deals) {
            List<ProductDto> products = deal.getProducts().stream().map(productMapping::changeToProductDto).collect(Collectors.toList());
            dealsChanged.add(dealMapping.changeToGetDealInfoDto(deal, products));
        }
        return dealsChanged;     
    }
}   
