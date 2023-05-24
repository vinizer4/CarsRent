package com.digitalhouse.carsrent.rest.dto.product;

import com.digitalhouse.carsrent.rest.dto.category.CategoryDTO;
import com.digitalhouse.carsrent.rest.dto.cidade.CidadeDTO;
import com.digitalhouse.carsrent.rest.dto.caracteristicas.CaracteristicasDTO;
import com.digitalhouse.carsrent.rest.dto.image.ImageDTO;
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
    private CategoryDTO categoria;
    private CidadeDTO cidade;
    private List<ImageDTO> imagens;
    private List<CaracteristicasDTO> caracteristicas;
}
