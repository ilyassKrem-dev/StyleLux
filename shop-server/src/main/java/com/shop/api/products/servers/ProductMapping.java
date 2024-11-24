package com.shop.api.products.servers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.shop.api.categories.records.CategoryDto;
import com.shop.api.products.Product;
import com.shop.api.products.media.Media;
import com.shop.api.products.media.misc.MediaEnum;
import com.shop.api.products.records.AllProdcutsDto;
import com.shop.api.products.records.ProductDto;
import com.shop.api.products.records.SingleProductDto;
import com.shop.api.products.records.cart.ProductCart;
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
        List<SizeEnum> sizes = new ArrayList<>();
        sizes.add(SizeEnum.xl);
        ProductDto dto = new ProductDto(
            product.getId(), 
            product.getuid(), 
            product.getName(), 
            getMedia, 
            product.getPrice(), 
            product.getGender(), 
            sizes, 
            dtoCat,
            product.getQuantity(),
            product.getSold(),
            product.getCurrentDeal());

        return  dto;
    }

    public AllProdcutsDto changeToAllProductsDto(Page<ProductDto> products) {
        
        int numberPages = products.getTotalPages();

        return new AllProdcutsDto(products.toList(), numberPages);
    }
    public SingleProductDto changeToSingleProductDto(Product product,boolean isFavorite) {
        
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
            product.getSold(),
            product.getCurrentDeal(),
            isFavorite,
            product.getEndDateDeal());

    }
    
    public ProductCart changeToProductCart(Product product) {
        Optional<Media> mediaDefault = product.getMedias()
                                    .stream()
                                    .filter(media -> media.getIsDefault())
                                    .findFirst();
        Optional<Media> mediaSecond = product.getMedias()
                                        .stream()
                                        .filter(media -> media.getType().equals(MediaEnum.image))
                                        .findFirst();
        Media media = mediaDefault.isPresent() ? mediaDefault.get() : mediaSecond.isPresent() ? mediaSecond.get() : new Media();

        List<SizeEnum> sizes = product.getSizes()
                                .stream()
                                .map(size -> size.getSize())
                                .collect(Collectors.toList());
               
        return new ProductCart(
            product.getId(), 
            product.getuid(), 
            product.getName(), 
            media, 
            product.getPrice(), 
            sizes,
            product.getQuantity() - product.getSold(),
            product.getCurrentDeal());
    }
}
