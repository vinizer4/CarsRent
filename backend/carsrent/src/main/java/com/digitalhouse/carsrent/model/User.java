package com.digitalhouse.carsrent.model;

import com.digitalhouse.carsrent.rest.dto.user.UserDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    @NotEmpty
    private String firstName;

    @Column(name = "last_name")
    @NotEmpty
    private String lastName;

    @Column(name = "email", unique = true)
    @Email
    @NotEmpty
    private String email;

    @Column(name = "password")
    @NotNull
    private String password;

    @Column(name = "jwt_token")
    private String jwtToken;

    // Método de conversão de User para UserDTO
    public UserDTO toDTO() {
        return new UserDTO(id, firstName, lastName, email, password);
    }

    // Método de conversão de UserDTO para User
    public static User fromDTO(UserDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        return user;
    }
}
