package com.shop.api.admin.controllers;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.admin.records.products.AddOrUpdateProductDto;
import com.shop.api.admin.records.products.GetAllAdminProductsDto;
import com.shop.api.admin.records.products.GetProductSaleDto;
import com.shop.api.admin.records.products.GetRecentOrder;
import com.shop.api.admin.services.products.AdminProductsService;
import com.shop.api.products.Product;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/admin/products")
public class AdminProductsController {
    

    private final AdminProductsService adminProductsService;

    public AdminProductsController(AdminProductsService adminProductsService) {
        this.adminProductsService = adminProductsService;
    }

    @GetMapping({"","/"})
    public ResponseEntity<GetAllAdminProductsDto> getProducts(
        @RequestParam(required=false,defaultValue = "0") int page
        ) {
        try {
            Pageable pageable = PageRequest.of(page,10);

            return ResponseEntity.ok(adminProductsService.getAllAdminProducts(pageable));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @GetMapping("/{id}/sales")
    public ResponseEntity<List<GetProductSaleDto>> getSales(
        @PathVariable(name="id") String uid
        ) {
            try {
                return ResponseEntity.ok(adminProductsService.getProductSales(uid));
            } catch(ParseException e) {
                return ResponseEntity.status(501).body(null);

            } catch(NullPointerException e) {
                return ResponseEntity.status(404).body(null);
            } catch (Exception e) {
                return ResponseEntity.status(500).body(null);

            }
        
    }
    @GetMapping("/{id}/orders")
    public ResponseEntity<List<GetRecentOrder>> getRecentOrders(
        @PathVariable(name="id") String uid,
        @RequestParam(required = false,defaultValue="") String all,
        @RequestParam(required=false,defaultValue="0") int page
        ) {
            try {
                Pageable pageable = PageRequest.of(page,15);
                return ResponseEntity.ok(adminProductsService.getRecentOrders(uid,all,pageable));
            } catch(NullPointerException e) {
                return ResponseEntity.status(404).body(null);
            } catch (Exception e) {
                return ResponseEntity.status(500).body(null);

            }
        
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<?> updateProduct(
        @PathVariable(name="id") String uid,
        @Valid @RequestBody(required = true) AddOrUpdateProductDto data) {
        try {
            
            return ResponseEntity.ok(adminProductsService.updateOrAddProduct(uid, data));
            
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(406).body(e.getMessage());
        }catch (NullPointerException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
        
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(
        @Valid @RequestBody(required = true) AddOrUpdateProductDto data
    ) {
        try {
            return ResponseEntity.ok(adminProductsService.updateOrAddProduct("",data));
        }catch (NullPointerException e) {
            return ResponseEntity.status(406).body(null);
        }catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }




    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationerror(MethodArgumentNotValidException e) {
        var errors = new HashMap<String,String>();
        e.getBindingResult().getAllErrors()
                        .forEach(error -> {
                            String fieldError = ((FieldError) error).getField();
                            String errorMsg = ((FieldError) error).getDefaultMessage();
                            errors.put(fieldError,errorMsg);
                        });
        return new ResponseEntity<>(errors,HttpStatus.NOT_ACCEPTABLE);
    }
}
