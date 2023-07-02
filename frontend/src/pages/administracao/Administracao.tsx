import React, { useEffect, useState } from "react";
import { ThemeProvider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useForm } from "react-hook-form";
import { colorRed } from "../../core/utils/const/consts";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ImageService } from "../../core/service/image/ImageService";
import { ImageInterface } from "../../core/interface/ImageInterface";
import { ProductInterface } from "../../core/interface/ProductInterface";
import { CidadeInterface } from "../../core/interface/CidadeInterface";
import axios from "axios";
import { CidadeService } from "../../core/service/cidade/CidadeService";
import { isSucess } from "../../core/utils/rest/restUtils";
import { Toasts } from "../../core/utils/toast/toasts";
import { CategoriaInterface } from "../../core/interface/CategoryInterface";
import { useNavigate } from "react-router";
import { ProductService } from "../../core/service/product/ProductService";
import { CategoryService } from "../../core/service/category/CategoryService";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const theme = createTheme();

export default function Administracao() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [categories, setCategories] = useState<CategoriaInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [cidades, setCidades] = useState<CidadeInterface[]>([]);
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );
  const [cidadeSelecionada, setCidadeSelecionada] = useState();
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState();

  const navigate = useNavigate();

  async function handleData() {
    try {
      const [produtos, imagens, cidades, categorias] = await axios.all([
        ProductService.GetAll(),
        ImageService.GetAll(),
        CidadeService.GetAllCityWhereExistsProducts(),
        CategoryService.GetAll(),
      ]);
      if (produtos && isSucess(produtos.status)) {
        setProducts(produtos?.data);
      }
      if (imagens && isSucess(imagens.status)) {
        setImages(imagens?.data);
      }
      if (cidades && isSucess(cidades.status)) {
        setCidades(cidades?.data);
      }
      if (categorias && isSucess(categorias.status)) {
        setCategories(categorias?.data);
      }
    } catch (err) {
      Toasts.showError({ text: "Falha ao obter dados!" });
    } finally {
    }
  }

  function onSubmit(data: any) {
    console.log(data);
  }

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  function filterCategoriaProduct(categoriaId: number) {
    console.log(products);
    const filteredProductsAux = products.filter((product) =>
      String(product.cidadeId).includes(String(cidadeId))
    );

    console.log(filteredProductsAux);
    if (filteredProductsAux.length > 0) {
      setFilteredProducts(filteredProductsAux);
    } else if (filteredProductsAux.length === 0) {
      Toasts.showAlert({
        text: "Não existem carros disponiveis para os filtros selecionados!",
      });
    }
  }

  const handleCategoryClick = (categoryId: number) => {
    const filteredProductsAux = products.filter(
      (product) => product.categoriaId === categoryId
    );

    if (filteredProductsAux.length > 0) {
      setFilteredProducts(filteredProductsAux);
    } else if (filteredProductsAux.length === 0) {
      Toasts.showAlert({
        text: "Não existem carros disponiveis para os filtros selecionados!",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{ backgroundColor: colorRed, padding: "1rem" }}
          position="static"
        >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Administração
            </Typography>
            <div>
              <Link style={{ color: "white" }} to="/">
                {" "}
                <ArrowBackIosOutlinedIcon />{" "}
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography
        margin="2rem"
        variant="h5"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        Criar Produto
      </Typography>
      <Box>
        <form
          style={{
            borderRadius: "20px",
            margin: "2rem",
            padding: "2rem",
            display: "flex",
          }}
        >
          <Grid
            style={{ justifyContent: "space-between" }}
            container
            spacing={3}
          >
            <Grid item xs={12} sm={6}>
              <Typography style={{ marginBottom: "0.5rem" }}>
                Nome do Carro
              </Typography>
              <TextField id="name" variant="outlined" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography style={{ marginBottom: "0.5rem" }}>
                Selecione uma Cidade
              </Typography>
              <TextField
                select
                {...register("cidade")}
                id={"cidade"}
                placeholder="Selecione uma Cidade"
                fullWidth
                value={cidadeSelecionada}
                onChange={(e: any) => {
                  setCidadeSelecionada(e.target.value);
                }}
              >
                {cidades.map((cidade) => (
                  <MenuItem key={cidade.id} value={cidade.id}>
                    {cidade.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography style={{ marginBottom: "0.5rem" }}>
                Endereço
              </Typography>
              <TextField id="name" variant="outlined" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography style={{ marginBottom: "0.5rem" }}>
                Selecione uma Categoria
              </Typography>
              <TextField
                select
                {...register("categorias")}
                id={"categorias"}
                placeholder="Selecione uma Categoria"
                fullWidth
                value={categoriaSelecionada}
                onChange={(e: any) => {
                  setCategoriaSelecionada(e.target.value);
                  filterCategoriaProduct(e.target.value);
                }}
              >
                {categories.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.qualification}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ marginBottom: "0.5rem" }}>
                Descrição
              </Typography>
              <TextField
                id="descricao"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                marginTop="1rem"
                variant="h5"
                component="div"
                color="#EF4649"
                sx={{ flexGrow: 1 }}
              >
                Adicionar Características
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography style={{ marginBottom: "0.5rem" }}>Nome</Typography>
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                required
                placeholder="Ex.: Airbag"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography style={{ marginBottom: "0.5rem" }}>Ícone</Typography>
              <div style={{ display: "flex" }}>
                <TextField id="name" variant="outlined" fullWidth required />
                <button style={{ border: "none", backgroundColor: 'transparent'}}>
                  <AddCircleIcon
                    fontSize="large"
                    style={{ color: colorRed}}
                  ></AddCircleIcon>
                </button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography
                marginTop="1rem"
                marginBottom="2rem"
                variant="h5"
                component="div"
                color="#EF4649"
                sx={{ flexGrow: 1 }}
              >
                Carregar Imagens
              </Typography>
              <div style={{ display: "flex" }}>
                <TextField
                  id="name"
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Insira https://"
                />
                <button style={{ border: "none", backgroundColor: 'transparent'}}>
                  <AddCircleIcon
                    fontSize="large"
                    style={{ color: colorRed }}
                  ></AddCircleIcon>
                </button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ backgroundColor: colorRed, color: "white" }}
                fullWidth
              >
                Criar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </ThemeProvider>
  );
}
