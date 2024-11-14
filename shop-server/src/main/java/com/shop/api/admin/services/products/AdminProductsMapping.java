package com.shop.api.admin.services.products;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Collections;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.shop.api.admin.misc.DateUtils;
import com.shop.api.admin.records.products.AdminProductDto;
import com.shop.api.admin.records.products.GetAllAdminProductsDto;
import com.shop.api.admin.records.products.GetProductSaleDto;
import com.shop.api.admin.records.products.GetRecentOrder;
import com.shop.api.payement.order.Order;
import com.shop.api.payement.order.misc.StatusEnum;
import com.shop.api.payement.order_item.OrderItem;
import com.shop.api.products.Product;

@Service
public class AdminProductsMapping {



    public AdminProductDto changeToAdminProductDto(Product product) {

        return new AdminProductDto(
            product.getId(), 
            product.getuid(), 
            product.getName(), 
            product.getCategory().getName(), 
            product.getPrice(), 
            product.getQuantity() - product.getSold());
    }

    public GetAllAdminProductsDto changeToGetAllAdminProducts(Page<AdminProductDto> products) {
        int pages = products.getTotalPages();
        long mexElements = products.getTotalElements();
        return new GetAllAdminProductsDto(products.toList(), pages,mexElements);
    }


    public List<GetProductSaleDto> changeToGetProductSaleDto(Product product) throws ParseException {

        List<GetProductSaleDto> productSales = new ArrayList<>();
        Map<String,List<OrderItem>> ordersByMonth = new HashMap<>();


        for(OrderItem orderItem : product.getOrderItems()) {
            String orderMonth = orderItem.getMonthYear();
            ordersByMonth.putIfAbsent(orderMonth, new ArrayList<>());
            ordersByMonth.get(orderMonth).add(orderItem);

        }
        for(String month : DateUtils.getLastMonths()) {
            double sales = 0;
            int quantity = 0;
            List<OrderItem> items = ordersByMonth.getOrDefault(month,Collections.emptyList());
            for(OrderItem item : items) {
                if(item != null && item.getOrder().getStatus().equals(StatusEnum.completed)) {
                    sales += item.getPrice() * item.getQuantity();
                    quantity += item.getQuantity();
                }
            }
            String monthToString = DateUtils.dateFormatter(month,"MMMM");
            String year = DateUtils.dateFormatter(month,"yyyy");

            GetProductSaleDto getProductSaleDto = new GetProductSaleDto(
                monthToString, year, sales, quantity);
            productSales.add(getProductSaleDto);
        }
        
        return productSales;

    }
    
    public List<GetRecentOrder> changeToRecentOrders(List<Order> orders) {
        List<GetRecentOrder> recentOrders = new ArrayList<>();
        for(Order order:orders) {
            String fullName = order.getUser().getFirstname()+ " " + order.getUser().getLastname();
            SimpleDateFormat sdf = new SimpleDateFormat("MMM dd, yyyy");
            recentOrders.add(new GetRecentOrder(
                order.getId(), 
                order.getTotalAmount(), 
                order.getStatus(), 
                sdf.format(order.getCreatedAt()),
                fullName));
        }
        return recentOrders;
    }
    
}   
