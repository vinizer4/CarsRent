package com.digitalhouse.carsrent.rest.dto.caracteristicas;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CaracteristicasGetDTO
{
    private Long id;
    private String nome;
    private String icone;

}
