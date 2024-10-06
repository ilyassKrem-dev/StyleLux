package com.shop.api.users;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
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
    @Override
    public String getPassword() {return  this.password;}
    public String getEmail() {return  this.email;}
    public String getRole() {return this.role;}
    public Date getCreatedAt() {return this.createdAt;}
    public Date getUpdatedAt() {return this.updatedAt;}
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
    
    
}
