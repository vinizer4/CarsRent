package com.digitalhouse.carsrent.controller;

import com.digitalhouse.carsrent.model.Caracteristicas;
import com.digitalhouse.carsrent.rest.controller.CaracteristicasController;
import com.digitalhouse.carsrent.rest.dto.caracteristicas.CaracteristicasGetDTO;
import com.digitalhouse.carsrent.rest.dto.caracteristicas.CaracteristicasPostDTO;
import com.digitalhouse.carsrent.service.CaracteristicasService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class CaracteristicasControllerTest {

    @Mock
    private CaracteristicasService caracteristicasService;

    @InjectMocks
    private CaracteristicasController caracteristicasController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreateCaracteristica() {
        // Mocking data
        CaracteristicasPostDTO dto = new CaracteristicasPostDTO("Caracteristica 1", "Icone 1");
        Caracteristicas caracteristica = new Caracteristicas("Caracteristica 1", "Icone 1");
        when(caracteristicasService.createCaracteristica(any(Caracteristicas.class))).thenReturn(caracteristica);

        // Call the controller method
        ResponseEntity<CaracteristicasGetDTO> response = caracteristicasController.createCaracteristica(dto);

        // Verify the service method was called with the correct data
        verify(caracteristicasService, times(1)).createCaracteristica(any(Caracteristicas.class));

        // Verify the returned response
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(caracteristica.getId(), response.getBody().getId());
        assertEquals(caracteristica.getNome(), response.getBody().getNome());
        assertEquals(caracteristica.getIcone(), response.getBody().getIcone());
    }

    @Test
    public void testGetCaracteristicaById() {
        // Mocking data
        Long caracteristicaId = 1L;
        Caracteristicas caracteristica = new Caracteristicas("Caracteristica 1", "Icone 1");
        when(caracteristicasService.getCaracteristicaById(caracteristicaId)).thenReturn(caracteristica);

        // Call the controller method
        ResponseEntity<CaracteristicasGetDTO> response = caracteristicasController.getCaracteristicaById(caracteristicaId);

        // Verify the service method was called with the correct ID
        verify(caracteristicasService, times(1)).getCaracteristicaById(caracteristicaId);

        // Verify the returned response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(caracteristica.getId(), response.getBody().getId());
        assertEquals(caracteristica.getNome(), response.getBody().getNome());
        assertEquals(caracteristica.getIcone(), response.getBody().getIcone());
    }

    @Test
    public void testGetAllCaracteristicas() {
        // Mocking data
        List<Caracteristicas> caracteristicas = new ArrayList<>();
        caracteristicas.add(new Caracteristicas("Caracteristica 1", "Icone 1"));
        caracteristicas.add(new Caracteristicas("Caracteristica 2", "Icone 2"));
        when(caracteristicasService.getAllCaracteristicas()).thenReturn(caracteristicas);

        // Call the controller method
        ResponseEntity<List<CaracteristicasGetDTO>> response = caracteristicasController.getAllCaracteristicas();

        // Verify the service method was called
        verify(caracteristicasService, times(1)).getAllCaracteristicas();

        // Verify the returned response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(caracteristicas.size(), response.getBody().size());
        assertEquals(caracteristicas.get(0).getId(), response.getBody().get(0).getId());
        assertEquals(caracteristicas.get(0).getNome(), response.getBody().get(0).getNome());
        assertEquals(caracteristicas.get(0).getIcone(), response.getBody().get(0).getIcone());
        assertEquals(caracteristicas.get(1).getId(), response.getBody().get(1).getId());
        assertEquals(caracteristicas.get(1).getNome(), response.getBody().get(1).getNome());
        assertEquals(caracteristicas.get(1).getIcone(), response.getBody().get(1).getIcone());
    }

    @Test
    public void testUpdateCaracteristica() {
        // Mocking data
        Long caracteristicaId = 1L;
        CaracteristicasPostDTO dto = new CaracteristicasPostDTO("Caracteristica 1", "Icone 1");
        Caracteristicas existingCaracteristica = new Caracteristicas("Caracteristica 1", "Icone 1");
        Caracteristicas updatedCaracteristica = new Caracteristicas("Caracteristica 1 Atualizada", "Icone 1 Atualizado");
        when(caracteristicasService.getCaracteristicaById(caracteristicaId)).thenReturn(existingCaracteristica);
        when(caracteristicasService.updateCaracteristica(any(Caracteristicas.class))).thenReturn(updatedCaracteristica);

        // Call the controller method
        ResponseEntity<CaracteristicasGetDTO> response = caracteristicasController.updateCaracteristica(caracteristicaId, dto);

        // Verify the service methods were called with the correct data
        verify(caracteristicasService, times(1)).getCaracteristicaById(caracteristicaId);
        verify(caracteristicasService, times(1)).updateCaracteristica(any(Caracteristicas.class));

        // Verify the returned response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedCaracteristica.getId(), response.getBody().getId());
        assertEquals(updatedCaracteristica.getNome(), response.getBody().getNome());
        assertEquals(updatedCaracteristica.getIcone(), response.getBody().getIcone());
    }

    @Test
    public void testDeleteCaracteristica() {
        // Mocking data
        Long caracteristicaId = 1L;
        Caracteristicas existingCaracteristica = new Caracteristicas("Caracteristica 1", "Icone 1");
        when(caracteristicasService.getCaracteristicaById(caracteristicaId)).thenReturn(existingCaracteristica);

        // Call the controller method
        ResponseEntity<Void> response = caracteristicasController.deleteCaracteristica(caracteristicaId);

        // Verify the service methods were called with the correct data
        verify(caracteristicasService, times(1)).getCaracteristicaById(caracteristicaId);
        verify(caracteristicasService, times(1)).deleteCaracteristica(caracteristicaId);

        // Verify the returned response
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
