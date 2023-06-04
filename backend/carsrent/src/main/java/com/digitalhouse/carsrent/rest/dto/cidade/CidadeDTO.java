package com.digitalhouse.carsrent.rest.dto.cidade;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CidadeDTO {
    private Long id;
    private String nome;
    private String pais;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CidadeDTO cidadeDTO = (CidadeDTO) o;
        return Objects.equals(id, cidadeDTO.id) &&
                Objects.equals(nome, cidadeDTO.nome) &&
                Objects.equals(pais, cidadeDTO.pais);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, pais);
    }
}

