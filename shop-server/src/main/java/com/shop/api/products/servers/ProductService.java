package com.shop.api.products.servers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.api.auth.JwtService;
import com.shop.api.products.Product;
import com.shop.api.products.others.GenderEnum;
import com.shop.api.products.records.AllProdcutsDto;
import com.shop.api.products.records.ProductDto;
import com.shop.api.products.records.SingleProductDto;
import com.shop.api.products.records.cart.ProductCart;
import com.shop.api.products.repository.ProductRepository;
import com.shop.api.users.User;
import com.shop.api.users.others.UserRepository;


@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapping productMapping;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    public ProductService(ProductRepository productRepository, ProductMapping productMapping,JwtService jwtService,UserRepository userRepository) {
        this.productRepository = productRepository;
        this.productMapping = productMapping;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    
    public Product getProductByUid(String uid) {
        return productRepository.findByUid(uid);
    }
    public AllProdcutsDto getAllProducts(
        String genderStr,
        String category,
        Double minPrice,
        Double maxPrice,
        Pageable pageable
    ) {
        
            
        GenderEnum gender = null;
        if(genderStr != null) {
            gender = GenderEnum.valueOf(genderStr.toLowerCase());
        }

        Page<ProductDto> products = productRepository
                                .findFilterdProducts(gender, category, minPrice, maxPrice, pageable)
                                .map(productMapping::changeToProductDto);

        AllProdcutsDto dto = productMapping.changeToAllProductsDto(products);
        return dto;
    }


    public SingleProductDto getSingleProduct(String uid,String authHeader) {
        boolean isFavorite = false;
        Product product = productRepository.findByUid(uid);

        
        if(authHeader != null && authHeader.startsWith("Bearer ") && authHeader.substring(7).length() > 2) {
            String token = authHeader.substring(7);
            String userFromToken = jwtService.extractUsername(token);
            Optional<User> user = userRepository.findByEmail(userFromToken);
            if(user.isPresent() && user.get().getFavorites().contains(product)) {
                isFavorite = true;
            }
        }
        return productMapping.changeToSingleProductDto(product,isFavorite);
    }

    public List<ProductCart> getProductCarts(List<String> ids) {

        return productRepository.findProductsById(ids)
                                .stream()
                                .map(productMapping::changeToProductCart)
                                .collect(Collectors.toList());
    }



    public List<ProductDto> getProductsByQuery(String param) {
        List<ProductDto> products = new ArrayList<>();
        if(!param.isEmpty()) {
            products = productRepository.findAllContaining(param)
            .stream()
            .limit(6)
            .map(productMapping::changeToProductDto)
            .collect(Collectors.toList());
        }
        return products;

    }
}
