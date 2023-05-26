package com.digitalhouse.carsrent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.digitalhouse.carsrent.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
