package com.digitalhouse.carsrent.model;

import com.digitalhouse.carsrent.rest.dto.image.ImageDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "imagens")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String url;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Product produto;

    public static Image fromDTO(ImageDTO dto, Product produto) {
        return new Image(dto.getId(), dto.getTitulo(), dto.getUrl(), produto);
    }

    public ImageDTO toDTO() {
        return new ImageDTO(id, titulo, url, produto != null ? produto.getId() : null);
    }
}
