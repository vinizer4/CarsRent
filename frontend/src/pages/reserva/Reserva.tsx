import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Container,
    Paper,
    ThemeProvider,
    Typography
}                                               from "@mui/material";
import {Link, useLocation, useParams} from "react-router-dom";
import {
    createTheme
} from "@mui/material/styles";
import AppBar
    from "@mui/material/AppBar";
import Box
    from "@mui/material/Box";
import Toolbar
    from "@mui/material/Toolbar";
import {
    colorRed
} from "../../core/utils/const/consts";
import ArrowBackIosOutlinedIcon
    from "@mui/icons-material/ArrowBackIosOutlined";
import PlaceIcon
    from "@mui/icons-material/Place";
import {
    CidadeService
}                         from "../../core/service/cidade/CidadeService";
import {
    ProductService
}                                               from "../../core/service/product/ProductService";
import {
    ImageService
}                                               from "../../core/service/image/ImageService";
import DateRangePicker
                                                from "../../core/components/DateRangePicker/DateRangePicker";
import {ProductInterface}                       from "../../core/interface/ProductInterface";
import {ImageInterface}                         from "../../core/interface/ImageInterface";
import {CidadeInterface}                        from "../../core/interface/CidadeInterface";
import {useForm}                                from "react-hook-form";
import {AdapterDateFns}                         from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";
import {
    fixDateTimeToString,
    formatDateSQL,
    formatDateSQLyyyyMMdd
}                                               from "../../core/utils/utils/utils";
import {useAuth}                                from "../../core/context/authContext";
import {ReservationInterface}                   from "../../core/interface/ReservationInterface";
import {
    ReservationService
}                                               from "../../core/service/reservation/ReservationService";
import {isSucess}                               from "../../core/utils/rest/restUtils";
import {Toasts}                                 from "../../core/utils/toast/toasts";
import {useNavigate}                            from "react-router";

const theme = createTheme();

const imageStyle = {
    height: 200,
    width: "100%",
    objectFit: "cover",
};
const cardStyle = {
    width: "40%",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 300,
};

