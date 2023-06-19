package com.digitalhouse.carsrent.rest.dto.reservation;

import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationGetDTO {
    private Long id;
    private Long userId;
    private Long productId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    @JsonFormat(pattern = "HH:mm:ss")
    private String startTime;
}


