package com.shop.api.products.media;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.shop.api.products.Product;
import com.shop.api.products.media.misc.MediaEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Media {
    @Id
    @GeneratedValue
    private Integer id;

    private String uid;

    @Column(
        nullable = false
    )

    @Enumerated(EnumType.STRING)
    private MediaEnum type; 
    @Column(
        nullable = false
    )
    private String url;
    @ManyToOne
    @JoinColumn(
        name="product_id"
    )
    @JsonBackReference
    private Product product;

    // Getters
    public Integer getId() {return  this.id;}
    public String getUid() {return  this.uid;}
    public MediaEnum getType() {return  this.type;}
    public String getUrl() {return  this.url;}

    // Setters
    public void setId(Integer value) {this.id = value;}
    public void setUid(String value) {this.uid = value;}
    public void setType(MediaEnum value) { this.type = value;}
    public void setUrl(String value) {this.url = value;}



    public Media() {
        this.uid = UUID.randomUUID().toString();
    }

    
    public Media(Integer id, MediaEnum type, String url,Product product) {
        this.id = id;
        this.type = type;
        this.product = product;
        this.url = url;
    }


    
}

