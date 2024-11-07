package com.shop.api.admin.records.dashboard;
import java.util.List;

public record GraphDto(
    List<Double> currentMonth,
    List<Double> lastMonth
    ) {
    
}
