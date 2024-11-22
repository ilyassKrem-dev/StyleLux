package com.shop.api.admin.services.orders;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shop.api.admin.records.orders.GetAllOrdersDto;
import com.shop.api.admin.records.orders.GetOrderDetails;
import com.shop.api.categories.records.CategoryDto;
import com.shop.api.payement.order.Order;
import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.products.media.Media;
import com.shop.api.products.media.misc.MediaEnum;
import com.shop.api.products.records.ProductDto;
import com.shop.api.users.records.GetUserReponseDto;

@Service
public class AdminOrdersMapping {
    

    public GetAllOrdersDto changeToGetAllOrdersDto(Order order) {


        return new GetAllOrdersDto(
            order.getId(), 
            order.getUid(), 
            order.getUser().getLastname() + " " + order.getUser().getFirstname(), 
            order.getUser().getId(), 
            order.getTotalAmount(), 
            order.getStatus());
    }


    public GetOrderDetails changeToGetOrderDetails(Order order) {
        
        GetUserReponseDto user = new GetUserReponseDto(
            order.getUser().getId(), 
            order.getUser().getFirstname(), 
            order.getUser().getLastname(),
            order.getUser().getEmail(), 
            order.getUser().getNumber(), 
            null);
        
        List<ProductDto> products = new ArrayList<>();
        
        for (OrderItem orderItem : order.getOrderItems()) {
            Media firstMedia = orderItem.getProduct().getMedias().stream().filter(media -> media.getIsDefault() || media.getType() == MediaEnum.image).findFirst().orElse(null);
            
            ProductDto dto = new ProductDto(
                orderItem.getId(), 
                orderItem.getProduct().getuid(), 
                orderItem.getProduct().getName(), 
                firstMedia, 
                orderItem.getPrice(), 
                orderItem.getProduct().getGender(), 
                orderItem.getProduct().getSizes().stream().map(size -> size.getSize()).collect(Collectors.toList()),
                new CategoryDto(orderItem.getProduct().getCategory().getUid(), orderItem.getProduct().getCategory().getName()), 
                orderItem.getQuantity(), 
                orderItem.getQuantity(),
                orderItem.getProduct().getCurrentDeal());
            products.add(dto);
        }


        return new GetOrderDetails(
            order.getId(), 
            order.getUid(), 
            order.getTotalAmount(), 
            order.getStatus(), 
            user, 
            products, 
            order.getAddress(),
            order.getCity(),
            order.getCountry(),
            order.getPostalCode(),
            order.getCreatedAt(),
            order.getUpdatedAt());
    }
}
