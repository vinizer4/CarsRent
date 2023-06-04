import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Grid,
  Snackbar,
  createTheme,
  ThemeProvider,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import { ProductService } from "../../core/service/product/ProductService";
import { CategoryService } from "../../core/service/category/CategoryService";
/* 
// @ts-ignore
import SUVImage from "../../core/assets/suv.png";
// @ts-ignore
import CompactImage from "../../core/assets/compact.png";
// @ts-ignore
import Sport from "../../core/assets/sport.png";
// @ts-ignore
import Sedan from "../../core/assets/sedan.png"; */
import CategoryCarousel from "../../core/components/CarouselCategoryItem/Carousel";
import { colorRed }     from "../../core/utils/const/consts";
import { ScrollView }   from "devextreme-react";
import { Link }         from "react-router-dom";
import { ImageService } from "../../core/service/image/ImageService";
import {
  CategoryInterface
}                       from "../../core/interface/CategoryInterface";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledCardMedia = styled(CardMedia)({
  height: 140,
});

const theme = createTheme();

export default function Home() {
  const { register, handleSubmit, setValue } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  async function getCategories() {
    try {
      const res = await CategoryService.GetAll();
      setCategories(res?.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getProducts() {
    try {
      const res = await ProductService.GetAll();
      /*           res.array.forEach(product => {
            setImages(getImageById(product.id))
          }); */
      setProducts(res?.data);
      console.log(products);
    } catch (err) {
      console.log(err);
    }
  }

  async function getImageById(id: any) {
    try {
      const res = await ImageService.GetImageById(id);
      return res?.data.url;
    } catch (err) {
      console.log(err);
    }
  }

  async function getImages() {
    try {
      const res = await ImageService.GetAll();
      setImages(res?.data);
    } catch (err) {
      console.log(err);
    }
  }

  function onSubmit(data: any) {
    setSnackbarMessage(
      `Dados submetidos. Busca: ${data.search}, Data: ${data.date}`
    );
    setOpenSnackbar(true);
  }

  useEffect(() => {
    register("date");
    // manually register date
  }, [register] );

  useEffect(() =>{
    getCategories();
    getImages();
    getProducts();
  }, [])

  const handleCloseSnackbar = (
    event: React.SyntheticEvent<any> | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box overflow="auto">
        <Box mt={4}>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: 10,
              padding: "16px",
              marginLeft: "3rem",
              marginRight: "3rem",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <Typography>Buscar Modelo</Typography>
                  <TextField
                    placeholder="Qual carro você quer dirigir hoje?"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography>Onde você está?</Typography>
                  <TextField placeholder="Onde você está?" fullWidth />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography>Data e Hora</Typography>
                  <TextField
                    id="date"
                    type="datetime-local"
                    defaultValue={new Date().toISOString().slice(0, 16)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={(e) => setValue("date", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: colorRed }}
                    fullWidth
                    sx={{ display: "flex", justifyContent: "center", marginTop: "1.3rem", padding: "0.5rem" }}

                  >
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>

          <CategoryCarousel categories={categories} />

          <div style={{ backgroundColor: "rgb(243, 243, 243)" }}>
            <Typography 
            variant="h5"
            style={{marginLeft: '4rem', padding: '1rem', marginBottom: '-3rem'}}
            >Recomendações
            </Typography>
            <Grid
              padding="1rem"
              container
              spacing={2}
              style={{ marginTop: "1rem" }}
            >
              {products.map((product, i) => (
                <Grid
                  style={{ justifyContent: "center", display: "flex" }}
                  item
                  key={i}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Card
                    /*                             sx={{ maxWidth: 345 }} */
                    sx={{
                      width: { xs: "80vw", sm: "50vw", md: "30vw", lg: "25vw" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="194"
                      loading="lazy"
                      image={
                        images.filter((image?) => image?.id === product?.id)[0].url
                      }
                      alt={product?.nome}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {product?.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product?.descricao}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Ver no mapa</Button>
                      <Button size="small">Alugar</Button>
                      <Button size="small">
                        <Link style={{ textDecoration: "none" }} to={`/detail/${product?.id}`}>
                          {" "}
                          Ver Detalhes{" "}
                        </Link>
                      </Button>
                      <IconButton aria-label="Favoritar">
                        <FavoriteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      <br />
    </ThemeProvider>
  );
}
