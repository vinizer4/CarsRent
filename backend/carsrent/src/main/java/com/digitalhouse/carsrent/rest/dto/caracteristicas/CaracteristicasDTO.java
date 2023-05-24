package com.digitalhouse.carsrent.rest.dto.caracteristicas;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CaracteristicasDTO {
    private Long id;
    private String nome;
    private String icone;
    private Long produtoId; // Adicionando o campo produtoId para referenciar o produto relacionado

}
