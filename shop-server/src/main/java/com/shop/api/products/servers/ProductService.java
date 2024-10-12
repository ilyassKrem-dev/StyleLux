package com.shop.api.products.servers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.api.products.Product;
import com.shop.api.products.others.GenderEnum;
import com.shop.api.products.records.ProductDto;
import com.shop.api.products.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapping productMapping;

    public ProductService(ProductRepository productRepository, ProductMapping productMapping) {
        this.productRepository = productRepository;
        this.productMapping = productMapping;
    }

    
    public List<ProductDto> getAllProducts(
        String sizes,
        String genderStr,
        String category,
        Double minPrice,
        Double maxPrice,
        Pageable pageable
    ) {
        List<String> sizeList = sizes != null ? Arrays.asList(sizes.split(",")) : null;
            
        GenderEnum gender = null;
        if(genderStr != null) {
            gender = GenderEnum.valueOf(genderStr.toLowerCase());
        }
        System.out.println("Sizes: " + sizeList);
        System.out.println("Gender: " + gender);
        System.out.println("Category: " + category);
        System.out.println("Min Price: " + minPrice);
        System.out.println("Max Price: " + maxPrice);
        
       
        return productRepository
                .findFilterdProducts(sizeList, gender, category, minPrice, maxPrice, pageable)
                .stream()
                .map(productMapping::changeToProductDto)
                .collect(Collectors.toList());
    }

}
