package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.Image;
import com.digitalhouse.carsrent.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Image createImage(Image image) {
        return imageRepository.save(image);
    }

    public Image updateImage(Image image) {
        return imageRepository.save(image);
    }

    public Image getImageById(Long id) {
        return imageRepository.findById(id).orElse(null);
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }
}
