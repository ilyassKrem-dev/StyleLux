package com.shop.api.payement.user_pay_info;

import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.shop.api.users.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class UserPayInfo {

    @Id
    @GeneratedValue
    private Integer id;

    private String uid;
    @Column(
        name="stripe_customer_id",
        nullable=true
    )
    private String customerId;

    @Column(
        nullable=false
    )
    private String address;
    @Column(
        nullable=false
    )
    private String region;
    @Column(
        nullable=false
    )
    private String city;
    @Column(
        nullable=false
    )
    private String postalCode;

    @OneToOne
    @JoinColumn(
        name="user_id"
    )
    @JsonBackReference
    private User user;

     @CreationTimestamp
    @Column(
        name = "created_at",
        updatable=false
    )
    private Date createdAt;

    @UpdateTimestamp
    @Column(
        name="updated_at"
    )
    private Date updatedAt;
    
    // Getters
    public Integer getId() {return id;}
    public String getUid() {return uid;}
    public String getCustomerId() {return customerId;}
    public String getAddress() {return address;}
    public String getRegion() {return region;}
    public String getCity() {return city;}
    public String getPostalCode() {return postalCode;}
    public User getUser() {return user;}
    // Setters
    public void setId(Integer value) { id = value;}
    public void setCustomerId(String value) { customerId = value;}
    public void setAddress(String value) { address = value;}
    public void setRegion(String value) { region = value;}
    public void setCity(String value) { city = value;}
    public void setPostalCode(String value) { postalCode = value;}
    public void setUser(User value) {user = value;}
    public UserPayInfo() {
        this.uid = UUID.randomUUID().toString();
    }

    public UserPayInfo(Integer id, String customerId, String address, String region, String city, String postalCode, User user) {
        this.id = id;
        
        this.customerId = customerId;
        this.address = address;
        this.region = region;
        this.city = city;
        this.postalCode = postalCode;
        this.user = user;
    }


    
    
}
