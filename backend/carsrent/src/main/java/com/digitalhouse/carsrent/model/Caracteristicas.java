package com.digitalhouse.carsrent.model;

import com.digitalhouse.carsrent.rest.dto.caracteristicas.CaracteristicasPostDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "caracteristicas")
public class Caracteristicas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String icone;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Product produto;

    public Caracteristicas(String nome, String icone, Product produto) {
        this.nome = nome;
        this.icone = icone;
        this.produto = produto;
    }

    public Caracteristicas(String nome, String icone) {
        this.nome = nome;
        this.icone = icone;
    }

    public CaracteristicasPostDTO toDTO() {
        return new CaracteristicasPostDTO(nome, icone);
    }

    public static Caracteristicas fromDTO(CaracteristicasPostDTO dto) {
        return new Caracteristicas(dto.getNome(), dto.getIcone());
    }
}
