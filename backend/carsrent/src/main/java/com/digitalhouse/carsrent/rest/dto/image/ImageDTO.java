package com.digitalhouse.carsrent.rest.dto.image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImageDTO {
    private Long id;
    private String titulo;
    private String url;
    private Long produtoId;  // novo campo adicionado
}
