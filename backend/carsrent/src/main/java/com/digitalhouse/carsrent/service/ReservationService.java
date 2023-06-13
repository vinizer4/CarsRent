package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.Reservation;
import com.digitalhouse.carsrent.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getReservationsByProductId(Long productId) {
        return reservationRepository.findByProductId(productId);
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public void cancelReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    public Reservation updateReservation(Long id, Reservation updatedReservation) {
        if (reservationRepository.existsById(id)) {
            updatedReservation.setId(id);
            return reservationRepository.save(updatedReservation);
        }
        return null;
    }
}
