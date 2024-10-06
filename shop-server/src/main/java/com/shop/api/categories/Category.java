package com.shop.api.categories;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

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
    private String description;

    //Getters
    public Integer getId() {return id;}
    public String getUid() {return uid;}
    public String getName() {return name;}
    public String getDescription() {return description;}

    //Setters
    public void setId(Integer value) {this.id = value;}
    public void setName(String value) {this.name = value;}
    public void setDescription(String value) {this.description = value;}

    @Autowired
    public Category() {
        this.uid = UUID.randomUUID().toString();
    }

    public Category(Integer id, String name, String description ) {
        this.id = id;
        this.name = name;
        this.description = description;
    
    }
    

    

}
