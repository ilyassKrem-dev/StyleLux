package com.shop.api.admin.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.deals.service.DealService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.NoSuchElementException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.shop.api.deals.records.AddUpdateDealDto;



@RestController
@RequestMapping("/api/admin/deals")
public class AdminDealsController {
    

    private final DealService dealService;

    public AdminDealsController(DealService dealService) {
        this.dealService = dealService;
    }

    
    @GetMapping({"","/"})
    public ResponseEntity<?> getDeals(
        @RequestParam(required=false,defaultValue="0") int page
        ) {
        try {
            Pageable pageable = PageRequest.of(page,15);
            return ResponseEntity.ok(dealService.getAllDeals(pageable));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}/edit")
    public ResponseEntity<?> updateDeal(
        @PathVariable(name="id") Integer id, 
        @Valid @RequestBody AddUpdateDealDto data
        ) {
        try {
            
            return ResponseEntity.ok(dealService.updateOrAddDeal(data, "edit", id));
        }catch(NoSuchElementException  e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> updateDeal(
        @Valid @RequestBody AddUpdateDealDto data
        ) {
        try {
            return ResponseEntity.ok(dealService.updateOrAddDeal(data, "add", null));
        }catch(NoSuchElementException  e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }



    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationError(
        MethodArgumentNotValidException e
    ) {
        var errors = new HashMap<String,String>();
        e.getBindingResult().getAllErrors()
                            .forEach(err -> {
                                String fieldError = ((FieldError) err).getField();
                                String errorMsg = ((FieldError) err).getDefaultMessage();
                                errors.put(fieldError, errorMsg);
                            });
                            
        return new ResponseEntity<>(errors,HttpStatus.NOT_ACCEPTABLE);
    }

}
