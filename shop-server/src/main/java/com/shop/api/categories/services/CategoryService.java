package com.shop.api.categories.services;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.shop.api.categories.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository repository;


    public CategoryService(CategoryRepository repository) {
        
        this.repository = repository;
    }

    @GetMapping("/api/categories")
    public void getCategories() {

    }
}
