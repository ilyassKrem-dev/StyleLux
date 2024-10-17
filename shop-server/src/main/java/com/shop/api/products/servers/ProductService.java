package com.shop.api.products.servers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.api.products.Product;
import com.shop.api.products.others.GenderEnum;
import com.shop.api.products.records.AllProdcutsDto;
import com.shop.api.products.records.ProductDto;
import com.shop.api.products.records.SingleProductDto;
import com.shop.api.products.records.cart.ProductCart;
import com.shop.api.products.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapping productMapping;

    public ProductService(ProductRepository productRepository, ProductMapping productMapping) {
        this.productRepository = productRepository;
        this.productMapping = productMapping;
    }

    
    public AllProdcutsDto getAllProducts(
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

        Page<ProductDto> products = productRepository
                                .findFilterdProducts(sizeList, gender, category, minPrice, maxPrice, pageable)
                                .map(productMapping::changeToProductDto);

        AllProdcutsDto dto = productMapping.changeToAllProductsDto(products);
        return dto;
    }


    public SingleProductDto getSingleProduct(String uid) {
        Product product = productRepository.findByUid(uid);
        return productMapping.changeToSingleProductDto(product);
    }

    public List<ProductCart> getProductCarts(List<String> ids) {

        return productRepository.findProductsById(ids)
                                .stream()
                                .map(productMapping::changeToProductCart)
                                .collect(Collectors.toList());
    }
}
