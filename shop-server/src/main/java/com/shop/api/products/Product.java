package com.shop.api.products;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.shop.api.categories.Category;
import com.shop.api.products.media.Media;
import com.shop.api.products.size.Size;

import java.util.ArrayList;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;

import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.shop.api.products.others.GenderEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Product {
    @Id
    @GeneratedValue
    private Integer id;

    private String uid;
    @Column(
        nullable=false
    )
    private String name;

    @ManyToMany
    @JoinTable(
        name = "product_sizes",
        joinColumns =  @JoinColumn(name="product_id"),
        inverseJoinColumns = @JoinColumn(name = "size_id")
    )
    @JsonManagedReference
    private List<Size> sizes = new ArrayList<>();

    @OneToMany(mappedBy="product",cascade=CascadeType.ALL)
    @JsonManagedReference

    private List<Media> medias = new ArrayList<>();
    @Column(
        nullable=false
    )
    private double  price;
    @Column(
        nullable=false
    )
    private int quantity;
    
    private double rating = 0.0;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    private int sold = 0;

    @ManyToOne
    @JoinColumn(
        name="category_id"
    )
    @JsonBackReference
    private Category category;
    
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
    // Getters
    public Integer getId() {return id;}
    public String getuid() {return uid;}
    public String getName() {return name;}
    public List<Media> getMedias() {return medias;}
    public double getPrice() {return price;}
    public double getRating() {return rating;}
    public int getQuantity() {return quantity;}
    public int getSold() {return sold;}
    public List<Size> getSizes() {return sizes;}
    public GenderEnum getGender() {return gender;}
    public Category getCategory() {return category;}
    // Setters
    public void setId(Integer value) { this.id = value;}
    public void setName(String value) { this.name = value;}
    public void setMedias(List<Media> valueList) { this.medias = valueList;}
    public void setQuantity(int value) {this.quantity = value;}
    public void setPrice(double value) { this.price = value;}
    public void setRating(double value) { this.rating = value;}
    public void setSizes(List<Size> valueList) { this.sizes = valueList;}
    public void setGender(GenderEnum value) {this.gender = value;}
    public void setSold(int value) { this.sold = value;}



    public Product() {
        this.uid = UUID.randomUUID().toString();
    }

    public Product(Integer id, String uid, String name, double price, int quantity,GenderEnum gender,int sold) {
        this.id = id;
        this.uid = uid;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.gender = gender;
        this.uid = UUID.randomUUID().toString();
        this.sold = sold;
    }

    public void addMedia(Media media) {
        if(media==null) return;
        medias.add(media);
    }

    public void addSizes(Size size) {
        if(size==null) return;
        sizes.add(size);
    }

    public void addSold(int value) {
        this.sold += value;
    }
    
}
