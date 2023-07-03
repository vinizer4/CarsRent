package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.Image;
import com.digitalhouse.carsrent.repository.ImageRepository;
import com.digitalhouse.carsrent.service.imagem.ImageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ImageServiceTest {

    @Mock
    private ImageRepository imageRepository;

    @InjectMocks
    private ImageService imageService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateImage() {
        // Mocking data
        Image image = new Image(1L, "Image 1", "http://example.com/image1.jpg", null);
        when(imageRepository.save(any(Image.class))).thenReturn(image);

        // Call the service method
        Image createdImage = imageService.createImage(image);

        // Verify the repository method was called with the correct data
        verify(imageRepository, times(1)).save(image);

        // Verify the returned image
        assertEquals(image.getId(), createdImage.getId());
        assertEquals(image.getTitulo(), createdImage.getTitulo());
        assertEquals(image.getUrl(), createdImage.getUrl());
        assertEquals(image.getProduto(), createdImage.getProduto());
    }

    @Test
    public void testUpdateImage() {
        // Mocking data
        Image image = new Image(1L, "Image 1", "http://example.com/image1.jpg", null);
        when(imageRepository.save(any(Image.class))).thenReturn(image);

        // Call the service method
        Image updatedImage = imageService.updateImage(image);

        // Verify the repository method was called with the correct data
        verify(imageRepository, times(1)).save(image);

        // Verify the returned image
        assertEquals(image.getId(), updatedImage.getId());
        assertEquals(image.getTitulo(), updatedImage.getTitulo());
        assertEquals(image.getUrl(), updatedImage.getUrl());
        assertEquals(image.getProduto(), updatedImage.getProduto());
    }

    @Test
    public void testGetImageById() {
        // Mocking data
        Long imageId = 1L;
        Image image = new Image(1L, "Image 1", "http://example.com/image1.jpg", null);
        when(imageRepository.findById(imageId)).thenReturn(Optional.of(image));

        // Call the service method
        Image retrievedImage = imageService.getImageById(imageId);

        // Verify the repository method was called with the correct data
        verify(imageRepository, times(1)).findById(imageId);

        // Verify the returned image
        assertEquals(image.getId(), retrievedImage.getId());
        assertEquals(image.getTitulo(), retrievedImage.getTitulo());
        assertEquals(image.getUrl(), retrievedImage.getUrl());
        assertEquals(image.getProduto(), retrievedImage.getProduto());
    }

    @Test
    public void testGetAllImages() {
        // Mocking data
        List<Image> images = new ArrayList<>();
        images.add(new Image(1L, "Image 1", "http://example.com/image1.jpg", null));
        images.add(new Image(2L, "Image 2", "http://example.com/image2.jpg", null));
        when(imageRepository.findAll()).thenReturn(images);

        // Call the service method
        List<Image> retrievedImages = imageService.getAllImages();

        // Verify the repository method was called
        verify(imageRepository, times(1)).findAll();

        // Verify the returned images
        assertEquals(images.size(), retrievedImages.size());
        for (int i = 0; i < images.size(); i++) {
            Image expectedImage = images.get(i);
            Image retrievedImage = retrievedImages.get(i);
            assertEquals(expectedImage.getId(), retrievedImage.getId());
            assertEquals(expectedImage.getTitulo(), retrievedImage.getTitulo());
            assertEquals(expectedImage.getUrl(), retrievedImage.getUrl());
            assertEquals(expectedImage.getProduto(), retrievedImage.getProduto());
        }
    }

    @Test
    public void testDeleteImage() {
        // Mocking data
        Long imageId = 1L;

        // Call the service method
        imageService.deleteImage(imageId);

        // Verify the repository method was called with the correct data
        verify(imageRepository, times(1)).deleteById(imageId);
    }

    @Test
    public void testGetImagesByIds() {
        // Mocking data
        List<Long> imageIds = List.of(1L, 2L);
        List<Image> images = new ArrayList<>();
        images.add(new Image(1L, "Image 1", "http://example.com/image1.jpg", null));
        images.add(new Image(2L, "Image 2", "http://example.com/image2.jpg", null));
        when(imageRepository.findAllById(imageIds)).thenReturn(images);

        // Call the service method
        List<Image> retrievedImages = imageService.getImagesByIds(imageIds);

        // Verify the repository method was called with the correct data
        verify(imageRepository, times(1)).findAllById(imageIds);

        // Verify the returned images
        assertEquals(images.size(), retrievedImages.size());
        for (int i = 0; i < images.size(); i++) {
            Image expectedImage = images.get(i);
            Image retrievedImage = retrievedImages.get(i);
            assertEquals(expectedImage.getId(), retrievedImage.getId());
            assertEquals(expectedImage.getTitulo(), retrievedImage.getTitulo());
            assertEquals(expectedImage.getUrl(), retrievedImage.getUrl());
            assertEquals(expectedImage.getProduto(), retrievedImage.getProduto());
        }
    }
}
