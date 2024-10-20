package com.shop.api.payement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerListParams;
import com.stripe.param.PaymentIntentCreateParams;

import jakarta.annotation.PostConstruct;


@Service
public class StripeService {
    @Value("${stripe.key}")
    private String stripeKey;
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeKey;
    }
    public String createStipeCustomer(String email,String fullname) throws StripeException {
        CustomerListParams paramsBuilder = CustomerListParams.builder()
            .setLimit((long) 1000) 
            .build();
        List<Customer> customers = Customer.list(paramsBuilder).getData();
        for(Customer customer : customers) {
            if(customer.getEmail().equals(email)) {
                return customer.getId();
            }
        }

        CustomerCreateParams params = CustomerCreateParams.builder()
                                        .setEmail(email)
                                        .setName(fullname)
                                        .build();
        Customer customer = Customer.create(params);
        return  customer.getId();
        
                                        
    }

    public String createPaymentIntent(String customerId,double amount,String paymentId) throws  StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                                                .setCustomer(customerId)
                                                .setAmount((long) (amount*100))
                                                .setCurrency("usd")
                                                .setPaymentMethod(paymentId) 
                                                .setAutomaticPaymentMethods(PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                                .setEnabled(true)
                                                .setAllowRedirects(PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.NEVER)
                                                .build())  
                                                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return paymentIntent.getClientSecret();
    }
}
