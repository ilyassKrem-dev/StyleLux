package com.shop.api.admin.services.orders;

import org.springframework.stereotype.Service;

import com.shop.api.admin.records.orders.GetAllOrdersDto;
import com.shop.api.payement.order.Order;

@Service
public class AdminOrdersMapping {
    

    public GetAllOrdersDto changeToGetAllOrdersDto(Order order) {


        return new GetAllOrdersDto(
            order.getId(), 
            order.getUid(), 
            order.getUser().getLastname() + " " + order.getUser().getFirstname(), 
            order.getUser().getId(), 
            order.getTotalAmount(), 
            order.getOrderItems().size());
    }
}
