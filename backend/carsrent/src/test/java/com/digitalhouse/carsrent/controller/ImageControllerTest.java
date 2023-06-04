package com.digitalhouse.carsrent.controller;

import com.digitalhouse.carsrent.model.Image;
import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.rest.controller.ImageController;
import com.digitalhouse.carsrent.rest.dto.image.ImageDTO;
import com.digitalhouse.carsrent.service.ImageService;
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
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class ImageControllerTest {

    @Mock
    private ImageService imageService;

    @Mock
    private ProductService productService;

    @InjectMocks
    private ImageController imageController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateImage() {
        // Mocking data
        ImageDTO dto = new ImageDTO(null, "Image 1", "http://example.com/image1.jpg", 1L);
        Product product = new Product();
        Image image = new Image(1L, dto.getTitulo(), dto.getUrl(), product);
        when(productService.findById(dto.getProdutoId())).thenReturn(product);
        when(imageService.createImage(any(Image.class))).thenReturn(image);

        // Call the controller method
        ResponseEntity<ImageDTO> response = imageController.createImage(dto);

        // Verify the service methods were called with the correct data
        verify(productService, times(1)).findById(dto.getProdutoId());
        verify(imageService, times(1)).createImage(any(Image.class));

        // Verify the response status code and body
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        ImageDTO createdImageDTO = response.getBody();
        assertEquals(image.getId(), createdImageDTO.getId());
        assertEquals(image.getTitulo(), createdImageDTO.getTitulo());
        assertEquals(image.getUrl(), createdImageDTO.getUrl());
        assertEquals(image.getProduto().getId(), createdImageDTO.getProdutoId());
    }

    @Test
    public void testGetImageById() {
        // Mocking data
        Long imageId = 1L;
        Image image = new Image(1L, "Image 1", "http://example.com/image1.jpg", null);
        when(imageService.getImageById(imageId)).thenReturn(image);

        // Call the controller method
        ResponseEntity<ImageDTO> response = imageController.getImageById(imageId);

        // Verify the service method was called with the correct data
        verify(imageService, times(1)).getImageById(imageId);

        // Verify the response status code and body
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ImageDTO retrievedImageDTO = response.getBody();
        assertEquals(image.getId(), retrievedImageDTO.getId());
        assertEquals(image.getTitulo(), retrievedImageDTO.getTitulo());
        assertEquals(image.getUrl(), retrievedImageDTO.getUrl());
        assertEquals(image.getProduto() != null ? image.getProduto().getId() : null, retrievedImageDTO.getProdutoId());
    }

    @Test
    public void testGetAllImages() {
        // Mocking data
        List<Image> images = new ArrayList<>();
        images.add(new Image(1L, "Image 1", "http://example.com/image1.jpg", null));
        images.add(new Image(2L, "Image 2", "http://example.com/image2.jpg", null));
        when(imageService.getAllImages()).thenReturn(images);

        // Call the controller method
        ResponseEntity<List<ImageDTO>> response = imageController.getAllImages();

        // Verify the service method was called
        verify(imageService, times(1)).getAllImages();

        // Verify the response status code and body
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<ImageDTO> retrievedImageDTOs = response.getBody();
        assertEquals(images.size(), retrievedImageDTOs.size());
        for (int i = 0; i < images.size(); i++) {
            Image expectedImage = images.get(i);
            ImageDTO retrievedImageDTO = retrievedImageDTOs.get(i);
            assertEquals(expectedImage.getId(), retrievedImageDTO.getId());
            assertEquals(expectedImage.getTitulo(), retrievedImageDTO.getTitulo());
            assertEquals(expectedImage.getUrl(), retrievedImageDTO.getUrl());
            assertEquals(expectedImage.getProduto() != null ? expectedImage.getProduto().getId() : null, retrievedImageDTO.getProdutoId());
        }
    }

    @Test
    public void testUpdateImage() {
        // Mocking data
        Long imageId = 1L;
        ImageDTO dto = new ImageDTO(imageId, "Updated Image", "http://example.com/updated_image.jpg", 2L);
        Product product = new Product();
        Image existingImage = new Image(1L, "Image 1", "http://example.com/image1.jpg", null);
        Image updatedImage = new Image(imageId, dto.getTitulo(), dto.getUrl(), product);
        when(productService.findById(dto.getProdutoId())).thenReturn(product);
        when(imageService.getImageById(imageId)).thenReturn(existingImage);
        when(imageService.updateImage(any(Image.class))).thenReturn(updatedImage);

        // Call the controller method
        ResponseEntity<ImageDTO> response = imageController.updateImage(imageId, dto);

        // Verify the service methods were called with the correct data
        verify(productService, times(1)).findById(dto.getProdutoId());
        verify(imageService, times(1)).getImageById(imageId);
        verify(imageService, times(1)).updateImage(any(Image.class));

        // Verify the response status code and body
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ImageDTO updatedImageDTO = response.getBody();
        assertEquals(updatedImage.getId(), updatedImageDTO.getId());
        assertEquals(updatedImage.getTitulo(), updatedImageDTO.getTitulo());
        assertEquals(updatedImage.getUrl(), updatedImageDTO.getUrl());
        assertEquals(updatedImage.getProduto().getId(), updatedImageDTO.getProdutoId());
    }

    @Test
    public void testDeleteImage() {
        // Mocking data
        Long imageId = 1L;
        Image existingImage = new Image(imageId, "Image 1", "http://example.com/image1.jpg", null);
        when(imageService.getImageById(imageId)).thenReturn(existingImage);

        // Call the controller method
        ResponseEntity<Void> response = imageController.deleteImage(imageId);

        // Verify the service method was called with the correct data
        verify(imageService, times(1)).getImageById(imageId);
        verify(imageService, times(1)).deleteImage(imageId);

        // Verify the response status code
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }


    @Test
    public void testGetImagesByIds() {
        // Mocking data
        List<Long> imageIds = List.of(1L, 2L);
        List<Image> images = new ArrayList<>();
        images.add(new Image(1L, "Image 1", "http://example.com/image1.jpg", null));
        images.add(new Image(2L, "Image 2", "http://example.com/image2.jpg", null));
        when(imageService.getImagesByIds(imageIds)).thenReturn(images);

        // Call the controller method
        ResponseEntity<List<ImageDTO>> response = imageController.getImagesByIds(imageIds);

        // Verify the service method was called with the correct data
        verify(imageService, times(1)).getImagesByIds(imageIds);

        // Verify the response status code and body
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<ImageDTO> retrievedImageDTOs = response.getBody();
        assertEquals(images.size(), retrievedImageDTOs.size());
        for (int i = 0; i < images.size(); i++) {
            Image expectedImage = images.get(i);
            ImageDTO retrievedImageDTO = retrievedImageDTOs.get(i);
            assertEquals(expectedImage.getId(), retrievedImageDTO.getId());
            assertEquals(expectedImage.getTitulo(), retrievedImageDTO.getTitulo());
            assertEquals(expectedImage.getUrl(), retrievedImageDTO.getUrl());
            assertEquals(expectedImage.getProduto() != null ? expectedImage.getProduto().getId() : null, retrievedImageDTO.getProdutoId());
        }
    }
}
