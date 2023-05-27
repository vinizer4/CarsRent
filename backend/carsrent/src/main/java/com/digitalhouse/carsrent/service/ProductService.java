package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.*;
import com.digitalhouse.carsrent.repository.*;
import com.digitalhouse.carsrent.rest.dto.product.ProductGetDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CidadeRepository cidadeRepository;
    private final ImageRepository imageRepository;
    private final CaracteristicasRepository caracteristicasRepository;

    @Autowired
    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository,
                          CidadeRepository cidadeRepository,
                          ImageRepository imageRepository,
                          CaracteristicasRepository caracteristicasRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.cidadeRepository = cidadeRepository;
        this.imageRepository = imageRepository;
        this.caracteristicasRepository = caracteristicasRepository;
    }

    public Product fromDTO(ProductGetDTO dto) {
        Category categoria = categoryRepository.findById(dto.getCategoriaId()).orElse(null);
        Cidade cidade = cidadeRepository.findById(dto.getCidadeId()).orElse(null);

        List<Image> imagens = dto.getImagensIds().stream()
                                 .map(imageId -> imageRepository.findById(imageId).orElse(null))
                                 .collect(Collectors.toList());

        List<Caracteristicas> caracteristicas = dto.getCaracteristicasIds().stream()
                                                   .map(caracteristicasId -> caracteristicasRepository.findById(caracteristicasId).orElse(null))
                                                   .collect(Collectors.toList());

        Product product = new Product(dto.getNome(), dto.getDescricao(), categoria, cidade, imagens, caracteristicas);

        return product;
    }


    public ProductGetDTO toDTO(Product product) {
        List<Long> imagensIds = product.getImagens().stream().map(Image::getId).collect(Collectors.toList());
        List<Long> caracteristicasIds = product.getCaracteristicas().stream().map(Caracteristicas::getId).collect(Collectors.toList());

        return new ProductGetDTO(product.getId(), product.getNome(), product.getDescricao(), product.getCategoria().getId(), product.getCidade().getId(), imagensIds, caracteristicasIds);
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(Product product) {
        if (productRepository.existsById(product.getId())) {
            return productRepository.save(product);
        } else {
            return null;
        }
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
}
