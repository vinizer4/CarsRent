package com.digitalhouse.carsrent.model;

import com.digitalhouse.carsrent.rest.dto.cidade.CidadeDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "cidade")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String pais;

    public static Cidade fromDTO(CidadeDTO dto) {
        return new Cidade(dto.getId(), dto.getNome(), dto.getPais());
    }

    public CidadeDTO toDTO() {
        return new CidadeDTO(id, nome, pais);
    }
}
