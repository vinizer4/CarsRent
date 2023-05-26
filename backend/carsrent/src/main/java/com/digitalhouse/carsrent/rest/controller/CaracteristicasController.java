package com.digitalhouse.carsrent.rest.controller;

import com.digitalhouse.carsrent.model.Caracteristicas;
import com.digitalhouse.carsrent.rest.dto.caracteristicas.CaracteristicasGetDTO;
import com.digitalhouse.carsrent.rest.dto.caracteristicas.CaracteristicasPostDTO;
import com.digitalhouse.carsrent.service.CaracteristicasService;
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

    @PostMapping
    public ResponseEntity<CaracteristicasGetDTO> createCaracteristica(@RequestBody CaracteristicasPostDTO dto) {
        Caracteristicas caracteristica = Caracteristicas.fromDTO(dto);
        Caracteristicas newCaracteristica = caracteristicasService.createCaracteristica(caracteristica);
        CaracteristicasGetDTO responseDTO = new CaracteristicasGetDTO(newCaracteristica.getId(), newCaracteristica.getNome(), newCaracteristica.getIcone());
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaracteristicasGetDTO> getCaracteristicaById(@PathVariable Long id) {
        Caracteristicas caracteristica = caracteristicasService.getCaracteristicaById(id);
        if (caracteristica != null) {
            CaracteristicasGetDTO responseDTO = new CaracteristicasGetDTO(caracteristica.getId(), caracteristica.getNome(), caracteristica.getIcone());
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<CaracteristicasGetDTO>> getAllCaracteristicas() {
        List<Caracteristicas> caracteristicas = caracteristicasService.getAllCaracteristicas();
        List<CaracteristicasGetDTO> dtos = caracteristicas.stream()
                                                          .map(c -> new CaracteristicasGetDTO(c.getId(), c.getNome(), c.getIcone()))
                                                          .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CaracteristicasGetDTO> updateCaracteristica(@PathVariable Long id, @RequestBody CaracteristicasPostDTO dto) {
        Caracteristicas existingCaracteristica = caracteristicasService.getCaracteristicaById(id);
        if (existingCaracteristica != null) {
            existingCaracteristica.setNome(dto.getNome());
            existingCaracteristica.setIcone(dto.getIcone());
            Caracteristicas updatedCaracteristica = caracteristicasService.updateCaracteristica(existingCaracteristica);
            CaracteristicasGetDTO responseDTO = new CaracteristicasGetDTO(updatedCaracteristica.getId(), updatedCaracteristica.getNome(), updatedCaracteristica.getIcone());
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
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
