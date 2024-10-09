package com.shop.api.categories.services;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shop.api.categories.Category;
import com.shop.api.categories.CategoryRepository;
import com.shop.api.categories.records.CategoryDto;
import com.shop.api.categories.records.AddCatDto;

@Service
public class CategoryService {

    private final CategoryRepository repository;
    private final CategoryMapping categoryMapping;

    public CategoryService(CategoryRepository repository,CategoryMapping categoryMapping) {
        
        this.repository = repository;
        this.categoryMapping = categoryMapping;
    }

   
    public List<CategoryDto> getCategories() {
        return repository.findAll()
                    .stream()
                    .map(categoryMapping::changeToCategoryDto)
                    .collect(Collectors.toList());
    }

    public CategoryDto addCategorie(AddCatDto addedCat) {
        Category cat = new Category();
        cat.setName(addedCat.name());
        Category savedCat = repository.save(cat);
        return  new CategoryDto(savedCat.getUid(), savedCat.getName());
    }
}
