package com.digitalhouse.carsrent.service;

import com.digitalhouse.carsrent.model.Category;
import com.digitalhouse.carsrent.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

public class CategoryServiceTest {

    @InjectMocks
    CategoryService categoryService;

    @Mock
    CategoryRepository categoryRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateCategory() {
        Category category = new Category(1L, "Qualification", "Description", "imageUrl");
        when(categoryRepository.save(category)).thenReturn(category);
        Category result = categoryService.createCategory(category);
        assertEquals(category, result);
    }

    @Test
    public void testUpdateCategory() {
        Category category = new Category(1L, "Qualification", "Description", "imageUrl");
        when(categoryRepository.save(category)).thenReturn(category);
        Category result = categoryService.updateCategory(category);
        assertEquals(category, result);
    }

    @Test
    public void testGetCategoryById() {
        Category category = new Category(1L, "Qualification", "Description", "imageUrl");
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        Category result = categoryService.getCategoryById(1L);
        assertEquals(category, result);
    }

    @Test
    public void testGetCategoryByIdNotFound() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.empty());
        Category result = categoryService.getCategoryById(1L);
        assertNull(result);
    }

    @Test
    public void testGetAllCategories() {
        List<Category> categories = new ArrayList<>();
        categories.add(new Category(1L, "Qualification", "Description", "imageUrl"));
        categories.add(new Category(2L, "Qualification2", "Description2", "imageUrl2"));
        when(categoryRepository.findAll()).thenReturn(categories);
        List<Category> result = categoryService.getAllCategories();
        assertEquals(categories, result);
    }

    @Test
    public void testDeleteCategory() {
        doNothing().when(categoryRepository).deleteById(1L);
        categoryService.deleteCategory(1L);
        verify(categoryRepository, times(1)).deleteById(1L);
    }
}
