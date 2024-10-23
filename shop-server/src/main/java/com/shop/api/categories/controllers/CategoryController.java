package com.shop.api.categories.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.FieldError;

import com.shop.api.categories.records.AddCatDto;
import com.shop.api.categories.records.CategoryDto;
import com.shop.api.categories.services.CategoryService;

import jakarta.validation.Valid;
@RequestMapping("/api")
@RestController
public class CategoryController {

    private final CategoryService categoryService;
    
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
       
    }

    @GetMapping("/categories")
    public List<CategoryDto> getAllCategories() {
        return categoryService.getCategories();
    }
    @PostMapping("/admin/categories")
    @PreAuthorize("hasRole('admin')")
    public CategoryDto addCategorie(
        @Valid @RequestBody AddCatDto cat
    ) {
        return categoryService.addCategorie(cat);
    }















    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validationErrors(
        MethodArgumentNotValidException e
    ) {
        var errors = new HashMap<String,String>();
        e.getBindingResult().getAllErrors()
                .forEach(error -> {
                    var fieldName = ((FieldError) error).getField();
                    var errorMsg = ((FieldError) error).getDefaultMessage();
                    errors.put(fieldName,errorMsg);
                });
        return new ResponseEntity<>(errors,HttpStatus.NOT_ACCEPTABLE);
    }

}
