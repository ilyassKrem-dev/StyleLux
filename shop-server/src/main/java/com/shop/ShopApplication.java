package com.shop;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class ShopApplication {

	public static void main(String[] args) {
		var app = new SpringApplication(ShopApplication.class);
		app.run(args);


		System.out.print("\n\n Running on localhost:8080");
	}
	

}
