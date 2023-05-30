package com.digitalhouse.carsrent.controller;

import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.rest.controller.ProductController;
import com.digitalhouse.carsrent.rest.dto.product.ProductGetDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductPostDTO;
import com.digitalhouse.carsrent.rest.dto.product.ProductPutDTO;
import com.digitalhouse.carsrent.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateProduct() {
        ProductPostDTO dto = new ProductPostDTO("Product Name", "Product Description", 1L, 1L, new ArrayList<>());
        Product product = new Product("Product Name", "Product Description", null, null, null, null);
        ProductGetDTO responseDto = new ProductGetDTO(1L, "Product Name", "Product Description", 1L, 1L, null, null);

        when(productService.fromPostDTO(dto)).thenReturn(product);
        when(productService.createProduct(product)).thenReturn(product);
        when(productService.toDTO(product)).thenReturn(responseDto);

        ResponseEntity<ProductGetDTO> response = productController.createProduct(dto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(responseDto, response.getBody());
        verify(productService, times(1)).fromPostDTO(dto);
        verify(productService, times(1)).createProduct(product);
        verify(productService, times(1)).toDTO(product);
    }

    @Test
    void testGetProductById() {
        Long productId = 1L;
        Product product = new Product("Product Name", "Product Description", null, null, null, null);
        ProductGetDTO responseDto = new ProductGetDTO(productId, "Product Name", "Product Description", 1L, 1L, null, null);

        when(productService.findById(productId)).thenReturn(product);
        when(productService.toDTO(product)).thenReturn(responseDto);

        ResponseEntity<ProductGetDTO> response = productController.getProductById(productId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(responseDto, response.getBody());
        verify(productService, times(1)).findById(productId);
        verify(productService, times(1)).toDTO(product);
    }

    @Test
    void testGetAllProducts() {
        List<Product> products = new ArrayList<>();
        products.add(new Product("Product Name 1", "Product Description 1", null, null, null, null));
        products.add(new Product("Product Name 2", "Product Description 2", null, null, null, null));
        List<ProductGetDTO> dtos = new ArrayList<>();
        dtos.add(new ProductGetDTO(1L, "Product Name 1", "Product Description 1", 1L, 1L, null, null));
        dtos.add(new ProductGetDTO(2L, "Product Name 2", "Product Description 2", 1L, 1L, null, null));

        when(productService.getAllProducts()).thenReturn(products);
        when(productService.toDTO(any(Product.class))).thenReturn(dtos.get(0), dtos.get(1));

        ResponseEntity<List<ProductGetDTO>> response = productController.getAllProducts();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dtos, response.getBody());
        verify(productService, times(1)).getAllProducts();
        verify(productService, times(2)).toDTO(any(Product.class));
    }

    @Test
    void testUpdateProduct() {
        Long productId = 1L;
        ProductPutDTO dto = new ProductPutDTO(productId, "Updated Name", "Updated Description", 1L, 1L, new ArrayList<>());
        Product product = new Product("Product Name", "Product Description", null, null, null, null);
        Product updatedProduct = new Product("Updated Name", "Updated Description", null, null, null, null);
        updatedProduct.setId(productId);
        ProductGetDTO responseDto = new ProductGetDTO(productId, "Updated Name", "Updated Description", 1L, 1L, null, null);

        when(productService.fromPutDTO(dto)).thenReturn(updatedProduct);
        when(productService.updateProduct(updatedProduct)).thenReturn(updatedProduct);
        when(productService.toDTO(updatedProduct)).thenReturn(responseDto);

        ResponseEntity<ProductGetDTO> response = productController.updateProduct(productId, dto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(responseDto, response.getBody());
        verify(productService, times(1)).fromPutDTO(dto);
        verify(productService, times(1)).updateProduct(updatedProduct);
        verify(productService, times(1)).toDTO(updatedProduct);
    }



    @Test
    void testDeleteProduct() {
        Long productId = 1L;
        Product existingProduct = new Product("Product Name", "Product Description", null, null, null, null);

        when(productService.findById(productId)).thenReturn(existingProduct);

        ResponseEntity<Void> response = productController.deleteProduct(productId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(productService, times(1)).findById(productId);
        verify(productService, times(1)).deleteProduct(productId);
    }

    @Test
    void testDeleteProduct_NotFound() {
        Long productId = 1L;

        when(productService.findById(productId)).thenReturn(null);

        ResponseEntity<Void> response = productController.deleteProduct(productId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(productService, times(1)).findById(productId);
        verify(productService, never()).deleteProduct(productId);
    }

    @Test
    void testGetProductsByCity() {
        Long cityId = 1L;
        List<Product> products = new ArrayList<>();
        products.add(new Product("Product Name 1", "Product Description 1", null, null, null, null));
        products.add(new Product("Product Name 2", "Product Description 2", null, null, null, null));
        List<ProductGetDTO> dtos = new ArrayList<>();
        dtos.add(new ProductGetDTO(1L, "Product Name 1", "Product Description 1", 1L, 1L, null, null));
        dtos.add(new ProductGetDTO(2L, "Product Name 2", "Product Description 2", 1L, 1L, null, null));

        when(productService.findByCityId(cityId)).thenReturn(products);
        when(productService.toDTO(any(Product.class))).thenReturn(dtos.get(0), dtos.get(1));

        ResponseEntity<List<ProductGetDTO>> response = productController.getProductsByCity(cityId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dtos, response.getBody());
        verify(productService, times(1)).findByCityId(cityId);
        verify(productService, times(2)).toDTO(any(Product.class));
    }

    @Test
    void testGetProductsByCategory() {
        Long categoryId = 1L;
        List<Product> products = new ArrayList<>();
        products.add(new Product("Product Name 1", "Product Description 1", null, null, null, null));
        products.add(new Product("Product Name 2", "Product Description 2", null, null, null, null));
        List<ProductGetDTO> dtos = new ArrayList<>();
        dtos.add(new ProductGetDTO(1L, "Product Name 1", "Product Description 1", 1L, 1L, null, null));
        dtos.add(new ProductGetDTO(2L, "Product Name 2", "Product Description 2", 1L, 1L, null, null));

        when(productService.findByCategoryId(categoryId)).thenReturn(products);
        when(productService.toDTO(any(Product.class))).thenReturn(dtos.get(0), dtos.get(1));

        ResponseEntity<List<ProductGetDTO>> response = productController.getProductsByCategory(categoryId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(dtos, response.getBody());
        verify(productService, times(1)).findByCategoryId(categoryId);
        verify(productService, times(2)).toDTO(any(Product.class));
    }
}
