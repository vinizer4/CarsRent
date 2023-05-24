package com.digitalhouse.carsrent.rest.controller;

import com.digitalhouse.carsrent.model.Image;
import com.digitalhouse.carsrent.model.Product;
import com.digitalhouse.carsrent.rest.dto.image.ImageDTO;
import com.digitalhouse.carsrent.service.ImageService;
import com.digitalhouse.carsrent.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ImageDTO> createImage(@RequestBody ImageDTO dto) {
        Product product = productService.findById(dto.getProdutoId());
        Image image = Image.fromDTO(dto, product);
        Image newImage = imageService.createImage(image);
        return new ResponseEntity<>(newImage.toDTO(), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImageDTO> getImageById(@PathVariable Long id) {
        Image image = imageService.getImageById(id);
        if (image != null) {
            return new ResponseEntity<>(image.toDTO(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<ImageDTO>> getAllImages() {
        List<Image> images = imageService.getAllImages();
        List<ImageDTO> dtos = images.stream().map(Image::toDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImageDTO> updateImage(@PathVariable Long id, @RequestBody ImageDTO dto) {
        Product product = productService.findById(dto.getProdutoId());
        Image existingImage = imageService.getImageById(id);
        if (existingImage != null) {
            Image imageToUpdate = Image.fromDTO(dto, product);
            imageToUpdate.setId(id);
            Image updatedImage = imageService.updateImage(imageToUpdate);
            return new ResponseEntity<>(updatedImage.toDTO(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        Image existingImage = imageService.getImageById(id);
        if (existingImage != null) {
            imageService.deleteImage(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
