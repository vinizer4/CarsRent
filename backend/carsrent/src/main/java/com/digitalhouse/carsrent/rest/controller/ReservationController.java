package com.digitalhouse.carsrent.rest.controller;

import com.digitalhouse.carsrent.rest.dto.reservation.ReservationGetDTO;
import com.digitalhouse.carsrent.rest.dto.reservation.ReservationPostDTO;
import com.digitalhouse.carsrent.rest.dto.reservation.ReservationPutDTO;
import com.digitalhouse.carsrent.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationGetDTO> createReservation(@RequestBody ReservationPostDTO reservationDTO) {
        Optional<ReservationGetDTO> createdReservation = reservationService.createReservation(reservationDTO);
        return createdReservation
                .map(reservation -> ResponseEntity.created(URI.create("/reservations/" + reservation.getId())).body(reservation))
                .orElse(ResponseEntity.badRequest().build());
    }


    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReservationGetDTO>> getReservationsByProductId(@PathVariable Long productId) {
        List<ReservationGetDTO> reservations = reservationService.getReservationsByProductId(productId);
        if (reservations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reservations);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationGetDTO> updateReservation(@PathVariable Long id, @RequestBody ReservationPutDTO updatedReservationDTO) {
        Optional<ReservationGetDTO> updatedReservation = reservationService.updateReservation(id, updatedReservationDTO);
        return updatedReservation.map(ResponseEntity::ok)
                                 .orElse(ResponseEntity.notFound().build());
    }
}
