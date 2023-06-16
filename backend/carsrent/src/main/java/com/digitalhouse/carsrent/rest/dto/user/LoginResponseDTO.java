package com.digitalhouse.carsrent.rest.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO
{
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String token;
}
