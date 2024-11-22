package com.shop.api.deals;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.shop.api.deals.misc.DealStatusEnum;
import com.shop.api.products.Product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="deal")
public class Deal {
    

    @Id
    @GeneratedValue
    private Integer id;

    private final String uid=UUID.randomUUID().toString();

    @Column(
        nullable=false,
        length=30
    )
    private String name;

    @Column(
        nullable = false
    )
    private int discount;

    @Enumerated(EnumType.STRING)
    private DealStatusEnum status;
    @Column(
        nullable=false,
        name="end_date"
    )
    private Date endDate;
    
    @Column(
        nullable=false,
        name="start_date"
    )
    private Date startDate;

    @ManyToMany(mappedBy="deals")
    @JsonManagedReference
    private List<Product> products =new ArrayList<>();

    @CreationTimestamp
    @Column(
        updatable = false,
        name="created_at"
    )
    private Date createdAt;

    @UpdateTimestamp
    @Column(
        updatable = true,
        name="updated_at"
    )
    private Date updatedAt;



    // Getters
    public Integer getId() {return id;}
    public String getUid() {return uid;}
    public String getName() {return name;}
    public int getDiscount() {return discount;}
    public Date getStartDate() {return startDate;}
    public Date getEndDate() {return endDate;}
    public DealStatusEnum getStatus() {return status;}
    public List<Product> getProducts() {return products;}
    public Date getCreatedAt() {return createdAt;}
    public Date getUpdatedAt() {return updatedAt;}
    // Setters
    public void setName(String value) { name = value;}
    public void setDiscount(int value) { discount = value;}
    public void setStartDate(Date value) { startDate = value;}
    public void setStatus(DealStatusEnum value) {status = value;}
    public void setEndDate(Date value) { endDate = value;}
    public void setProducts(List<Product> value) { products = value;}

    public Deal() {
    }

    

    public Deal(Integer id, String name, int discount, Date endDate, Date startDate) {
        this.id = id;
        this.name = name;
        this.discount = discount;
        this.endDate = endDate;
        this.startDate = startDate;
    }

    
    
}
