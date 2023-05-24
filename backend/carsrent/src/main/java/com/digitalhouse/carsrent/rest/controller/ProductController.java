package com.digitalhouse.carsrent.rest.controller;

import com.digitalhouse.carsrent.model.Category;
import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.rest.dto.category.CategoryDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductDTO;
import com.digitalhouse.carsrent.service.CategoryService;
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

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO dto) {
        Category category = categoryService.getCategoryById(dto.getCategoria().getId());
        if (category == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Product product = Product.fromDTO(dto);
        product.setCategoria(category);
        Product newProduct = productService.createProduct(product);

        return new ResponseEntity<>(newProduct.toDTO(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product product = productService.findById(id); // método corrigido
        if (product != null) {
            return new ResponseEntity<>(product.toDTO(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductDTO> dtos = products.stream().map(Product::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
        Product existingProduct = productService.findById(id); // método corrigido
        if (existingProduct != null) {
            Category category = categoryService.getCategoryById(dto.getCategoria().getId());
            if (category == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Product productToUpdate = Product.fromDTO(dto);
            productToUpdate.setId(id);
            productToUpdate.setCategoria(category);

            Product updatedProduct = productService.updateProduct(productToUpdate);
            return new ResponseEntity<>(updatedProduct.toDTO(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Product existingProduct = productService.findById(id); // método corrigido
        if (existingProduct != null) {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
