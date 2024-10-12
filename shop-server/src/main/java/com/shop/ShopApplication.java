package com.shop;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class ShopApplication {

	public static void main(String[] args) {
		var app = new SpringApplication(ShopApplication.class);
		app.setDefaultProperties(Collections.singletonMap("spring.profiles.active", "dev"));
		app.run(args);


		System.out.print("\n\n Running on localhost:8080");
	}

}
