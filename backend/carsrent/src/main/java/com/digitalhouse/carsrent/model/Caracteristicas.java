package com.digitalhouse.carsrent.model;

import com.digitalhouse.carsrent.rest.dto.caracteristicas.CaracteristicasDTO;
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

    public CaracteristicasDTO toDTO() {
        return new CaracteristicasDTO(id, nome, icone, produto != null ? produto.getId() : null);
    }

    public static Caracteristicas fromDTO(CaracteristicasDTO dto, Product produto) {
        return new Caracteristicas(dto.getNome(), dto.getIcone(), produto);
    }
}
