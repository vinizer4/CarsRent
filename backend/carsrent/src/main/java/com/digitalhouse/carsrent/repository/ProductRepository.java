package com.digitalhouse.carsrent.repository;

import com.digitalhouse.carsrent.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByCidade_Id(Long cityId);
    List<Product> findAllByCategoria_Id(Long categoryId);
}
