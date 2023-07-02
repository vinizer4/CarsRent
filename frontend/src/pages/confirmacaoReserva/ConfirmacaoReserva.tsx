import React from "react";
import styles from "./confimacaoReserva.module.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { colorRed } from "../../core/utils/const/consts";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function confirmacaoReserva() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "50px",
                  borderRadius: "20px",
                  textAlign: "center",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  maxWidth: "40%",
                  width: "100%",
                  marginBottom: "5rem",
                }}
              >
                <VerifiedIcon
                  style={{ fontSize: "3.5rem", color: "green" }}
                ></VerifiedIcon>
                <h4 style={{ marginTop: "1rem" }}>
                  Reserva realizada com sucesso!
                </h4>
                <Grid item xs={12} md={12} lg={12}>
                <Link style={{ color: "white" }} to="/">
                  <button
                 style={{ 
                  width: "40%", 
                  marginTop: '1rem', 
                  padding: '0.5rem', 
                  border: 'none', 
                  backgroundColor: colorRed,
                  borderRadius: '10px',
                  color: 'white'
                  }}> Voltar </button>
                </Link>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
