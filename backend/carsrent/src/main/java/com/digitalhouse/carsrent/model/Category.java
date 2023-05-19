package com.digitalhouse.carsrent.model;

import com.digitalhouse.carsrent.rest.dto.category.CategoryDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categorias")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "qualificacao")
    private String qualification;

    @Column(name = "descricao")
    private String description;

    @Column(name = "imagem_url")
    private String imageUrl;

    public CategoryDTO toDTO() {
        return new CategoryDTO(id, qualification, description, imageUrl);
    }

    public static Category fromDTO(CategoryDTO dto) {
        Category category = new Category();
        category.setId(dto.getId());
        category.setQualification(dto.getQualification());
        category.setDescription(dto.getDescription());
        category.setImageUrl(dto.getImageUrl());
        return category;
    }

}
