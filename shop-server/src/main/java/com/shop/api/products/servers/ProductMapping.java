package com.shop.api.products.servers;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.shop.api.categories.records.CategoryDto;
import com.shop.api.products.Product;
import com.shop.api.products.media.Media;
import com.shop.api.products.records.AllProdcutsDto;
import com.shop.api.products.records.ProductDto;
import com.shop.api.products.records.SingleProductDto;
import com.shop.api.products.size.misc.SizeEnum;

@Service
public class ProductMapping {




    public ProductDto changeToProductDto(Product product) {
        List<Media> medias = product.getMedias();
        Optional<Media> media = medias.stream()
                            .filter(Media::getIsDefault)
                            .findFirst();
        Media getMedia = media.isPresent() ? media.get() : new Media();
        
        CategoryDto dtoCat = new CategoryDto(product.getCategory().getUid(), product.getCategory().getName());
        List<SizeEnum> sizes = product.getSizes()
                                .stream()
                                .map(size -> size.getSize())
                                .collect(Collectors.toList());
        ProductDto dto = new ProductDto(
            product.getId(), 
            product.getuid(), 
            product.getName(), 
            getMedia , 
            product.getPrice(), 
            product.getGender(), 
            sizes, 
            dtoCat,
            product.getQuantity());

        return  dto;
    }

    public AllProdcutsDto changeToAllProductsDto(Page<ProductDto> products) {
        
        int numberPages = products.getTotalPages();

        return new AllProdcutsDto(products.toList(), numberPages);
    }
    public SingleProductDto changeToSingleProductDto(Product product) {
        
        List<SizeEnum> sizes = product.getSizes()
                                .stream()
                                .map(size -> size.getSize())
                                .collect(Collectors.toList());
        CategoryDto category = new CategoryDto(
            product.getCategory().getUid(), 
            product.getCategory().getName());
        return  new SingleProductDto(
            product.getId(), 
            product.getuid(), 
            product.getName(), 
            product.getMedias(), 
            product.getPrice(), 
            product.getGender(), 
            sizes, 
            category, 
            product.getQuantity(), 
            product.getRating(), 
            product.getNumRatings(),
            product.getSold());

    }
    
}
