package com.shop.api.products.servers;

import org.springframework.stereotype.Service;

import com.shop.api.products.repository.ProductRepository;

@Service
public class ProductService {

    private ProductRepository productRepository;
    private ProductMapping productMapping;

    public ProductService(ProductRepository productRepository, ProductMapping productMapping) {
        this.productRepository = productRepository;
        this.productMapping = productMapping;
    }

    
    

}
