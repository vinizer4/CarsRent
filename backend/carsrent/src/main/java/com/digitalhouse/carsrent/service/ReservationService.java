package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.Reservation;
import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.model.Client;
import com.digitalhouse.carsrent.model.User;
import com.digitalhouse.carsrent.repository.ReservationRepository;
import com.digitalhouse.carsrent.repository.ProductRepository;
import com.digitalhouse.carsrent.repository.ClientRepository;
import com.digitalhouse.carsrent.repository.UserRepository;
import com.digitalhouse.carsrent.rest.dto.reservation.ReservationGetDTO;
import com.digitalhouse.carsrent.rest.dto.reservation.ReservationPostDTO;
import com.digitalhouse.carsrent.rest.dto.reservation.ReservationPutDTO;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationService
{

    private final ReservationRepository reservationRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ReservationService(
            ReservationRepository reservationRepository,
            ProductRepository productRepository,
            UserRepository userRepository
                             )
    {
        this.reservationRepository = reservationRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Optional<ReservationGetDTO> createReservation(ReservationPostDTO reservationDTO)
    {
        Optional<Product> product =
                productRepository.findById(reservationDTO.getProduct());
        Optional<User> user = userRepository.findById(reservationDTO.getUser());

        if (product.isPresent() && user.isPresent())
        {
            Reservation reservation = new Reservation();
            reservation.setStartDate(reservationDTO.getStartDate());
            reservation.setEndDate(reservationDTO.getEndDate());
            reservation.setStartTime(convertStringToLocalTime(reservationDTO.getStartTime()));
            reservation.setProduct(product.get());
            reservation.setUser(user.get());
            Reservation createdReservation =
                    reservationRepository.save(reservation);
            return Optional.of(mapReservationToGetDTO(createdReservation));
        }
        return Optional.empty();
    }

    public List<ReservationGetDTO> getReservationsByProductId(Long productId)
    {
        List<Reservation> reservations =
                reservationRepository.findByProductId(productId);
        return mapReservationsToGetDTOs(reservations);
    }

    public Optional<ReservationGetDTO> getReservationById(Long id)
    {
        Optional<Reservation> reservation =
                reservationRepository.findById(id);
        return reservation.map(this::mapReservationToGetDTO);
    }

    public void cancelReservation(Long id)
    {
        reservationRepository.deleteById(id);
    }

    public Optional<ReservationGetDTO> updateReservation(
            Long id,
            ReservationPutDTO updatedReservationDTO
                                                        )
    {
        Optional<Reservation> existingReservation =
                reservationRepository.findById(id);
        if (existingReservation.isPresent())
        {
            Reservation reservation = existingReservation.get();
            reservation.setStartDate(updatedReservationDTO.getStartDate());
            reservation.setEndDate(updatedReservationDTO.getEndDate());
            reservation.setStartTime(convertStringToLocalTime(updatedReservationDTO.getStartTime()));
            Reservation updatedReservation =
                    reservationRepository.save(reservation);
            return Optional.of(mapReservationToGetDTO(updatedReservation));
        }
        return Optional.empty();
    }

    private LocalTime convertStringToLocalTime(String time)
    {
        return LocalTime.parse(
                time,
                DateTimeFormatter.ofPattern("HH:mm:ss")
                              );
    }

    private ReservationGetDTO mapReservationToGetDTO(Reservation reservation)
    {
        ReservationGetDTO reservationDTO = new ReservationGetDTO();
        reservationDTO.setId(reservation.getId());
        reservationDTO.setStartTime(reservation
                                            .getStartTime()
                                            .format(DateTimeFormatter.ofPattern("HH:mm:ss")));
        reservationDTO.setStartDate(reservation.getStartDate());
        reservationDTO.setEndDate(reservation.getEndDate());
        reservationDTO.setProduct(reservation.getProduct());
        reservationDTO.setUser(reservation.getUser().getId());
        return reservationDTO;
    }

    private List<ReservationGetDTO> mapReservationsToGetDTOs(List<Reservation> reservations)
    {
        return reservations
                .stream()
                .map(this::mapReservationToGetDTO)
                .collect(Collectors.toList());
    }
}
