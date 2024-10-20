
package com.shop.api.payement.order_item;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.shop.api.payement.order.Order;
import com.shop.api.products.Product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class OrderItem {

    @Id
    @GeneratedValue
    private Integer id;


    @ManyToOne
    @JoinColumn(
        name = "order_id"
    )
    @JsonBackReference
    private Order order;


    @ManyToOne
    @JoinColumn(
        name="product_id"
    )
    @JsonBackReference
    private Product product;
    @Column(
        nullable = false
    )
    private int quantity;
    @Column(
        nullable = false
    )
    private double price;

    @CreationTimestamp
    @Column(
        name="created_at",
        updatable = false
    )
    private Date createdAt;
    
    @UpdateTimestamp
    @Column(
        name="updated_at"
    )
    private Date updatedAt;

    // Getters
    public Integer getId() {return id;}
    public Order getOrder() {return order;}
    public Product getProduct() {return product;}
    public Integer getQuantity() {return quantity;}
    public Double getPrice() {return price;}


    // Setters
    public void setId(Integer id) {this.id = id;}
    public void setOrder(Order order) {this.order = order;}
    public void setProduct(Product product) {this.product = product;}
    public void setQuantity(Integer quantity) {this.quantity = quantity;}
    public void setPrice(Double price) {this.price = price;}
    
    public OrderItem() {
    }

    public OrderItem(Integer id, Order order, Product product, int quantity, double price) {
        this.id = id;
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }


}
