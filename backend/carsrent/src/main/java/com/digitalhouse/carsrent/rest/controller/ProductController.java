package com.digitalhouse.carsrent.rest.controller;

import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.rest.dto.product.ProductGetDTO;
import com.digitalhouse.carsrent.service.CategoryService;
import com.digitalhouse.carsrent.service.CidadeService;
import com.digitalhouse.carsrent.service.CaracteristicasService;
import com.digitalhouse.carsrent.service.ImageService;
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

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CidadeService cidadeService;

    @Autowired
    private CaracteristicasService caracteristicasService;

    @Autowired
    private ImageService imageService;

    @PostMapping
    public ResponseEntity<ProductGetDTO> createProduct(@RequestBody ProductGetDTO dto) {
        Product product = productService.fromDTO(dto);
        Product newProduct = productService.createProduct(product);

        return newProduct != null ?
                new ResponseEntity<>(newProduct.toDTO(), HttpStatus.CREATED) :
                new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductGetDTO> getProductById(@PathVariable Long id) {
        Product product = productService.findById(id);
        if (product != null) {
            return new ResponseEntity<>(product.toDTO(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductGetDTO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductGetDTO> dtos = products.stream().map(Product::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductGetDTO> updateProduct(@PathVariable Long id, @RequestBody ProductGetDTO dto) {
        Product productToUpdate = productService.fromDTO(dto);
        productToUpdate.setId(id);

        Product updatedProduct = productService.updateProduct(productToUpdate);
        return updatedProduct != null ?
                new ResponseEntity<>(updatedProduct.toDTO(), HttpStatus.OK) :
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
}
