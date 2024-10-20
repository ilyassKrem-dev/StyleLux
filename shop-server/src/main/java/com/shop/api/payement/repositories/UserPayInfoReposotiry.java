package com.shop.api.payement.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.api.payement.user_pay_info.UserPayInfo;
import com.shop.api.users.User;

public interface UserPayInfoReposotiry extends JpaRepository<UserPayInfo,Integer> {


    Optional<UserPayInfo> findByUser(User user);
}
