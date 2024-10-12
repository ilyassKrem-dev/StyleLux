package com.shop.api.products.controllers;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.products.servers.ProductService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.shop.api.products.Product;
import com.shop.api.products.records.ProductDto;


@CrossOrigin(origins = {"${cors.allowed.origin}"})
@RequestMapping("/api")
@RestController
public class ProductContoller {

    private final ProductService productService;

    public ProductContoller(ProductService productService) {
        this.productService = productService;
    }

    

    @GetMapping("/products")
    public List<ProductDto> getAllProducts(
        @RequestParam(required = false) String sizes,
        @RequestParam(required = false) String gender,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice
       
        ) {
        Pageable pageable = PageRequest.of(0, 9);
        
        return productService.getAllProducts(sizes, gender, category, minPrice, maxPrice, pageable);
    }
    
    

}
