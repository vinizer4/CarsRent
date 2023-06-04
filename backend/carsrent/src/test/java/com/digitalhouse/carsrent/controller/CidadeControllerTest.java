package com.digitalhouse.carsrent.controller;

import com.digitalhouse.carsrent.model.Cidade;
import com.digitalhouse.carsrent.rest.controller.CidadeController;
import com.digitalhouse.carsrent.rest.dto.cidade.CidadeDTO;
import com.digitalhouse.carsrent.service.CidadeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class CidadeControllerTest {

    @InjectMocks
    private CidadeController cidadeController;

    @Mock
    private CidadeService cidadeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createCidade() {
        CidadeDTO dto = new CidadeDTO(1L, "TestCity", "TestCountry");
        Cidade cidade = Cidade.fromDTO(dto);
        when(cidadeService.createCidade(any(Cidade.class))).thenReturn(cidade);
        ResponseEntity<CidadeDTO> response = cidadeController.createCidade(dto);
        assertEquals(201, response.getStatusCodeValue());
        assertEquals(dto, response.getBody());
    }

    @Test
    void getCidadeById() {
        Cidade cidade = new Cidade(1L, "TestCity", "TestCountry");
        when(cidadeService.getCidadeById(1L)).thenReturn(cidade);
        ResponseEntity<CidadeDTO> response = cidadeController.getCidadeById(1L);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(cidade.toDTO(), response.getBody());
    }

    @Test
    void getCidadeByIdNotFound() {
        when(cidadeService.getCidadeById(anyLong())).thenReturn(null);
        ResponseEntity<CidadeDTO> response = cidadeController.getCidadeById(1L);
        assertEquals(404, response.getStatusCodeValue());
        assertNull(response.getBody());
    }

    @Test
    void getAllCidades() {
        Cidade cidade1 = new Cidade(1L, "TestCity1", "TestCountry1");
        Cidade cidade2 = new Cidade(2L, "TestCity2", "TestCountry2");
        when(cidadeService.getAllCidades()).thenReturn(Arrays.asList(cidade1, cidade2));
        ResponseEntity<List<CidadeDTO>> response = cidadeController.getAllCidades();
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
    }

    @Test
    void updateCidade() {
        CidadeDTO dto = new CidadeDTO(1L, "UpdatedCity", "UpdatedCountry");
        Cidade cidade = Cidade.fromDTO(dto);
        when(cidadeService.getCidadeById(anyLong())).thenReturn(cidade);
        when(cidadeService.updateCidade(any(Cidade.class))).thenReturn(cidade);
        ResponseEntity<CidadeDTO> response = cidadeController.updateCidade(1L, dto);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(cidade.toDTO(), response.getBody());
    }

    @Test
    void updateCidadeNotFound() {
        when(cidadeService.getCidadeById(anyLong())).thenReturn(null);
        CidadeDTO dto = new CidadeDTO(1L, "UpdatedCity", "UpdatedCountry");
        ResponseEntity<CidadeDTO> response = cidadeController.updateCidade(1L, dto);
        assertEquals(404, response.getStatusCodeValue());
        assertNull(response.getBody());
    }

    @Test
    void deleteCidade() {
        Cidade cidade = new Cidade(1L, "TestCity", "TestCountry");
        when(cidadeService.getCidadeById(anyLong())).thenReturn(cidade);
        doNothing().when(cidadeService).deleteCidade(anyLong());
        ResponseEntity<Void> response = cidadeController.deleteCidade(1L);
        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    void deleteCidadeNotFound() {
        when(cidadeService.getCidadeById(anyLong())).thenReturn(null);
        ResponseEntity<Void> response = cidadeController.deleteCidade(1L);
        assertEquals(404, response.getStatusCodeValue());
    }
}
