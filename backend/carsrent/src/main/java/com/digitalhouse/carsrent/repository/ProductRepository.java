package com.digitalhouse.carsrent.repository;

import com.digitalhouse.carsrent.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,
        Long> {
}
