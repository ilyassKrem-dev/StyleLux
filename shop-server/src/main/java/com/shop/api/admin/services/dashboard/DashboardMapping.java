package com.shop.api.admin.services.dashboard;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.shop.api.admin.records.dashboard.TopProductDto;
import com.shop.api.payement.order.Order;
import com.shop.api.products.Product;

@Service
public class DashboardMapping {




    public Map<Integer,List<Order>> splitIntoWeeks(List<Order> orders,int month, int year) {
            Map<Integer,List<Order>> weeklyOrders = new HashMap<>();

            LocalDate firstOfMonth = LocalDate.of(year,month,1);
            LocalDate lastOfMonth = firstOfMonth.withDayOfMonth(firstOfMonth.lengthOfMonth());

            for (Order order : orders) {
                LocalDate orderDate = convertDateToLocalDate(order.getUpdatedAt());
                if(!orderDate.isBefore(firstOfMonth) && !orderDate.isAfter(lastOfMonth)) {
                    int weekNumber = (orderDate.getDayOfMonth() - 1)/7 +1;
                    weeklyOrders.computeIfAbsent(weekNumber, k -> new ArrayList<>()).add(order);
                }
            }

            return weeklyOrders;

    }

    public List<Double> calculateWeeklyAverage(Map<Integer,List<Order>> weeklyOrders) {
        List<Double> weeklyAverge = new ArrayList<>();

        for(int week = 1;week <=4 ; week++) {
            List<Order> ordersForWeek = weeklyOrders.getOrDefault(week, new ArrayList<>());
            double weekTotalAmount= 0;
            for(Order order : ordersForWeek) {
                weekTotalAmount += order.getTotalAmount();
            }

            double avgWeek = ordersForWeek.isEmpty() ? 0 : weekTotalAmount / weeklyOrders.size();
            weeklyAverge.add(avgWeek);
        }
        return weeklyAverge;
    }

    public TopProductDto changetoTopProductDto(Object[] data) {
        Product product = (Product) data[1];
        double total = (double) data[3];
        Long sold = (Long) data[2];
        return new TopProductDto(
            product.getId(), 
            product.getuid(), 
            product.getName(), 
            total, 
            sold.intValue());
    }   

    private LocalDate convertDateToLocalDate(Date date) {
    if (date == null) {
        return null;
    }
    return Instant.ofEpochMilli(date.getTime())   // Convert Date to Instant
                  .atZone(ZoneId.systemDefault())  // Convert to ZonedDateTime in the default time zone
                  .toLocalDate();                 // Get LocalDate (no time information)
}
}
