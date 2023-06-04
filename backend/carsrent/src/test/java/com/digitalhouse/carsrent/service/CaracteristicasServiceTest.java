package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.Caracteristicas;
import com.digitalhouse.carsrent.repository.CaracteristicasRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class CaracteristicasServiceTest {

    @Mock
    private CaracteristicasRepository caracteristicasRepository;

    @InjectMocks
    private CaracteristicasService caracteristicasService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreateCaracteristica() {
        // Mocking data
        Caracteristicas caracteristica = new Caracteristicas("Caracteristica 1", "Icone 1");
        when(caracteristicasRepository.save(any(Caracteristicas.class))).thenReturn(caracteristica);

        // Call the service method
        Caracteristicas result = caracteristicasService.createCaracteristica(caracteristica);

        // Verify the repository method was called with the correct data
        verify(caracteristicasRepository, times(1)).save(caracteristica);

        // Verify the returned result
        assertEquals(caracteristica, result);
    }

    @Test
    public void testUpdateCaracteristica() {
        // Mocking data
        Caracteristicas caracteristica = new Caracteristicas("Caracteristica 1", "Icone 1");
        when(caracteristicasRepository.save(any(Caracteristicas.class))).thenReturn(caracteristica);

        // Call the service method
        Caracteristicas result = caracteristicasService.updateCaracteristica(caracteristica);

        // Verify the repository method was called with the correct data
        verify(caracteristicasRepository, times(1)).save(caracteristica);

        // Verify the returned result
        assertEquals(caracteristica, result);
    }

    @Test
    public void testGetCaracteristicaById() {
        // Mocking data
        Long caracteristicaId = 1L;
        Caracteristicas caracteristica = new Caracteristicas("Caracteristica 1", "Icone 1");
        when(caracteristicasRepository.findById(caracteristicaId)).thenReturn(Optional.of(caracteristica));

        // Call the service method
        Caracteristicas result = caracteristicasService.getCaracteristicaById(caracteristicaId);

        // Verify the repository method was called with the correct ID
        verify(caracteristicasRepository, times(1)).findById(caracteristicaId);

        // Verify the returned result
        assertEquals(caracteristica, result);
    }

    @Test
    public void testGetAllCaracteristicas() {
        // Mocking data
        List<Caracteristicas> caracteristicas = new ArrayList<>();
        caracteristicas.add(new Caracteristicas("Caracteristica 1", "Icone 1"));
        caracteristicas.add(new Caracteristicas("Caracteristica 2", "Icone 2"));
        when(caracteristicasRepository.findAll()).thenReturn(caracteristicas);

        // Call the service method
        List<Caracteristicas> result = caracteristicasService.getAllCaracteristicas();

        // Verify the repository method was called
        verify(caracteristicasRepository, times(1)).findAll();

        // Verify the returned result
        assertEquals(caracteristicas, result);
    }

    @Test
    public void testDeleteCaracteristica() {
        // Mocking data
        Long caracteristicaId = 1L;

        // Call the service method
        caracteristicasService.deleteCaracteristica(caracteristicaId);

        // Verify the repository method was called with the correct ID
        verify(caracteristicasRepository, times(1)).deleteById(caracteristicaId);
    }

}
