package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.Cidade;
import com.digitalhouse.carsrent.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CidadeService {

    @Autowired
    private CidadeRepository cidadeRepository;

    public Cidade createCidade(Cidade cidade) {
        return cidadeRepository.save(cidade);
    }

    public Cidade updateCidade(Cidade cidade) {
        return cidadeRepository.save(cidade);
    }

    public Cidade getCidadeById(Long id) {
        return cidadeRepository.findById(id).orElse(null);
    }

    public List<Cidade> getAllCidades() {
        return cidadeRepository.findAll();
    }

    public void deleteCidade(Long id) {
        cidadeRepository.deleteById(id);
    }
}
