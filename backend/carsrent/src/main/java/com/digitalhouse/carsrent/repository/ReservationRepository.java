package com.digitalhouse.carsrent.repository;

import com.digitalhouse.carsrent.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByProductId(Long productId);
}
