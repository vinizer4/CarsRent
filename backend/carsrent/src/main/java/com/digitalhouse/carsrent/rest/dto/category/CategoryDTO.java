package com.digitalhouse.carsrent.rest.dto.category;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    private Long id;
    private String qualification;
    private String description;
    private String imageUrl;
}
