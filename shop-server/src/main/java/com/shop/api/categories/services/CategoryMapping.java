package com.shop.api.categories.services;

import org.springframework.stereotype.Service;

import com.shop.api.categories.Category;
import com.shop.api.categories.records.CategoryDto;

@Service
public class CategoryMapping {



    public CategoryDto changeToCategoryDto(Category cat) {
        return  new CategoryDto(cat.getUid(), cat.getName());
    }
}
