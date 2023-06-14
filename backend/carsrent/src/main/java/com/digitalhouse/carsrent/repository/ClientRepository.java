package com.digitalhouse.carsrent.repository;

import com.digitalhouse.carsrent.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long>
{
}
