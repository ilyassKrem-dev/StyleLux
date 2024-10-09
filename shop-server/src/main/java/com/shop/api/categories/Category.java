package com.shop.api.categories;

import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.shop.api.products.Product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Category {
    @Id
    @GeneratedValue
    private Integer id;
    private String uid;
    @Column(
        unique=true,
        length=30   
    )
    private String name;

    //Getters
    public Integer getId() {return id;}
    public String getUid() {return uid;}
    public String getName() {return name;}

    //Setters
    public void setId(Integer value) {this.id = value;}
    public void setName(String value) {this.name = value;}

    @CreationTimestamp
    @Column(
        name="created_at",
        updatable=false
    )
    private Date createdAt;

    @UpdateTimestamp()
    @Column(
        name="updated_at",
        updatable=true
    )
    private Date updatedAt;
    
    @OneToMany(mappedBy="category")
    @JsonManagedReference
    public List<Product> products;

    @Autowired
    public Category() {
        this.uid = UUID.randomUUID().toString();
    }

    public Category(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    

    

}
