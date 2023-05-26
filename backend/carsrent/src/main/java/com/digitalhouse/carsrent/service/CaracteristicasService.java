package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.Caracteristicas;
import com.digitalhouse.carsrent.repository.CaracteristicasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaracteristicasService {

    private final CaracteristicasRepository caracteristicasRepository;

    @Autowired
    public CaracteristicasService(CaracteristicasRepository caracteristicasRepository) {
        this.caracteristicasRepository = caracteristicasRepository;
    }

    public Caracteristicas createCaracteristica(Caracteristicas feature) {
        return caracteristicasRepository.save(feature);
    }

    public Caracteristicas updateCaracteristica(Caracteristicas feature) {
        return caracteristicasRepository.save(feature);
    }

    public Caracteristicas getCaracteristicaById(Long id) {
        return caracteristicasRepository.findById(id).orElse(null);
    }

    public List<Caracteristicas> getAllCaracteristicas() {
        return caracteristicasRepository.findAll();
    }

    public void deleteCaracteristica(Long id) {
        caracteristicasRepository.deleteById(id);
    }
}
