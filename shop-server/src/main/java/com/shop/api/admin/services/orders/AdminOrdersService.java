package com.shop.api.admin.services.orders;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shop.api.admin.records.orders.GetAllOrdersDto;
import com.shop.api.admin.records.orders.GetOrderDetails;
import com.shop.api.payement.order.Order;
import com.shop.api.payement.repositories.OrderItemReposotiry;
import com.shop.api.payement.repositories.OrderRepository;
import com.shop.api.users.others.UserRepository;

@Service
public class AdminOrdersService {
    

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderItemReposotiry orderItemReposotiry;
    private final AdminOrdersMapping adminOrdersMapping;
    public AdminOrdersService(UserRepository userRepository, OrderRepository orderRepository, OrderItemReposotiry orderItemReposotiry,AdminOrdersMapping adminOrdersMapping) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderItemReposotiry = orderItemReposotiry;
        this.adminOrdersMapping = adminOrdersMapping;
    }


    public List<GetAllOrdersDto> getAllOrders(
        Pageable pageable
    ) {
        List<GetAllOrdersDto> orders = orderRepository.findAllPaginate(pageable)
                                            .stream()
                                            .map(adminOrdersMapping::changeToGetAllOrdersDto)
                                            .collect(Collectors.toList());
        
        return orders;
    }
    public List<GetAllOrdersDto> getAllSearchResults(String params) {
        Pageable pageable = PageRequest.of(0, 6);
        List<GetAllOrdersDto> orders = orderRepository.findAllContaining(params,pageable)
        .stream()
        .map(adminOrdersMapping::changeToGetAllOrdersDto)
        .collect(Collectors.toList());

        return orders;
    }
    public GetOrderDetails getOrderDetails(
        Integer id
    ) {
        Order order = orderRepository.findById(id)
                                        .orElseThrow();
        
        return adminOrdersMapping.changeToGetOrderDetails(order);   
    }
    
}
