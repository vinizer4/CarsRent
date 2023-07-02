import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Paper,
  ThemeProvider,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { colorRed } from "../../core/utils/const/consts";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import { CidadeService } from "../../core/service/cidade/CidadeService";
import { ProductService } from "../../core/service/product/ProductService";
import { ImageService } from "../../core/service/image/ImageService";
import DateRangePicker from "../../core/components/DateRangePicker/DateRangePicker";
import { ProductInterface } from "../../core/interface/ProductInterface";
import { ImageInterface } from "../../core/interface/ImageInterface";
import { CidadeInterface } from "../../core/interface/CidadeInterface";
import { useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import {
  fixDateTimeToString,
  formatDateSQL,
  formatDateSQLyyyyMMdd,
} from "../../core/utils/utils/utils";
import { useAuth } from "../../core/context/authContext";
import { ReservationInterface } from "../../core/interface/ReservationInterface";
import { ReservationService } from "../../core/service/reservation/ReservationService";
import { isSucess } from "../../core/utils/rest/restUtils";
import { Toasts } from "../../core/utils/toast/toasts";
import { useNavigate } from "react-router";
import CompanyPolicy from "../../core/components/CompanyPolicy/CompanyPolicy";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const theme = createTheme();

export default function Reserva() {
  const location = useLocation();
  const { user } = useAuth();
  const {
    cidade,
    product,
    image,
    selectedCheckInDate,
    selectedCheckOutDate,
    disabledDates,
  } = location.state || {};
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [nomeInput, setNomeInput] = useState("");
  const [sobrenomeInput, setSobrenomeInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cidadeInput, setCidadeInput] = useState("");
  const [dataInit, setDataInit] = useState(selectedCheckInDate);
  const [dataEnd, setDataEnd] = useState(selectedCheckOutDate);

  //const [productState, setProductState] = useState<ProductInterface>();
  //const [image, setImage] = useState<ImageInterface>();
  const [images, setImages] = useState([]);
  //const [cidade, setCidade] = useState<CidadeInterface>(cidadeSelecionadaAux);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");

  const [checkInDate, setCheckInDate] = useState<Date | null>(
    selectedCheckInDate
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    selectedCheckOutDate
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const options: string[] = [];

  for (let hora = 0; hora <= 23; hora++) {
    const horaFormatada = hora.toString().padStart(2, "0");

    options.push(`${horaFormatada}:00`);
    options.push(`${horaFormatada}:30`);
  }

  useEffect(() => {
    console.log("cidade", cidade);
    console.log(product);
    console.log(image);
    console.log(selectedCheckInDate);
    console.log(selectedCheckOutDate);
    console.log(user);
  }, []);

  function onSubmit(data: any) {}

  async function submitReservation() {
    let data: ReservationInterface = {
      user: Number(user!.id),
      endDate: formatDateSQLyyyyMMdd(dataEnd),
      product: Number(product!.id),
      startDate: formatDateSQLyyyyMMdd(dataInit),
      startTime: "00:00:00",
    };

    try {
      const res = await ReservationService.Post(data);
      if (res && isSucess(res?.status)) {
        Toasts.showSucess({ text: "Reserva realizada com sucesso!" });
        navigate("/home");
        console.log(data);
        console.log(res?.data);
      }
    } catch (e) {
      Toasts.showError({ text: "Falha no cadastro da reserva!" });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{ backgroundColor: colorRed, padding: "1rem" }}
          position="static"
        >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {product?.nome}
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
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={8}>
            <h2
              style={{
                fontSize: "25px",
                color: colorRed,
                padding: "0.5rem",
                marginLeft: "1rem",
                marginTop: "0.5rem",
              }}
            >
              Revise seus dados
            </h2>
            <div>
              <div
                style={{
                  marginLeft: "1.5rem",
                  padding: "1rem",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <label style={{ display: "grid", color: colorRed }}>
                        Nome
                        <input
                          style={{
                            backgroundColor: "rgb(243, 243, 243)",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px",
                            width: "0 auto",
                          }}
                          type="text"
                          value={user!.firstName}
                          readOnly={true}
                        />
                      </label>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label style={{ display: "grid", color: colorRed}}>
                        Sobrenome
                        <input
                          style={{
                            backgroundColor: "rgb(243, 243, 243)",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px",
                            width: "0 auto",
                          }}
                          type="text"
                          value={user!.lastName}
                          readOnly={true}
                        />
                      </label>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label style={{ display: "grid", color: colorRed }}>
                        E-mail
                        <input
                          style={{
                            backgroundColor: "rgb(243, 243, 243)",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px",
                            width: "0 auto", 
                          }}
                          type="email"
                          value={user!.email}
                          readOnly={true}
                        />
                      </label>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <label style={{ display: "grid", color: colorRed }}>
                        Cidade
                        <input
                          style={{
                            backgroundColor: "rgb(243, 243, 243)",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px",
                            width: "0 auto",
                          }}
                          type="text"
                          value={cidade.nome}
                          readOnly={true}
                        />
                      </label>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </div>
            <Grid item xs={12} md={12} lg={8}>
              <h2
                style={{
                  fontSize: "25px",
                  color: colorRed,
                  padding: "1rem",
                  marginLeft: "1rem",
                  marginTop: '1rem'
                }}
              >
                Deseja alterar a data da reserva?
              </h2>
              <Grid
                style={{ marginLeft: "1rem", display: "flex" }}
                container
                spacing={1}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid style={{ width: "0 auto" }} item xs={12} md={6} lg={6}>
                    <h5 style={{ marginLeft: "2rem" }}>Check-in</h5>
                    <Paper style={{ overflow: "hidden" }}>
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
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <h5 style={{ marginLeft: "2rem" }}>Check-out</h5>
                    <Paper style={{ overflow: "hidden" }}>
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
                  </Grid>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12}>
                <h2
                  style={{
                    fontSize: "25px",
                    color: colorRed,
                    padding: "0.5rem",
                    marginLeft: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  Horário de retirada
                </h2>
                <div
                  style={{
                    marginLeft: "1rem",
                    padding: "1rem",
                    borderRadius: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <TaskAltIcon />
                    <h5 style={{ marginLeft: "0.5rem" }}>
                      Seu veículo estará pronto para retirada no horário
                      previsto informado.
                    </h5>
                  </div>
                  <div style={{ color: colorRed, marginBottom: '0.5rem', marginTop: '0.5rem'}}>
                    <span>Informe sua hora prevista de retirada.</span>
                  </div>
                  <select name= "horas" defaultValue="" style={{marginBottom: '0.5rem', width: '100%', padding: '0.5rem', borderRadius: '10px'}} name="horas">
                    <option value="" disabled hidden >
                      Selecione a hora da retirada
                    </option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <Card
              sx={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                marginTop: "3.5rem",
                marginRight: "2rem",
                marginLeft: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Typography
                variant="h4"
                color="text.secondary"
                style={{ padding: "20px" }}
              >
                Detalhe da Reserva
              </Typography>
              <CardMedia component="img" image={image?.url} alt="" />
              <CardContent>
                <h1 style={{ fontSize: "30px", color: colorRed}}>{product?.nome}</h1>
                <div style={{ display: "flex" }}>
                  <PlaceIcon
                    style={{ fontSize: "medium", color: "gray" }}
                  ></PlaceIcon>
                  <Typography
                    style={{ fontSize: "14px", marginLeft: "0.5rem" }}
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    style={{
                      marginTop: "2rem",
                      fontSize: "20px",
                    }}
                    color="text.primary"
                  >
                    Check-in
                  </Typography>
                  <Typography
                    style={{ marginTop: "2rem", fontSize: "20px" }}
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    style={{
                      marginTop: "2rem",
                      fontSize: "20px",
                    }}
                    color="text.primary"
                  >
                    Check-in
                  </Typography>
                  <Typography
                    style={{ marginTop: "2rem", fontSize: "20px" }}
                    color="text.primary"
                  >
                    {formatDateSQL(dataEnd)}
                  </Typography>
                </div>
                <div
                  style={{
                    backgroundColor: "gray",
                    height: "1px",
                    marginTop: "2rem",
                  }}
                ></div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    style={{
                      backgroundColor: colorRed,
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0.8rem",
                      marginTop: "3rem",
                      marginBottom: "2rem",
                      width: "50%"
                    }}
                    onClick={() => {
                      submitReservation();
                    }}
                  >
                    {" "}
                    Confirmar Reserva
                  </button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <CompanyPolicy />
    </ThemeProvider>
  );
}
