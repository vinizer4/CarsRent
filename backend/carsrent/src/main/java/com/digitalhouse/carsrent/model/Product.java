package com.digitalhouse.carsrent.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

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

}
