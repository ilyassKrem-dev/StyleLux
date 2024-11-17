package com.shop.api.admin.services.products;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.api.admin.records.products.AddOrUpdateProductDto;
import com.shop.api.admin.records.products.AdminProductDto;
import com.shop.api.admin.records.products.GetAllAdminProductsDto;
import com.shop.api.admin.records.products.GetProductSaleDto;
import com.shop.api.admin.records.products.GetRecentOrder;
import com.shop.api.admin.records.products.MediaDto;
import com.shop.api.categories.Category;
import com.shop.api.categories.CategoryRepository;
import com.shop.api.payement.order.Order;
import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.payement.repositories.OrderItemReposotiry;
import com.shop.api.products.Product;
import com.shop.api.products.media.Media;
import com.shop.api.products.others.GenderEnum;
import com.shop.api.products.repository.ProductRepository;

@Service
public class AdminProductsService {
    
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final AdminProductsMapping adminProductsMapping;
    private final OrderItemReposotiry orderItemReposotiry;
    public AdminProductsService(ProductRepository productRepository, AdminProductsMapping adminProductsMapping,OrderItemReposotiry orderItemReposotiry, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.adminProductsMapping = adminProductsMapping;
        this.orderItemReposotiry = orderItemReposotiry;
        this.categoryRepository = categoryRepository;
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

    public List<GetRecentOrder> getRecentOrders(String uid,String all,Pageable pageable) {
        Product product = productRepository.findByUid(uid);
        List<Order> orders = new ArrayList<>();
        List<OrderItem> orderItems = orderItemReposotiry.findAllByProduct(product, pageable);
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

    public Product updateOrAddProduct(String uid, AddOrUpdateProductDto data) {
        Product product;
        if(uid.isEmpty()) {
            product = new Product();
        } else {
            product = productRepository.findByUid(uid);
        }
        product.setName(data.name());
        Optional<Category> category = categoryRepository.findByName(data.category());
        if(category.isPresent()) {
            product.setCategory(category.get());
        }
        product.setPrice(data.price());
        product.setQuantity(data.quantity());
    
        List<Media> medias = new ArrayList<>();
        product.getMedias().clear();
        boolean isDefaultFound = false;
        for(MediaDto media : data.medias()) {
            if(media.isDefault()) isDefaultFound = true;
            Media newMedia = new Media();
            newMedia.setIsDefault(media.isDefault());
            newMedia.setType(media.type());
            newMedia.setUrl(media.url());
            newMedia.setProduct(product);
            medias.add(newMedia);
        }
        product.getMedias().addAll(medias);
        if(!isDefaultFound) {
            product.getMedias().get(0).setIsDefault(true);

        }
        product.setGender(data.gender().equals("f")?GenderEnum.f : GenderEnum.m);
        
        productRepository.save(product);

        return product;
    }
    

}
