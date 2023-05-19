package com.digitalhouse.carsrent;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.digitalhouse.carsrent.model")
public class CarsrentApplication {
    public static void main(String[] args) {
        SpringApplication.run(CarsrentApplication.class, args);
    }
}
