package com.digitalhouse.carsrent.controller;

import com.digitalhouse.carsrent.model.Category;
import com.digitalhouse.carsrent.rest.controller.CategoryController;
import com.digitalhouse.carsrent.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CategoryController.class)
public class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService categoryService;

    @Test
    public void testCreateCategory() throws Exception {
        Category category = new Category(1L, "Qualification", "Description", "ImageUrl");
        when(categoryService.createCategory(any(Category.class))).thenReturn(category);

        mockMvc.perform(post("/api/categories")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"id\": 1, \"qualification\": \"Qualification\", \"description\": \"Description\", \"imageUrl\": \"ImageUrl\"}"))
               .andExpect(status().isCreated());
    }

    @Test
    public void testGetCategoryById() throws Exception {
        Category category = new Category(1L, "Qualification", "Description", "ImageUrl");
        when(categoryService.getCategoryById(anyLong())).thenReturn(category);

        mockMvc.perform(get("/api/categories/1"))
               .andExpect(status().isOk());
    }

    @Test
    public void testUpdateCategory() throws Exception {
        Category category = new Category(1L, "Qualification", "Description", "ImageUrl");
        when(categoryService.getCategoryById(anyLong())).thenReturn(category);
        when(categoryService.updateCategory(any(Category.class))).thenReturn(category);

        mockMvc.perform(put("/api/categories/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"id\": 1, \"qualification\": \"Updated\", \"description\": \"Description\", \"imageUrl\": \"ImageUrl\"}"))
               .andExpect(status().isOk());
    }

    @Test
    public void testDeleteCategory() throws Exception {
        Category category = new Category(1L, "Qualification", "Description", "ImageUrl");
        when(categoryService.getCategoryById(anyLong())).thenReturn(category);

        mockMvc.perform(delete("/api/categories/1"))
               .andExpect(status().isNoContent());
    }
}
