package com.shop.api.admin.services.products;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.api.admin.records.products.AdminProductDto;
import com.shop.api.admin.records.products.GetAllAdminProductsDto;
import com.shop.api.admin.records.products.GetProductSaleDto;
import com.shop.api.admin.records.products.GetRecentOrder;
import com.shop.api.payement.order.Order;
import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.products.Product;
import com.shop.api.products.repository.ProductRepository;

@Service
public class AdminProductsService {
    
    private final ProductRepository productRepository;
    private final AdminProductsMapping adminProductsMapping;

    public AdminProductsService(ProductRepository productRepository, AdminProductsMapping adminProductsMapping) {
        this.productRepository = productRepository;
        this.adminProductsMapping = adminProductsMapping;
    }

    public GetAllAdminProductsDto getAllAdminProducts(
        Pageable pageable
    ) {
        Page<AdminProductDto> products = productRepository.findAllPage(pageable)
                                                .map(adminProductsMapping::changeToAdminProductDto);

        return adminProductsMapping.changeToGetAllAdminProducts(products);
    }

    public List<GetProductSaleDto> getProductSales(String uid) throws ParseException {
        Product product = productRepository.findByUid(uid);
        return adminProductsMapping.changeToGetProductSaleDto(product);
    }   

    public List<GetRecentOrder> getRecentOrders(String uid,String all) {
        Product product = productRepository.findByUid(uid);
        List<Order> orders = new ArrayList<>();
        List<OrderItem> orderItems = product.getOrderItems();
        if(orderItems.isEmpty()) {
            return new ArrayList<>();
        }
        if(all.isEmpty()) {
            orderItems.stream().limit(5).collect(Collectors.toList());
        }
        for(OrderItem item : orderItems) {
            orders.add(item.getOrder());
        }
        return adminProductsMapping.changeToRecentOrders(orders);
    }
}
