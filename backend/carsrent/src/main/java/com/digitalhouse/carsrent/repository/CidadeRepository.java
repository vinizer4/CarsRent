package com.digitalhouse.carsrent.repository;

import com.digitalhouse.carsrent.model.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long> {

    @Query("SELECT c FROM Cidade c WHERE c.id IN (SELECT DISTINCT p.cidade.id FROM Product p)")
    List<Cidade> findCidadesWithProducts();
}
