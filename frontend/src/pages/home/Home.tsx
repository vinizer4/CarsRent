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
    ThemeProvider, IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';

// @ts-ignore
import SUVImage     from "../../core/assets/suv.png";
// @ts-ignore
import CompactImage from "../../core/assets/compact.png";
// @ts-ignore
import Sport        from "../../core/assets/sport.png";
// @ts-ignore
import Sedan        from "../../core/assets/sedan.png";
import CategoryCarousel
                    from "../../core/components/CarouselCategoryItem/Carousel";
import {colorRed}   from "../../core/utils/const/consts";
import {ScrollView} from "devextreme-react";

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

    const [categories] = useState([
        {
            imageUrl: SUVImage,
            title: "SUV",
            id: 1,
        },
        {
            imageUrl: CompactImage,
            title: "Hatch",
            id: 2,
        },
        {
            imageUrl: Sport,
            title: "Esportivo",
            id: 3,
        },
        {
            imageUrl: Sedan,
            title: "Sedan",
            id: 4,
        },
        {
            imageUrl: Sedan,
            title: "Sedan",
            id: 5,
        },
    ]);

    const onSubmit = (data: any) => {
        setSnackbarMessage(
            `Dados submetidos. Busca: ${data.search}, Data: ${data.date}`
        );
        setOpenSnackbar(true);
    };

    useEffect(() => {
        register("date"); // manually register date
    }, [register]);

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
                <div style={{ backgroundColor: "#f5f5f5", borderRadius: 10, padding: "16px", marginTop: "3rem", margin: '3rem' }}>
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
                                    style={{backgroundColor: colorRed}}
                                    fullWidth
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    Buscar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>



                <CategoryCarousel categories={categories}/>

                <Grid container spacing={2} style={{marginTop: '3rem'}}>
                    {categories.map((category, i) => (
                        <Grid item key={i} xs={12} sm={6} md={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={category.imageUrl}
                                    alt={category.title}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {category.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        O que é um {category.title}? A sigla {category.title} significa Sport Utility Vehicle --
                                        ou seja, veículo utilitário esportivo. Os {category.title} costumam ter
                                        porte avantajado, além de interior espaçoso e possibilidade de
                                        trafegar dentro e fora da cidade.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Ver no mapa</Button>
                                    <Button size="small">Alugar</Button>
                                    <IconButton aria-label="Favoritar">
                                        <FavoriteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>


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
