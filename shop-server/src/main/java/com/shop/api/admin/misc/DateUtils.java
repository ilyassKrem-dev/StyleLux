package com.shop.api.admin.misc;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DateUtils {
    

    public static Date toDate(LocalDate localDate) {
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    public static String dateFormatter(String month,String pattern) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        Date date = sdf.parse(month);
        SimpleDateFormat formatTo = new SimpleDateFormat(pattern);
        return formatTo.format(date);
    }

    public static List<String> getLastMonths() {
        LocalDate currentDate = LocalDate.now();
        List<String> lastSixMonths = new ArrayList<>();
        DateTimeFormatter  foramtter = DateTimeFormatter.ofPattern("yyyy-MM");        
        lastSixMonths.add(currentDate.format(foramtter));

        for(int i= 1; i<6;i++) {
            LocalDate monthBefore = currentDate.minusMonths(i);
            lastSixMonths.add(monthBefore.format(foramtter));
        }

        return lastSixMonths;
    }
}
