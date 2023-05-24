package com.digitalhouse.carsrent.rest.controller;

import com.digitalhouse.carsrent.model.Cidade;
import com.digitalhouse.carsrent.rest.dto.cidade.CidadeDTO;
import com.digitalhouse.carsrent.service.CidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cidades")
public class CidadeController {

    @Autowired
    private CidadeService cidadeService;

    @PostMapping
    public ResponseEntity<CidadeDTO> createCidade(@RequestBody CidadeDTO dto) {
        Cidade cidade = Cidade.fromDTO(dto);
        Cidade newCidade = cidadeService.createCidade(cidade);
        return new ResponseEntity<>(newCidade.toDTO(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CidadeDTO> getCidadeById(@PathVariable Long id) {
        Cidade cidade = cidadeService.getCidadeById(id);
        if (cidade != null) {
            return new ResponseEntity<>(cidade.toDTO(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<CidadeDTO>> getAllCidades() {
        List<Cidade> cidades = cidadeService.getAllCidades();
        List<CidadeDTO> dtos = cidades.stream().map(Cidade::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CidadeDTO> updateCidade(@PathVariable Long id, @RequestBody CidadeDTO dto) {
        Cidade existingCidade = cidadeService.getCidadeById(id);
        if (existingCidade != null) {
            Cidade cidadeToUpdate = Cidade.fromDTO(dto);
            cidadeToUpdate.setId(id);
            Cidade updatedCidade = cidadeService.updateCidade(cidadeToUpdate);
            return new ResponseEntity<>(updatedCidade.toDTO(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCidade(@PathVariable Long id) {
        Cidade existingCidade = cidadeService.getCidadeById(id);
        if (existingCidade != null) {
            cidadeService.deleteCidade(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
