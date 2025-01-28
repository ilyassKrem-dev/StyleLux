package com.shop.api.deals;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shop.api.deals.misc.DealStatusEnum;

public interface  DealRepository extends JpaRepository<Deal, Integer> {
        

    @Query("select d from Deal d")
    Page<Deal> findAllPagination(Pageable pageable);

    @Query(
        "SELECT d from Deal d join d.products p where "+
        "cast(d.id as string) like %:param% or "+
        "d.name like %:param%  or p.name like  %:param% or "+
        "cast(d.discount as string) like %:param% "
        )
    List<Deal> findByQuery(String param,Pageable pageable);

    @Query("select d from Deal d where status = :status")
    Page<Deal> findAllByStatus(Pageable pageable,DealStatusEnum status);
}
