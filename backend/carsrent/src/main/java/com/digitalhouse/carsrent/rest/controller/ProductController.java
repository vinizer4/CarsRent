package com.digitalhouse.carsrent.rest.controller;

import com.digitalhouse.carsrent.model.Cidade;
import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.rest.dto.cidade.CidadeDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductGetDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductPostDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductPutDTO;
import com.digitalhouse.carsrent.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductGetDTO> createProduct(@RequestBody ProductPostDTO dto) {
        Product newProduct = productService.createProduct(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ProductGetDTO(newProduct));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductGetDTO> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(value -> ResponseEntity.ok(new ProductGetDTO(value))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ProductGetDTO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductGetDTO> dtos = products.stream().map(ProductGetDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductGetDTO> updateProduct(@PathVariable Long id, @RequestBody ProductPutDTO dto) {
        if (!id.equals(dto.getId())) {
            return ResponseEntity.badRequest().build();
        }

        Product updatedProduct = productService.updateProduct(dto);
        return updatedProduct != null ?
                ResponseEntity.ok(new ProductGetDTO(updatedProduct)) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bycity/{cityId}")
    public ResponseEntity<List<ProductGetDTO>> getProductsByCity(@PathVariable Long cityId) {
        List<Product> products = productService.findByCityId(cityId);
        List<ProductGetDTO> dtos = products.stream().map(ProductGetDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/bycategory/{categoryId}")
    public ResponseEntity<List<ProductGetDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        List<Product> products = productService.findByCategoryId(categoryId);
        List<ProductGetDTO> dtos = products.stream().map(ProductGetDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/cidades-with-products")
    public ResponseEntity<List<CidadeDTO>> getCidadesWithProducts() {
        List<Cidade> cidades = productService.getCidadesWithProducts();
        List<CidadeDTO> dtos = cidades.stream().map(cidade -> {
            return new CidadeDTO(cidade.getId(), cidade.getNome(), cidade.getPais());
        }).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

}
