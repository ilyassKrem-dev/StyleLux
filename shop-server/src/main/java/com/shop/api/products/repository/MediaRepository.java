package com.shop.api.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.api.products.media.Media;

public interface MediaRepository extends JpaRepository<Media,Integer> {

}
