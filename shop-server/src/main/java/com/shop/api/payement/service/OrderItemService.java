package com.shop.api.payement.service;


import org.springframework.stereotype.Service;

import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.payement.repositories.OrderItemReposotiry;
import com.shop.api.products.Product;
import com.shop.api.products.repository.ProductRepository;

@Service
public class OrderItemService {


    private final OrderItemReposotiry orderItemReposotiry;
    private final ProductRepository productRepository;
    public OrderItemService(OrderItemReposotiry orderItemReposotiry,ProductRepository productRepository) {
        this.orderItemReposotiry = orderItemReposotiry;
        this.productRepository = productRepository;
    }

    public OrderItem createItem(Integer id,int quantity) {
        if(id == null) {
            throw new IllegalArgumentException("Id is needed for creation of item");
        }
        Product product = productRepository.findById(id)
                                .orElseThrow();
        OrderItem orderItem = new OrderItem();
        orderItem.setPrice(product.getPrice());
        orderItem.setQuantity(quantity);
        orderItem.setProduct(product);
        product.addSold(quantity);
        productRepository.save(product);
        return  orderItemReposotiry.save(orderItem);
        
    }

}
