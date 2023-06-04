package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.Cidade;
import com.digitalhouse.carsrent.repository.CidadeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CidadeServiceTest {

    @InjectMocks
    private CidadeService cidadeService;

    @Mock
    private CidadeRepository cidadeRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createCidade() {
        Cidade cidade = new Cidade(1L, "TestCity", "TestCountry");
        when(cidadeRepository.save(any(Cidade.class))).thenReturn(cidade);
        Cidade createdCidade = cidadeService.createCidade(cidade);
        assertEquals(createdCidade, cidade);
        verify(cidadeRepository, times(1)).save(cidade);
    }

    @Test
    void updateCidade() {
        Cidade cidade = new Cidade(1L, "TestCity", "TestCountry");
        when(cidadeRepository.save(any(Cidade.class))).thenReturn(cidade);
        Cidade updatedCidade = cidadeService.updateCidade(cidade);
        assertEquals(updatedCidade, cidade);
        verify(cidadeRepository, times(1)).save(cidade);
    }

    @Test
    void getCidadeById() {
        Cidade cidade = new Cidade(1L, "TestCity", "TestCountry");
        when(cidadeRepository.findById(1L)).thenReturn(Optional.of(cidade));
        Cidade foundCidade = cidadeService.getCidadeById(1L);
        assertEquals(foundCidade, cidade);
    }

    @Test
    void getAllCidades() {
        Cidade cidade1 = new Cidade(1L, "TestCity1", "TestCountry1");
        Cidade cidade2 = new Cidade(2L, "TestCity2", "TestCountry2");
        when(cidadeRepository.findAll()).thenReturn(Arrays.asList(cidade1, cidade2));
        assertEquals(2, cidadeService.getAllCidades().size());
    }

    @Test
    void deleteCidade() {
        doNothing().when(cidadeRepository).deleteById(1L);
        cidadeService.deleteCidade(1L);
        verify(cidadeRepository, times(1)).deleteById(1L);
    }
}
