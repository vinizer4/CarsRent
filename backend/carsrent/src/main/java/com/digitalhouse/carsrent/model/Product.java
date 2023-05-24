package com.digitalhouse.carsrent.model;

import com.digitalhouse.carsrent.rest.dto.caracteristicas.CaracteristicasDTO;
import com.digitalhouse.carsrent.rest.dto.image.ImageDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "produtos")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Category categoria;

    @ManyToOne
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> imagens;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "produto_caracteristica",
            joinColumns = @JoinColumn(name = "produto_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id")
    )
    private List<Caracteristicas> caracteristicas;

    public Product(String nome, String descricao, Category categoria, Cidade cidade) {
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.cidade = cidade;
    }

    public ProductDTO toDTO() {
        List<ImageDTO> imagensDTO = imagens.stream().map(Image::toDTO).collect(Collectors.toList());
        List<CaracteristicasDTO> caracteristicasDTO = caracteristicas.stream().map(Caracteristicas::toDTO).collect(Collectors.toList());

        return new ProductDTO(id, nome, descricao, categoria.toDTO(), cidade.toDTO(), imagensDTO, caracteristicasDTO);
    }

    public static Product fromDTO(ProductDTO dto) {
        Category categoria = Category.fromDTO(dto.getCategoria());
        Cidade cidade = Cidade.fromDTO(dto.getCidade());

        Product product = new Product(dto.getNome(), dto.getDescricao(), categoria, cidade);

        List<Image> imagens = dto.getImagens().stream()
                                 .map(imageDTO -> Image.fromDTO(imageDTO, product))
                                 .collect(Collectors.toList());
        product.setImagens(imagens);

        List<Caracteristicas> caracteristicas =
                dto.getCaracteristicas().stream()
                   .map(caracteristicasDTO -> Caracteristicas.fromDTO(caracteristicasDTO, product))
                   .collect(Collectors.toList());
        product.setCaracteristicas(caracteristicas);

        return product;
    }
}
