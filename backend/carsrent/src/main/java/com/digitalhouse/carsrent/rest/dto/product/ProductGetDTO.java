package com.digitalhouse.carsrent.rest.dto.product;

import com.digitalhouse.carsrent.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductGetDTO {

    private Long id;
    private String nome;
    private String descricao;
    private Long categoriaId;
    private Long cidadeId;
    private List<Long> imagensIds;
    private List<Long> caracteristicasIds;

    // Construtor que aceita um objeto Product
    public ProductGetDTO(Product product) {
        this.id = product.getId();
        this.nome = product.getNome();
        this.descricao = product.getDescricao();
        this.categoriaId = product.getCategoria() != null ? product.getCategoria().getId() : null;
        this.cidadeId = product.getCidade() != null ? product.getCidade().getId() : null;
        this.imagensIds = product.getImagens() != null ? product.getImagens().stream().map(image -> image.getId()).collect(Collectors.toList()) : null;
        this.caracteristicasIds = product.getCaracteristicas() != null ? product.getCaracteristicas().stream().map(caracteristica -> caracteristica.getId()).collect(Collectors.toList()) : null;
    }
}
