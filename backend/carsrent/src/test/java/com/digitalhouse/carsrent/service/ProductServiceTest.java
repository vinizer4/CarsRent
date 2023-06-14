//package com.digitalhouse.carsrent.service;
//
//import com.digitalhouse.carsrent.model.*;
//import com.digitalhouse.carsrent.repository.*;
//import com.digitalhouse.carsrent.rest.dto.product.ProductGetDTO;
//import com.digitalhouse.carsrent.rest.dto.product.ProductPostDTO;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.*;
//
//public class ProductServiceTest {
//
//    @InjectMocks
//    private ProductService productService;
//
//    @Mock
//    private ProductRepository productRepository;
//
//    @Mock
//    private CategoryRepository categoryRepository;
//
//    @Mock
//    private CidadeRepository cidadeRepository;
//
//    @Mock
//    private CaracteristicasRepository caracteristicasRepository;
//
//    @BeforeEach
//    public void init() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testGetAllProducts() {
//        when(productRepository.findAll()).thenReturn(Arrays.asList(new Product(), new Product()));
//        List<Product> products = productService.getAllProducts();
//        assertEquals(2, products.size());
//    }
//
//    @Test
//    public void testFindProductById() {
//        Product product = new Product();
//        product.setId(1L);
//        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
//        Product foundProduct = productService.findById(1L);
//        assertEquals(product.getId(), foundProduct.getId());
//    }
//
//    @Test
//    public void testDeleteProduct() {
//        Product product = new Product();
//        product.setId(1L);
//        when(productRepository.existsById(1L)).thenReturn(true);
//        productService.deleteProduct(1L);
//        verify(productRepository, times(1)).deleteById(1L);
//    }
//
//    @Test
//    public void testUpdateProduct() {
//        Product product = new Product();
//        product.setId(1L);
//        product.setNome("Product Name");
//        when(productRepository.existsById(1L)).thenReturn(true);
//        when(productRepository.save(product)).thenReturn(product);
//        Product updatedProduct = productService.updateProduct(product);
//        assertEquals(product.getId(), updatedProduct.getId());
//        assertEquals(product.getNome(), updatedProduct.getNome());
//    }
//
//    @Test
//    public void testCreateProduct() {
//        Product product = new Product();
//        product.setNome("Product Name");
//        when(productRepository.save(product)).thenReturn(product);
//        Product createdProduct = productService.createProduct(product);
//        assertEquals(product.getNome(), createdProduct.getNome());
//    }
//
//    @Test
//    public void testFindByCityId() {
//        Product product = new Product();
//        product.setId(1L);
//        product.setNome("Product Name");
//        when(productRepository.findAllByCidade_Id(1L)).thenReturn(Arrays.asList(product));
//        List<Product> products = productService.findByCityId(1L);
//        assertEquals(1, products.size());
//        assertEquals(product.getId(), products.get(0).getId());
//        assertEquals(product.getNome(), products.get(0).getNome());
//    }
//
//    @Test
//    public void testFindByCategoryId() {
//        Product product = new Product();
//        product.setId(1L);
//        product.setNome("Product Name");
//        when(productRepository.findAllByCategoria_Id(1L)).thenReturn(Arrays.asList(product));
//        List<Product> products = productService.findByCategoryId(1L);
//        assertEquals(1, products.size());
//        assertEquals(product.getId(), products.get(0).getId());
//        assertEquals(product.getNome(), products.get(0).getNome());
//    }
//
//    @Test
//    public void testFromPostDTO() {
//        ProductPostDTO dto = new ProductPostDTO("Product Name", "Product Description", 1L, 1L, Arrays.asList(1L));
//        Category category = new Category();
//        category.setId(1L);
//        Cidade cidade = new Cidade();
//        cidade.setId(1L);
//        Caracteristicas caracteristicas = new Caracteristicas();
//        caracteristicas.setId(1L);
//
//        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
//        when(cidadeRepository.findById(1L)).thenReturn(Optional.of(cidade));
//        when(caracteristicasRepository.findById(1L)).thenReturn(Optional.of(caracteristicas));
//
//        Product product = productService.fromPostDTO(dto);
//
//        assertEquals(dto.getNome(), product.getNome());
//        assertEquals(dto.getDescricao(), product.getDescricao());
//        assertEquals(dto.getCategoriaId(), product.getCategoria().getId());
//        assertEquals(dto.getCidadeId(), product.getCidade().getId());
//    }
//
//    @Test
//    public void testToDTO() {
//        Product product = new Product();
//        product.setNome("Product Name");
//        product.setDescricao("Product Description");
//        Category category = new Category();
//        category.setId(1L);
//        product.setCategoria(category);
//        Cidade cidade = new Cidade();
//        cidade.setId(1L);
//        product.setCidade(cidade);
//        Image image = new Image();
//        image.setId(1L);
//        product.setImagens(Arrays.asList(image));
//        Caracteristicas caracteristicas = new Caracteristicas();
//        caracteristicas.setId(1L);
//        product.setCaracteristicas(Arrays.asList(caracteristicas));
//
//        ProductGetDTO dto = productService.toDTO(product);
//
//        assertEquals(product.getNome(), dto.getNome());
//        assertEquals(product.getDescricao(), dto.getDescricao());
//        assertEquals(product.getCategoria().getId(), dto.getCategoriaId());
//        assertEquals(product.getCidade().getId(), dto.getCidadeId());
//    }
//}
