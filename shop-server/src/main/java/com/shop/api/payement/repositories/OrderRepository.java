package com.shop.api.payement.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.api.payement.order.Order;
import com.shop.api.users.User;


public interface OrderRepository extends JpaRepository<Order,Integer> {


    List<Order> findByUser(User user,Pageable Pageable);


    @Query("SELECT o FROM `Order` o WHERE DAY(o.updatedAt) = DAY(:date) " +
               "AND MONTH(o.updatedAt) = MONTH(:date) " +
               "AND YEAR(o.updatedAt) = YEAR(:date)")
    List<Order> findAllByUpdatedAt(Date date);


    @Query("SELECT o FROM Order o WHERE MONTH(o.updatedAt) = :month "
            +"AND YEAR(o.updatedAt) = YEAR(now())"
            + "AND o.status = completed")
    List<Order> findAllByMonth(int month);

    @Query("SELECT o FROM Order o Order by o.id desc")
    List<Order> findAllPaginate(Pageable pageable);


    @Query("SELECT o FROM Order o "
            +"WHERE CAST(o.id AS string) like %:params% "
            +"or o.user.firstname like %:params% "
            +"or o.user.lastname like %:params% "
            +"or CAST(o.user.id AS string) like  %:params% "
            + "or CAST(o.totalAmount AS string) like %:params% ")
    List<Order> findAllContaining(String params,Pageable pageable);
}
