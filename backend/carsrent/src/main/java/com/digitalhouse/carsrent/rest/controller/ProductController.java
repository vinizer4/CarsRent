package com.digitalhouse.carsrent.rest.controller;

import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.rest.dto.product.ProductGetDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductPostDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductPutDTO;
import com.digitalhouse.carsrent.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        Product product = productService.fromPostDTO(dto);
        Product newProduct = productService.createProduct(product);

        return newProduct != null ?
                new ResponseEntity<>(productService.toDTO(newProduct), HttpStatus.CREATED) :
                new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductGetDTO> getProductById(@PathVariable Long id) {
        Product product = productService.findById(id);
        if (product != null) {
            return new ResponseEntity<>(productService.toDTO(product), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductGetDTO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductGetDTO> dtos = products.stream().map(productService::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductGetDTO> updateProduct(@PathVariable Long id, @RequestBody ProductPutDTO dto) {
        if (!id.equals(dto.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Product productToUpdate = productService.fromPutDTO(dto);
        Product updatedProduct = productService.updateProduct(productToUpdate);

        return updatedProduct != null ?
                new ResponseEntity<>(productService.toDTO(updatedProduct), HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Product existingProduct = productService.findById(id);
        if (existingProduct != null) {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/bycity/{cityId}")
    public ResponseEntity<List<ProductGetDTO>> getProductsByCity(@PathVariable Long cityId) {
        List<Product> products = productService.findByCityId(cityId);
        List<ProductGetDTO> dtos = products.stream().map(productService::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/bycategory/{categoryId}")
    public ResponseEntity<List<ProductGetDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        List<Product> products = productService.findByCategoryId(categoryId);
        List<ProductGetDTO> dtos = products.stream().map(productService::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

}
