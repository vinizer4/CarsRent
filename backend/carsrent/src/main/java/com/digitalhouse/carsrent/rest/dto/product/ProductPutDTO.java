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
public class ProductPutDTO
{
    private Long id;
    private String nome;
    private String descricao;
    private Long categoriaId;
    private Long cidadeId;
    private List<Long> caracteristicasIds;
}