export default function Reserva() {
    const location = useLocation();
    const { user } = useAuth();
    const {
        cidade,
        product,
        image,
        selectedCheckInDate,
        selectedCheckOutDate,
        disabledDates
    } = location.state || {};
    const {register, handleSubmit, setValue, getValues} = useForm();
    const [nomeInput, setNomeInput] = useState("");
    const [sobrenomeInput, setSobrenomeInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [cidadeInput, setCidadeInput] = useState("");
    const [dataInit, setDataInit] = useState(selectedCheckInDate)
    const [dataEnd, setDataEnd] = useState(selectedCheckOutDate)

    //const [productState, setProductState] = useState<ProductInterface>();
    //const [image, setImage] = useState<ImageInterface>();
    const [images, setImages] = useState([]);
    //const [cidade, setCidade] = useState<CidadeInterface>(cidadeSelecionadaAux);
    const [nomeProduto, setNomeProduto] = useState("");
    const [descricao, setDescricao] = useState("");

    const [checkInDate, setCheckInDate] = useState<Date | null>(selectedCheckInDate);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(selectedCheckOutDate);

    const {id} = useParams();

    const navigate = useNavigate();



    useEffect(() => {
        console.log("cidade", cidade)
        console.log(product)
        console.log(image)
        console.log(selectedCheckInDate)
        console.log(selectedCheckOutDate)
        console.log(user)
    }, [])

    function onSubmit(data: any) {

    }

    async function submitReservation() {
        let data: ReservationInterface = {
            user: Number(user!.id),
            endDate: formatDateSQLyyyyMMdd(dataEnd),
            product: Number(product!.id),
            startDate: formatDateSQLyyyyMMdd(dataInit),
            startTime: '00:00:00'
        }

        try {
            const res = await ReservationService.Post(data)
            if (res && isSucess(res?.status)) {
                Toasts.showSucess({text: "Reserva realizada com sucesso!"})
                navigate('/home');
                console.log(data)
                console.log(res?.data)
            }
        } catch (e) {
            Toasts.showError({text: "Falha no cadastro da reserva!"})
        }

    }

    return (

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
            <div
                style={{maxWidth: 600, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"}}
            ></div>
            <div style={{display: "flex", height: "100%"}}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        padding: "16px",
                    }}
                >
                    <div style={{display: "flex", margin: ""}}>
                        <Typography style={{fontSize: "20px", color: colorRed}}>
                            Revise seus dados
                        </Typography>
                    </div>
                    <Container
                        style={{
                            margin: "16px",
                            padding: "16px",
                            borderRadius: "10px",
                            display: "flex",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div style={{ display: "flex", gap: "3rem" }}>
                                    <label style={{ display: "grid" }}>
                                        Nome
                                        <input
                                            style={{
                                                backgroundColor: "rgb(243, 243, 243)",
                                                border: "none",
                                                borderRadius: "5px",
                                                padding: "5px",
                                                width: "300px"
                                            }}
                                            type="text"
                                            value={user!.firstName}
                                            readOnly={true}
                                        />
                                    </label>
                                    <label style={{ display: "grid" }}>
                                        Sobrenome
                                        <input
                                            style={{
                                                backgroundColor: "rgb(243, 243, 243)",
                                                border: "none",
                                                borderRadius: "5px",
                                                padding: "5px",
                                                width: "300px"
                                            }}
                                            type="text"
                                            value={user!.lastName}
                                            readOnly={true}
                                        />
                                    </label>
                                </div>
                                <div style={{ display: "flex", gap: "3rem" }}>
                                    <label style={{ display: "grid" }}>
                                        E-mail
                                        <input
                                            style={{
                                                backgroundColor: "rgb(243, 243, 243)",
                                                border: "none",
                                                borderRadius: "5px",
                                                padding: "5px",
                                                width: "300px", // Ajuste o tamanho conforme necessário
                                            }}
                                            type="email"
                                            value={user!.email}
                                            readOnly={true}
                                        />
                                    </label>
                                    <label style={{ display: "grid" }}>
                                        Cidade
                                        <input
                                            style={{
                                                backgroundColor: "rgb(243, 243, 243)",
                                                border: "none",
                                                borderRadius: "5px",
                                                padding: "5px",
                                                width: "300px"
                                            }}
                                            type="text"
                                            value={cidade.nome}
                                            readOnly={true}
                                        />
                                    </label>
                                </div>

                            </form>
                        </div>
                    </Container>
                    <Typography style={{fontSize: "20px", color: colorRed}}>
                        Deseja alterar a data da reserva?
                    </Typography>
                    <div style={{ padding: "1rem", marginLeft: "1rem", marginTop: "-1rem", display: "flex" }}>
                        <div style={{ padding: "1rem", marginLeft: "1rem", marginTop: "-1rem", display: "flex" }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <div style={{ marginRight: "5rem", textAlign: "center" }}> {/* Estilo atualizado */}
                                <h3>Check-in</h3>
                                <Paper style={{ overflow: 'hidden' }}>
                                    <StaticDatePicker
                                        minDate={new Date()}
                                        displayStaticWrapperAs="desktop"
                                        orientation="landscape"
                                        value={dataInit}
                                        onChange={(newValue: any) => setDataInit(newValue)}
                                        shouldDisableDate={(date) =>
                                            disabledDates.some(
                                                (disabledDate: any) =>
                                                    disabledDate.getDate() === date.getDate() &&
                                                    disabledDate.getMonth() === date.getMonth() &&
                                                    disabledDate.getFullYear() === date.getFullYear()
                                            )
                                        }
                                    />
                                </Paper>
                            </div>

                            <div style={{ textAlign: "center" }}> {/* Estilo atualizado */}
                                <h3>Check-out</h3>
                                <Paper style={{ overflow: 'hidden' }}>
                                    <StaticDatePicker
                                        minDate={dataInit ? new Date(dataInit) : new Date()}
                                        displayStaticWrapperAs="desktop"
                                        orientation="landscape"
                                        value={dataEnd}
                                        onChange={(newValue: any) => setDataEnd(newValue)}
                                        shouldDisableDate={(date) =>
                                            disabledDates.some(
                                                (disabledDate: any) =>
                                                    disabledDate.getDate() === date.getDate() &&
                                                    disabledDate.getMonth() === date.getMonth() &&
                                                    disabledDate.getFullYear() === date.getFullYear()
                                            )
                                        }
                                    />
                                </Paper>
                            </div>

                        </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        float: "right",
                        alignItems: "center",
                        padding: "16px",
                    }}
                >
                    <Card
                        sx={{maxWidth: 400, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"}}
                    >
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            style={{padding: "10px"}}
                        >
                            Detalhe da Reserva
                        </Typography>
                        <CardMedia component="img" image={image?.url} alt=""/>
                        <CardContent>
                            <Typography variant="body3" color="text.primary">
                                {product?.nome}
                            </Typography>
                            <div style={{display: "flex"}}>
                                <PlaceIcon
                                    style={{fontSize: "medium", color: "gray"}}
                                ></PlaceIcon>
                                <Typography
                                    style={{fontSize: "14px", marginLeft: "0.5rem"}}
                                    color="text.secondary"
                                >
                                    {cidade.nome} - {cidade.pais}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    backgroundColor: "gray",
                                    height: "1px",
                                    marginTop: "2rem",
                                }}
                            ></div>
                            <div style={{display: "flex"}}>
                                <Typography
                                    style={{
                                        marginTop: "2rem",
                                        fontSize: "15px",
                                        marginRight: "5rem",
                                    }}
                                    color="text.primary"
                                >
                                    Check-in
                                </Typography>
                                <Typography
                                    style={{marginTop: "2rem", fontSize: "15px"}}
                                    color="text.primary"
                                >
                                    {formatDateSQL(dataInit)}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    backgroundColor: "gray",
                                    height: "1px",
                                    marginTop: "2rem",
                                }}
                            ></div>
                            <div style={{display: "flex"}}>
                                <Typography
                                    style={{
                                        marginTop: "2rem",
                                        fontSize: "15px",
                                        marginRight: "5rem",
                                    }}
                                    color="text.primary"
                                >
                                    Checkout
                                </Typography>
                                <Typography
                                    style={{marginTop: "2rem", fontSize: "15px"}}
                                    color="text.primary"
                                >
                                    {formatDateSQL(dataEnd)}
                                </Typography>
                                <div
                                    style={{
                                        backgroundColor: "gray",
                                        height: "1px",
                                        marginTop: "4rem",
                                    }}
                                ></div>
                            </div>
                            <div
                                style={{
                                    backgroundColor: "gray",
                                    height: "1px",
                                    marginTop: "1rem",
                                }}
                            ></div>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                    <button
                                        style={{
                                            backgroundColor: colorRed,
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            padding: "5px",
                                            width: "15vw",
                                            marginTop: "3rem",
                                        }}
                                        onClick={() => {submitReservation()}}
                                    >
                                        {" "}
                                        Confirmar Reserva
                                    </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ThemeProvider>
    );
}
