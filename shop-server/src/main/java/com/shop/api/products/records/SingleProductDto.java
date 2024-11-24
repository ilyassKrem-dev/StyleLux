package com.shop.api.products.records;



import com.shop.api.categories.records.CategoryDto;
import com.shop.api.products.media.Media;
import com.shop.api.products.others.GenderEnum;
import com.shop.api.products.size.misc.SizeEnum;
import java.util.List;
import java.util.Date;


public record SingleProductDto(
    Integer id,
    String uid,
    String name,
    List<Media> media,
    double price,
    GenderEnum gender,
    List<SizeEnum> sizes,
    CategoryDto category,
    int quantity,
    double rating,
    int numRatings,
    int sold,
    int discount,
    boolean isFavorite,
    Date dealEndDate

)
{
    
}
