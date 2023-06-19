import React, {useEffect, useState}                                         from "react";
import {Card, CardContent, CardMedia, Container, ThemeProvider, Typography} from "@mui/material";
import {Link, useParams}                                                    from "react-router-dom";
import {
  createTheme
}                                                                           from "@mui/material/styles";
import AppBar
                                                                            from "@mui/material/AppBar";
import Box
                                                                            from "@mui/material/Box";
import Toolbar
                                                                            from "@mui/material/Toolbar";
import {
  colorRed
}                                                                           from "../../core/utils/const/consts";
import ArrowBackIosOutlinedIcon
                                                                            from "@mui/icons-material/ArrowBackIosOutlined";
import PlaceIcon
                                                                            from "@mui/icons-material/Place";
import {
  CidadeService
}                                                                           from "../../core/service/cidade/CidadeService";
import {
  ProductService
}                                                                           from "../../core/service/product/ProductService";
import {
  ImageService
}                                                                           from "../../core/service/image/ImageService";
import DateRangePicker
                                                                            from "../../core/components/DateRangePicker/DateRangePicker";

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

/* const containerStyle = {
 margin: '16px',
 padding: '16px',
 border: '1px solid #ccc',
 borderRadius: '4px',
 }; */

export default function Reserva() {
  const [nomeInput, setNomeInput] = useState("");
  const [sobrenomeInput, setSobrenomeInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cidadeInput, setCidadeInput] = useState("");

  const [product, setProduct] = useState([]);
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [cidade, setCidade] = useState([]);
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const { id } = useParams();

  async function getProductById(id: any) {
    try {
      const res = await ProductService.GetProductById(id);
      setProduct(res?.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getCidadeById(id: any) {
    try {
      const res = await CidadeService.GetCidadeById(id);
      setCidade(res?.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getImageById(id: any) {
    try {
      const res = await ImageService.GetImageById(id);
      setImage(res?.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getImagesById(id: any) {
    try {
      const res = await ImageService.GetImageById(id);
      setImages(res?.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCidadeById(id);
    getProductById(id);
    getImageById(id);
    getImagesById(id);
  }, []);

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // Lógica para processar os dados do formulário
    console.log(
        "Dados do formulário:",
        nomeInput,
        sobrenomeInput,
        emailInput,
        cidadeInput
    );
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
        <div
            sx={{ maxWidth: 600, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
        ></div>
        <div style={{ display: "flex", height: "100%" }}>
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
            <div style={{ display: "flex", margin: "" }}>
              <Typography style={{ fontSize: "20px", color: colorRed }}>
                Complete seus dados
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
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", gap: "3rem" }}>
                    <label style={{ display: "grid" }}>
                      Nome
                      <input
                          style={{
                            backgroundColor: "rgb(243, 243, 243)",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px",
                          }}
                          type="text"
                          value={nomeInput}
                          onChange={(event) => setNomeInput(event.target.value)}
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
                          }}
                          type="text"
                          value={sobrenomeInput}
                          onChange={(event) =>
                              setSobrenomeInput(event.target.value)
                          }
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
                          }}
                          type="email"
                          value={emailInput}
                          onChange={(event) => setEmailInput(event.target.value)}
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
                          }}
                          type="text"
                          value={cidadeInput}
                          onChange={(event) => setCidadeInput(event.target.value)}
                      />
                    </label>
                  </div>
                  <button
                      style={{
                        padding: "5px",
                        backgroundColor: colorRed,
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        marginTop: "1rem",
                        float: "right",
                      }}
                      type="submit"
                  >
                    Salvar
                  </button>
                </form>
              </div>
            </Container>
            <Typography style={{ fontSize: "20px", color: colorRed }}>
              Selecione sua data de reserva
            </Typography>
            <Container
                style={{
                  margin: "16px",
                  padding: "16px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
            >
              <DateRangePicker />
            </Container>
            <Typography style={{ fontSize: "20px", color: colorRed }}>
              Seu horário de chegada
            </Typography>
            <Container
                style={{
                  margin: "16px",
                  padding: "16px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
            >
              <div>Container 3</div>
            </Container>
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
                sx={{ maxWidth: 400, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
              <Typography
                  variant="h5"
                  color="text.secondary"
                  style={{ padding: "10px" }}
              >
                Detalhe da Reserva
              </Typography>
              <CardMedia component="img" image={image?.url} alt="" />
              <CardContent>
                <Typography variant="body3" color="text.primary">
                  {product?.nome}
                </Typography>
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
                <div style={{ display: "flex" }}>
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
                      style={{ marginTop: "2rem", fontSize: "15px" }}
                      color="text.primary"
                  >
                    Data |
                  </Typography>
                </div>
                <div
                    style={{
                      backgroundColor: "gray",
                      height: "1px",
                      marginTop: "2rem",
                    }}
                ></div>
                <div style={{ display: "flex" }}>
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
                      style={{ marginTop: "2rem", fontSize: "15px" }}
                      color="text.primary"
                  >
                    Data |
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Link to={"confirmacaoReserva"}>
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
                        type="submit"
                    >
                      {" "}
                      Confirmar Reserva
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ThemeProvider>
  );
}
