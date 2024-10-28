package com.shop.api.users;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.shop.api.payement.order.Order;
import com.shop.api.payement.user_pay_info.UserPayInfo;
import com.shop.api.products.Product;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class User implements  UserDetails {

    @Id
    @GeneratedValue
    private Integer id;

    private String uid;
    @Column(
        length=20,
        nullable=false
    )
    private String firstname;
    @Column(
        length=20,
        nullable=false
    )
    private String lastname;
    @Column(
        nullable=true
    )
    private String number;
    @Column(
        nullable=false
    )
    private String password;
    @Column(
        unique=true,
        nullable=false
    )
    private String email;
    @Column(
        nullable=false
    )
    private String role;
    @CreationTimestamp
    @Column(
        updatable = false,name = "created_at"
    )
    private Date createdAt;
    @UpdateTimestamp
    @Column(
        name="updated_at"
    )
    private Date updatedAt;
    

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name="user_favorites",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    ) 
    private List<Product> favorites = new ArrayList<>();


    @OneToOne(mappedBy="user",cascade=CascadeType.ALL)
    @JsonManagedReference
    private UserPayInfo userPayInfo;

    @OneToMany(mappedBy="user",cascade=CascadeType.ALL)
    @JsonManagedReference
    private List<Order> orders;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() ->"ROLE_" + role);
    }
    
    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
    // Getters
    public Integer getId() {return  this.id;}
    public String getUid() {return  this.uid;}
    public String getFirstname() {return  this.firstname;}
    public String getLastname() {return  this.lastname;}
    public String getNumber() {return  this.number;}
    public UserPayInfo getUserPayInfo() {return this.userPayInfo;}
    @Override
    public String getPassword() {return  this.password;}
    public String getEmail() {return  this.email;}
    public String getRole() {return this.role;}
    public Date getCreatedAt() {return this.createdAt;}
    public Date getUpdatedAt() {return this.updatedAt;}
    public List<Product> getFavorites() {return favorites;}
    // Setters
    public void setId(Integer value) { this.id = value;}
    public void setFirstname(String value) {  this.firstname = value;}
    public void setLastname(String value) {  this.lastname = value;}
    public void setNumber(String value) {  this.number = value;}
    public void setPassword(String value) {  this.password = value;}
    public void setEmail(String value) {  this.email = value;}
    public void setRole(String value) {  this.role = value;}
    public void getCreatedAt(Date value) { this.createdAt = value;}
    public void getUpdatedAt(Date value) { this.updatedAt = value;}
   
    
    public User() {
        this.uid = UUID.randomUUID().toString();
    }

    public User(Integer id, String firstname, String lastname, String number, String password, String email) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.number = number;
        this.password = password;
        this.email = email;
    }
    
    public void addFavorite(Product product) {
        if(favorites.contains(product)) return;
        favorites.add(product);
    }
    
    public void removeFavorite(Product product) {
        favorites.remove(product);
    }
}
