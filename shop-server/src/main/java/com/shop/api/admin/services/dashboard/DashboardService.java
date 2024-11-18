package com.shop.api.admin.services.dashboard;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shop.api.admin.misc.DateUtils;
import com.shop.api.admin.records.dashboard.GraphDto;
import com.shop.api.admin.records.dashboard.SummeryDto;
import com.shop.api.admin.records.dashboard.TopProductDto;
import com.shop.api.payement.order.Order;
import com.shop.api.payement.order.misc.StatusEnum;
import com.shop.api.payement.repositories.OrderItemReposotiry;
import com.shop.api.payement.repositories.OrderRepository;



@Service
public class DashboardService {
    
    private final DashboardMapping dashboardMapping;
    private final OrderRepository orderRepository;
    private final OrderItemReposotiry orderItemReposotiry;
    public DashboardService(DashboardMapping dashboardMapping, OrderRepository orderRepository,OrderItemReposotiry orderItemReposotiry) {
        this.dashboardMapping = dashboardMapping;
        this.orderRepository = orderRepository;
        this.orderItemReposotiry = orderItemReposotiry;
    }

    public SummeryDto getSummery() {
        // today
        double sales = 0;
        int productsShipping = 0;
        int ordersPending = 0;

        // yersterday
        double oldSales = 0;
        int oldOrdersPending = 0;
        int oldShipping = 0;


        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        Date todaytoDate = DateUtils.toDate(today);
        Date yesterdaytoDate = DateUtils.toDate(yesterday);
        


        List<Order> orders = orderRepository.findAllByUpdatedAt(todaytoDate);
        

        for (Order order : orders) {
            if(order.getStatus().equals(StatusEnum.completed)) {
                    sales += order.getTotalAmount();
            }
            if(order.getStatus().equals(StatusEnum.shipping)) {
                    productsShipping += order.getOrderItems().size();
            }
            if(order.getStatus().equals(StatusEnum.pending)) {
                ordersPending +=1;
            }
           

        }
        List<Order> yesterdayOrders = orderRepository.findAllByUpdatedAt(yesterdaytoDate);
        for (Order order : yesterdayOrders) {
            if(order.getStatus().equals(StatusEnum.completed)) {
                oldSales += order.getTotalAmount();
            }
            if(order.getStatus().equals(StatusEnum.shipping)) {
                oldShipping += order.getOrderItems().size();
            }
            if(order.getStatus().equals(StatusEnum.pending)) {
                oldOrdersPending +=1;
            }
            
 
         }

        return new SummeryDto(
            sales, 
            ordersPending, 
            productsShipping,
            oldSales,
            oldOrdersPending,
            oldShipping);
    }


    public GraphDto getGraphSummery() {
        // Get this month
        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();
        List<Order> ordersThisMonth = orderRepository.findAllByMonth(currentMonth);
        // Get lat month
        LocalDate lastMonthDate = currentDate.minusMonths(1);
        int lastMonth = lastMonthDate.getMonthValue();
        List<Order> ordersLastMonth = orderRepository.findAllByMonth(lastMonth);


        //This month
        Map<Integer,List<Order>> currentMonthWeeklyOrders = dashboardMapping.splitIntoWeeks(ordersThisMonth, currentMonth, currentDate.getYear());

        List<Double> currentMonthAvg = dashboardMapping.calculateWeeklyAverage(currentMonthWeeklyOrders);

        //Last month
        Map<Integer,List<Order>> lastMonthWeeklyOrders = dashboardMapping.splitIntoWeeks(ordersLastMonth, lastMonth, currentDate.getYear());

        List<Double> lastMonthAvg = dashboardMapping.calculateWeeklyAverage(lastMonthWeeklyOrders);


        return new GraphDto(currentMonthAvg, lastMonthAvg);
    }

    public List<TopProductDto> getTopProducts() {
        List<TopProductDto> orderItems = orderItemReposotiry.getGroupedOrderItems()
                                    .stream()
                                    .map(dashboardMapping::changetoTopProductDto)
                                    .collect(Collectors.toList());
       

        return orderItems;
    }
}
