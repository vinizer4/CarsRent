import * as React                        from "react";
import {useEffect, useState}             from "react";
import AppBar                            from "@mui/material/AppBar";
import Box                               from "@mui/material/Box";
import Toolbar                           from "@mui/material/Toolbar";
import Typography                        from "@mui/material/Typography";
import Button                            from "@mui/material/Button";
import {createTheme}                     from "@mui/material/styles";
import {ThemeProvider, IconButton, Grid} from "@mui/material";
import {colorRed}                        from "../../core/utils/const/consts";
import FavoriteIcon                      from "@mui/icons-material/Favorite";
import ShareIcon                         from "@mui/icons-material/Share";
import StarIcon                          from "@mui/icons-material/Star";
import StarBorderOutlinedIcon            from "@mui/icons-material/StarBorderOutlined";
import PlaceOutlinedIcon                 from "@mui/icons-material/PlaceOutlined";
import {colorSoftBlack}                  from "../../core/utils/const/consts";
import ArrowBackIosOutlinedIcon          from "@mui/icons-material/ArrowBackIosOutlined";
import {Link}                            from "react-router-dom";
import NoCrashIcon                       from "@mui/icons-material/NoCrash";
import AcUnitIcon                        from "@mui/icons-material/AcUnit";
import AddLocationIcon                   from "@mui/icons-material/AddLocation";
import {CidadeService}                   from "../../core/service/cidade/CidadeService";
import {ProductService}                  from "../../core/service/product/ProductService";
import {ImageService}                    from "../../core/service/image/ImageService";
import {useParams}                       from "react-router-dom";
import PrivacyPolicy                     from "../../core/components/CompanyPolicy/CompanyPolicy";
import {isSucess}                        from "../../core/utils/rest/restUtils";
import {
    CaracteristicaService
}                                        from "../../core/service/caracteristicas/CaracteristicaService";
import {ICaracteristica}                 from "../../core/interface/CaracteristicaInterface";

const theme = createTheme();

