package com.digitalhouse.carsrent.rest.controller;

import com.digitalhouse.carsrent.model.Caracteristicas;
import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.rest.dto.caracteristicas.CaracteristicasDTO;
import com.digitalhouse.carsrent.service.CaracteristicasService;
import com.digitalhouse.carsrent.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/caracteristicas")
public class CaracteristicasController {

    @Autowired
    private CaracteristicasService caracteristicasService;

    @Autowired
    private ProductService productService;  // Produto service para buscar o produto associado

    @PostMapping
    public ResponseEntity<CaracteristicasDTO> createCaracteristica(@RequestBody CaracteristicasDTO dto) {
        Product product = productService.findById(dto.getProdutoId());  // Buscar o produto
        if(product == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Caracteristicas caracteristica = Caracteristicas.fromDTO(dto, product);  // Passando o produto
        Caracteristicas newCaracteristica = caracteristicasService.createCaracteristica(caracteristica);
        return new ResponseEntity<>(newCaracteristica.toDTO(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaracteristicasDTO> getCaracteristicaById(@PathVariable Long id) {
        Caracteristicas caracteristica = caracteristicasService.getCaracteristicaById(id);
        if (caracteristica != null) {
            return new ResponseEntity<>(caracteristica.toDTO(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<CaracteristicasDTO>> getAllCaracteristicas() {
        List<Caracteristicas> caracteristicas = caracteristicasService.getAllCaracteristicas();
        List<CaracteristicasDTO> dtos = caracteristicas.stream().map(Caracteristicas::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CaracteristicasDTO> updateCaracteristica(@PathVariable Long id, @RequestBody CaracteristicasDTO dto) {
        Caracteristicas existingCaracteristica = caracteristicasService.getCaracteristicaById(id);
        if (existingCaracteristica != null) {
            Product product = productService.findById(dto.getProdutoId());  // Buscar o produto
            if(product == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            Caracteristicas caracteristicaToUpdate = Caracteristicas.fromDTO(dto, product);  // Passando o produto
            caracteristicaToUpdate.setId(id);
            Caracteristicas updatedCaracteristica = caracteristicasService.updateCaracteristica(caracteristicaToUpdate);
            return new ResponseEntity<>(updatedCaracteristica.toDTO(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCaracteristica(@PathVariable Long id) {
        Caracteristicas existingCaracteristica = caracteristicasService.getCaracteristicaById(id);
        if (existingCaracteristica != null) {
            caracteristicasService.deleteCaracteristica(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
