package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.*;
import com.digitalhouse.carsrent.repository.*;
import com.digitalhouse.carsrent.rest.dto.product.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CidadeRepository cidadeRepository;

    @Autowired
    private CaracteristicasRepository caracteristicasRepository;

    public Product createProduct(ProductPostDTO dto) {
        Category categoria = categoryRepository.findById(dto.getCategoriaId()).orElse(null);
        Cidade cidade = cidadeRepository.findById(dto.getCidadeId()).orElse(null);

        List<Caracteristicas> caracteristicas = dto.getCaracteristicasIds().stream()
                                                   .map(caracteristicasRepository::findById)
                                                   .filter(java.util.Optional::isPresent)
                                                   .map(java.util.Optional::get)
                                                   .collect(Collectors.toList());

        Product product = new Product(dto.getNome(), dto.getDescricao(), categoria, cidade, null, caracteristicas);
        return productRepository.save(product);
    }

    public Product updateProduct(ProductPutDTO dto) {
        Product product = productRepository.findById(dto.getId()).orElse(null);

        if (product != null) {
            product.setNome(dto.getNome());
            product.setDescricao(dto.getDescricao());

            Category categoria = categoryRepository.findById(dto.getCategoriaId()).orElse(null);
            Cidade cidade = cidadeRepository.findById(dto.getCidadeId()).orElse(null);

            List<Caracteristicas> caracteristicas = dto.getCaracteristicasIds().stream()
                                                       .map(caracteristicasRepository::findById)
                                                       .filter(java.util.Optional::isPresent)
                                                       .map(java.util.Optional::get)
                                                       .collect(Collectors.toList());

            product.setCategoria(categoria);
            product.setCidade(cidade);
            product.setCaracteristicas(caracteristicas);

            return productRepository.save(product);
        }

        return null;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> findByCityId(Long cityId) {
        return productRepository.findAllByCidade_Id(cityId);
    }

    public List<Product> findByCategoryId(Long categoryId) {
        return productRepository.findAllByCategoria_Id(categoryId);
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }


    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Cidade> getCidadesWithProducts() {
        return cidadeRepository.findCidadesWithProducts();
    }
}
