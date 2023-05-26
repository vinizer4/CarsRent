package com.digitalhouse.carsrent.rest.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Long categoriaId;  // Now it receives only the ID of the Category
    private Long cidadeId;     // Now it receives only the ID of the Cidade
    private List<Long> imagensIds; // Now it receives a list of Image IDs
    private List<Long> caracteristicasIds; // Now it receives a list of Caracteristicas IDs
}
