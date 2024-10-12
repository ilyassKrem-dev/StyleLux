package com.shop.api.products.size;

import com.shop.api.products.size.misc.SizeEnum;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Size {
    @Id
    @GeneratedValue
    private Integer id;

    @Enumerated(EnumType.STRING)
    private SizeEnum size;


    // Getters
    public Integer getId() {return id;}
    public SizeEnum getSize() {return size;}

    // Setters
    public void setId(Integer value) { this.id = value;}
    public void setSize(SizeEnum value) { this.size = value;}


    public Size() {

    }

    
    public Size(Integer id, SizeEnum size) {
        this.id = id;
        this.size = size;
    }

    
    
}
