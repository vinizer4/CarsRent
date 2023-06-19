import React, {useEffect, useState}             from "react";
import {useForm}                                from "react-hook-form";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    createTheme,
    Grid,
    IconButton, MenuItem,
    Snackbar,
    TextField,
    ThemeProvider,
    Typography,
}                                               from "@mui/material";
import Box                                      from "@mui/material/Box";
import MuiAlert, {AlertProps}                   from "@mui/material/Alert";
import FavoriteIcon                             from "@mui/icons-material/Favorite";
import {styled}                                 from "@mui/material/styles";
import CardMedia                                from "@mui/material/CardMedia";
import {ProductService}                         from "../../core/service/product/ProductService";
import {CategoryService}                        from "../../core/service/category/CategoryService";
import CategoryCarousel
                                                from "../../core/components/CarouselCategoryItem/Carousel";
import {colorPrimary, colorRed, colorSoftBlack} from "../../core/utils/const/consts";
import {Link}                                   from "react-router-dom";
import {ImageService}                           from "../../core/service/image/ImageService";
import {ImageInterface}                         from "../../core/interface/ImageInterface";
import {ProductInterface}                       from "../../core/interface/ProductInterface";
import {CidadeInterface}                        from "../../core/interface/CidadeInterface";
import axios                                    from "axios";
import {CidadeService}                          from "../../core/service/cidade/CidadeService";
import {isSucess}                               from "../../core/utils/rest/restUtils";
import {Toasts}                                 from "../../core/utils/toast/toasts";
import {CategoriaInterface}                     from "../../core/interface/CategoryInterface";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createTheme();

export default function Home() {
    const {register, handleSubmit, setValue} = useForm();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [categories, setCategories] = useState<CategoriaInterface[]>([]);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [cidades, setCidades] = useState<CidadeInterface[]>([])
    const [images, setImages] = useState<ImageInterface[]>([]);
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>([])
    const [cidadeSelecionada, setCidadeSelecionada] = useState()
    const [isFiltered,setIsFiltered] = useState<boolean>(false)

    // async function getCategories() {
    //     try {
    //         const res = await CategoryService.GetAll();
    //         setCategories(res?.data);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }
    //
    // async function getProducts() {
    //     try {
    //         const res = await ProductService.GetAll();
    //         setProducts(res?.data);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }
    //
    // async function getImages() {
    //     try {
    //         const res = await ImageService.GetAll();
    //         setImages(res?.data);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    async function handleData() {
        try {
            const [produtos, imagens, cidades, categorias] = await axios.all([
                ProductService.GetAll(),
                ImageService.GetAll(),
                CidadeService.GetAll(),
                CategoryService.GetAll()
            ])
            if (produtos && isSucess(produtos.status)) {
                setProducts(produtos?.data)
            }
            if (imagens && isSucess(imagens.status)) {
                setImages(imagens?.data)
            }
            if (cidades && isSucess(cidades.status)) {
                setCidades(cidades?.data)
            }
            if (categorias && isSucess(categorias.status)) {
                setCategories(categorias?.data)
            }
        }
        catch (err) {
            Toasts.showError({text: "Falha ao obter dados!"})
        }
        finally {

        }
    }

    function onSubmit(data: any) {
        filterProduct()
    }

    useEffect(() => {
        register("date");
        // manually register date
    }, [register]);

    useEffect(() => {
        handleData()
    }, [])

    useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    function filterProduct() {
        const filteredProductsAux = products.filter(product =>
            product.nome.toLowerCase()
                .includes(searchText.toLowerCase())
        );

        setIsFiltered(true)
        console.log(filteredProductsAux)
        if(filteredProductsAux.length > 0) {
            setFilteredProducts(filteredProductsAux)
        } else if (filteredProductsAux.length === 0) {
            Toasts.showAlert({text: 'Não existem carros disponiveis para os filtros selecionados!'})
        }

    }

    const handleCategoryClick = (categoryId: number) => {
        const filteredProductsAux = products.filter(product => product.categoriaId === categoryId);

        if(filteredProductsAux.length > 0) {
            setFilteredProducts(filteredProductsAux)
        } else if (filteredProductsAux.length === 0) {
            Toasts.showAlert({text: 'Não existem carros disponiveis para os filtros selecionados!'})
        }
    };


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
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Typography>Selecione uma Cidade</Typography>
                                    <TextField
                                        select
                                        placeholder="Selecione uma Cidade"
                                        fullWidth
                                        value={cidadeSelecionada}
                                        onChange={(e: any) => setCidadeSelecionada(e.target.value)}
                                    >
                                        {cidades.map((cidade) => (
                                            <MenuItem key={cidade.id} value={cidade.id}>
                                                {cidade.nome}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Typography>Data e Hora</Typography>
                                    <TextField
                                        id="date"
                                        type="datetime-local"
                                        defaultValue={new Date().toISOString()
                                            .slice(0, 16)}
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
                                        style={{backgroundColor: colorRed}}
                                        fullWidth
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "1.3rem",
                                            padding: "0.5rem"
                                        }}

                                    >
                                        Buscar
                                    </Button>
                                    {products.length > 0 &&
                                    filteredProducts.length !== products.length &&
                                    (!products || !filteredProducts.every((value, index) => value === products[index])) ? (
                                        <Button
                                            variant="contained"
                                            style={{backgroundColor: colorPrimary}}
                                            fullWidth
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "1.3rem",
                                                padding: "0.5rem"
                                            }}
                                            onClick={() => setFilteredProducts(products)}
                                        >
                                            Remover filtros
                                        </Button>
                                    ) : null}
                                </Grid>
                            </Grid>
                        </form>
                    </div>

                    <CategoryCarousel categories={categories}
                                      handleCategoryClick={handleCategoryClick}/>

                    <div style={{backgroundColor: "rgb(243, 243, 243)"}}>
                        <Typography
                            variant="h5"
                            style={{marginLeft: '4rem', padding: '1rem', marginBottom: '-3rem'}}
                        >Recomendações
                        </Typography>
                        <Grid
                            padding="1rem"
                            container
                            spacing={2}
                            style={{marginTop: "1rem"}}
                        >
                            {filteredProducts.map((product, i) => (
                                <Grid
                                    style={{justifyContent: "center", display: "flex"}}
                                    item
                                    key={i}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <Card
                                        /*                             sx={{ maxWidth: 345 }} */
                                        sx={{
                                            width: {xs: "80vw", sm: "50vw", md: "30vw", lg: "25vw"},
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            loading="lazy"
                                            image={
                                                (
                                                    images.filter(
                                                        image => image.produtoId === product.id)[0]
                                                    || {}
                                                ).url
                                            }
                                            alt={product.nome}
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
                                                <Link style={{textDecoration: "none"}}
                                                      to={`/detail/${product?.id}`}>
                                                    {" "}
                                                    Ver Detalhes{" "}
                                                </Link>
                                            </Button>
                                            <IconButton aria-label="Favoritar">
                                                <FavoriteIcon/>
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
            <br/>
        </ThemeProvider>
    );
}
