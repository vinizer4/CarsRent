package com.digitalhouse.carsrent.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

@Getter
@Setter
@NoArgsConstructor
@Entity
@PrimaryKeyJoinColumn(name = "user_id")
public class Client extends User {
    // Você pode adicionar atributos específicos do cliente aqui, se necessário.

    public Client(String firstName, String lastName, String email, String password) {
        super(null, firstName, lastName, email, password, null);
    }
}
