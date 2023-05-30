package com.digitalhouse.carsrent.model;

import com.digitalhouse.carsrent.repository.CaracteristicasRepository;
import com.digitalhouse.carsrent.repository.CategoryRepository;
import com.digitalhouse.carsrent.repository.CidadeRepository;
import com.digitalhouse.carsrent.repository.ImageRepository;
import com.digitalhouse.carsrent.rest.dto.product.ProductGetDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductPostDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductPutDTO;
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

    public Product(String nome, String descricao, Category categoria, Cidade cidade, List<Image> imagens, List<Caracteristicas> caracteristicas) {
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.cidade = cidade;
        this.imagens = imagens;
        this.caracteristicas = caracteristicas;
    }

    public ProductPostDTO toPostDTO() {
        List<Long> caracteristicasIds = this.caracteristicas.stream().map(Caracteristicas::getId).collect(Collectors.toList());

        return new ProductPostDTO(this.nome, this.descricao, this.categoria.getId(), this.cidade.getId(), caracteristicasIds);
    }

    public ProductGetDTO toDTO() {
        List<Long> imagensIds = this.imagens.stream().map(Image::getId).collect(Collectors.toList());
        List<Long> caracteristicasIds = this.caracteristicas.stream().map(Caracteristicas::getId).collect(Collectors.toList());

        return new ProductGetDTO(this.id, this.nome, this.descricao, this.categoria.getId(), this.cidade.getId(), imagensIds, caracteristicasIds);
    }

    public static Product fromPostDTO(ProductPostDTO dto, CategoryRepository categoryRepository, CidadeRepository cidadeRepository, CaracteristicasRepository caracteristicasRepository) {
        Category categoria = categoryRepository.findById(dto.getCategoriaId()).orElse(null);
        Cidade cidade = cidadeRepository.findById(dto.getCidadeId()).orElse(null);

        List<Caracteristicas> caracteristicas = dto.getCaracteristicasIds().stream()
                                                   .map(caracteristicasId -> caracteristicasRepository.findById(caracteristicasId).orElse(null))
                                                   .collect(Collectors.toList());

        return new Product(dto.getNome(), dto.getDescricao(), categoria, cidade, null, caracteristicas);
    }

    public static Product fromPutDTO(ProductPutDTO dto, CategoryRepository categoryRepository, CidadeRepository cidadeRepository, ImageRepository imageRepository, CaracteristicasRepository caracteristicasRepository) {
        Category categoria = categoryRepository.findById(dto.getCategoriaId()).orElse(null);
        Cidade cidade = cidadeRepository.findById(dto.getCidadeId()).orElse(null);

        List<Caracteristicas> caracteristicas = dto.getCaracteristicasIds().stream()
                                                   .map(caracteristicasId -> caracteristicasRepository.findById(caracteristicasId).orElse(null))
                                                   .collect(Collectors.toList());

        return new Product(dto.getNome(), dto.getDescricao(), categoria, cidade, null, caracteristicas);
    }
}