export default function Details() {
    const [product, setProduct] = useState([]);
    const [image, setImage] = useState([]);
    const [cidade, setCidade] = useState([]);
    const [nomeProduto, setNomeProduto] = useState("");
    const [descricao, setDescricao] = useState("");
    const [caracteristicas, setCaracteristicas] = useState([])

    const {id} = useParams();

    async function getProductById(id: any) {
        try {
            const res = await ProductService.GetProductById(id);
            if (res && isSucess(res?.status)) {
                setProduct(res?.data);
                const caracteristicas = await CaracteristicaService.GetCaracteristicasByIds(
                    res?.data.caracteristicasIds)

                if (caracteristicas && isSucess(res?.status)) {
                    console.log(caracteristicas)
                    setCaracteristicas(caracteristicas?.data)
                }
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    async function getCidadeById(id: any) {
        try {
            const res = await CidadeService.GetCidadeById(id);
            setCidade(res?.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    async function getImageById(id: any) {
        try {
            const res = await ImageService.GetImageById(id);
            setImage(res?.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCidadeById(id);
        getProductById(id);
        getImageById(id);
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar
                        style={{backgroundColor: colorRed, padding: "1rem"}}
                        position="static"
                    >
                        <Toolbar>
                            <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                                {product?.nome}
                            </Typography>
                            <div>
                                <Link style={{color: "white"}} to="/">
                                    {" "}
                                    <ArrowBackIosOutlinedIcon/>{" "}
                                </Link>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static" color="inherit">
                        <Toolbar>
                            <PlaceOutlinedIcon/>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{flexGrow: 1, marginLeft: "1rem"}}
                            >
                                {cidade.nome} - {cidade.pais}
                            </Typography>
                            <div style={{display: "flex"}}>
                                <div style={{display: "grid"}}>
                                    <span style={{textAlign: "center"}}> Muito Bom </span>
                                    <div style={{color: colorRed}}>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarBorderOutlinedIcon/>
                                    </div>
                                </div>

                                <div style={{display: "flex"}}>
                                    <h4
                                        style={{
                                            padding: "5px",
                                            marginLeft: "15px",
                                            marginTop: "5px",
                                            backgroundColor: colorSoftBlack,
                                            color: "white",
                                            borderRadius: "10px",
                                            width: "3rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        8
                                    </h4>
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Box>
                <div style={{padding: "0.5rem"}}>
                    <IconButton aria-label="Salvar">
                        <FavoriteIcon/>
                    </IconButton>
                    <IconButton aria-label="Compartilhar">
                        <ShareIcon/>
                    </IconButton>
                </div>
                <Box padding="2rem" overflow="auto">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <img
                                src={image.url}
                                alt="Imagem"
                                style={{width: "100%", borderRadius: "15px"}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} container spacing={2}>
                            <Grid item xs={6}>
                                <img
                                    src={image.url}
                                    alt="Imagem"
                                    style={{width: "100%", borderRadius: "15px"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <img
                                    src={image.url}
                                    alt="Imagem"
                                    style={{width: "100%", borderRadius: "15px"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <img
                                    src={image.url}
                                    alt="Imagem"
                                    style={{width: "100%", borderRadius: "15px"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <img
                                    src={image.url}
                                    alt="Imagem"
                                    style={{width: "100%", borderRadius: "15px"}}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Typography
                    text-align="center"
                    justify-content="center"
                    margin="2rem"
                    variant="h4"
                    component="div"
                    sx={{flexGrow: 1}}
                >
                    Saiba mais sobre o carro:
                </Typography>
                <Typography
                    text-align="justify"
                    margin="2rem"
                    font-size="30px"
                    component="div"
                    sx={{flexGrow: 1}}
                >
                    {product.descricao}
                </Typography>
                <Typography
                    text-align="center"
                    justify-content="center"
                    margin="2rem"
                    variant="h4"
                    component="div"
                    sx={{flexGrow: 1}}
                >
                    Características:
                </Typography>
                <div
                    style={{
                        backgroundColor: colorRed,
                        width: "100%",
                        height: "0.15rem",
                        marginTop: "-2rem",
                        marginBottom: "1rem",
                    }}
                ></div>
                <div
                    style={{
                        display: "flex",
                        gap: "12rem",
                        marginBottom: "2rem",
                        marginLeft: "2rem",
                        marginRight: "2rem",
                        marginTop: "2rem",
                    }}
                >
                    {caracteristicas.map((caracteristica: ICaracteristica) => (
                        <Box display="flex" alignItems="center">
                            <Box>
                                <img src={caracteristica.icone} alt={caracteristica.nome}
                                     style={{width: '24px', height: '24px'}}/>
                            </Box>
                            <Box ml={1}>
                                <Typography variant="body1">
                                    {caracteristica.nome}
                                </Typography>
                            </Box>
                        </Box>
                    ))}

                </div>
                <div style={{backgroundColor: "rgb(243, 243, 243)"}}>
                    <Typography
                        text-align="center"
                        justify-content="center"
                        margin="2rem"
                        variant="h4"
                        component="div"
                        marginTop="1rem"
                        sx={{flexGrow: 1}}
                    >
                        Datas disponíveis:
                    </Typography>
                    <div
                        style={{backgroundColor: "rgb(243, 243, 243)", height: "19rem"}}
                    ></div>
                </div>

                {/*     <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DateCalendar />
                 </LocalizationProvider> */}

                <div>
                    <Typography
                        text-align="center"
                        justify-content="center"
                        margin="2rem"
                        variant="h4"
                        component="div"
                        sx={{flexGrow: 1}}
                    >
                        Onde você vai estar?
                    </Typography>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img
                            style={{width: "95%"}}
                            src="\src\core\assets\mapa.png"
                            alt=""
                        />
                    </div>
                </div>

                <div>
                    <Typography
                        text-align="center"
                        justify-content="center"
                        margin="2rem"
                        variant="h4"
                        component="div"
                        sx={{flexGrow: 1}}
                    >
                        O que você precisa saber:
                    </Typography>
                    <div
                        style={{
                            backgroundColor: colorRed,
                            width: "100%",
                            height: "0.15rem",
                            marginTop: "-2rem",
                            marginBottom: "1rem",
                        }}
                    ></div>
                </div>
                <PrivacyPolicy/>
            </ThemeProvider>
        </>
    );
}
