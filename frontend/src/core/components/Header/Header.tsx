import { ThemeProvider, createTheme }                                                             from '@mui/material/styles';
import {colorRed, colorSoftBlack}                                                                 from "../../utils/const/consts";
import { AppBar, Button, Drawer, IconButton, List, ListItem, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#000000',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: colorRed,
//     },
//     background: {
//       default: '#fff',
//     },
//   },
// });

function Header() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
      <>
        <AppBar style={{width: "100vw", backgroundColor: colorSoftBlack}}>
          <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ width: '5rem', height: '2rem', marginRight: '2rem', marginLeft: "3rem" }}
                onClick={() => navigate('/home')}
            >
              <img style={{width: "6rem"}} alt="Logo" src="../../src/core/assets/images/logo.png" />
            </IconButton>
            <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  flexGrow: 1,
                  fontSize: isMobile ? '1rem' : '2rem',
                  transition: 'font-size 0.3s',
                  marginRight: "2rem"
                }}
                onClick={() => navigate('/home')}
            >
              Alugue um carro e viaje <span style={{color: colorRed}}>sem parar</span>
            </Typography>
            {isMobile ? (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
            ) : (
                <>
                  <Button
                      color="inherit"
                      href="login"
                      sx={{ backgroundColor: colorRed, border: `1px solid ${colorRed}`, marginRight: '1rem' }}
                  >
                    Iniciar Sessão
                  </Button>
                  <Button color="inherit" href="register">
                    Criar Conta
                  </Button>
                </>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{ display: { sm: 'block', xs: 'none' } }}
        >
          <List sx={{ width: 250 }}>
            <ListItem button onClick={() => navigate('/home')}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Alugue um carro e viaje sem parar
              </Typography>
            </ListItem>
            <ListItem button color="inherit" href="login">
              Iniciar Sessão
            </ListItem>
            <ListItem button color="inherit" href="register">
              Criar Conta
            </ListItem>
          </List>
        </Drawer>
  </>
  );
}

export default Header;
