package com.shop.api.payement.order;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.shop.api.payement.order.misc.StatusEnum;
import com.shop.api.users.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Date;
import java.util.UUID;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.shop.api.payement.order_item.OrderItem;

@Entity
@Table(name = "`order`")
public class Order {


    @Id
    @GeneratedValue
    private Integer id;

    private String uid;

    @ManyToOne
    @JoinColumn(
        name = "user_id"
    )
    @JsonBackReference
    private User user;

    @Column(
        nullable=false
    )
    private double totalAmount;

    @Column(
        nullable=false
    )
    @Enumerated(EnumType.STRING)
    private StatusEnum status; 

    @Column(
        name="payment_id",
        nullable=false
    )
    private String paymentId;

    @OneToMany(mappedBy="order",cascade=CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> orderItems;

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
    public double getTotalAmount() {return totalAmount;}
    public StatusEnum getStatus() {return status;}
    public String getPaymentId() {return paymentId;}
    public Date getCreatedAt() {return createdAt;}
    public Date getUpdatedAt() {return updatedAt;}
    public List<OrderItem> getOrderItems() {return orderItems;}
    public User getUser() {return  user;}


    // Setters
    public void setId(Integer  value) { id = value;}
    public void setTotalAmount(double  value ) { totalAmount = value;}
    public void setStatus(StatusEnum value) { status = value;}
    public void setPaymentId(String value) { paymentId = value;}
    public void setUpdatedAt(Date value) { updatedAt = value;}
    public void setUser(User value) { user = value;}
    public void setOrderItems(List<OrderItem> value) { orderItems = value;}


    public Order() {
        this.uid = UUID.randomUUID().toString();

    }

    public Order(Integer id, User user, double totalAmount, StatusEnum status, String paymentId) {
        this.id = id;
        this.user = user;
        this.totalAmount = totalAmount;
        this.status = status;
        this.paymentId = paymentId;

    }






    
}
