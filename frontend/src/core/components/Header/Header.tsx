import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colorRed, colorSoftBlack } from "../../utils/const/consts";
import { AppBar, Button, Drawer, IconButton, List, ListItemButton, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { Link } from "react-router-dom";

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
                        sx={{ width: '5rem', height: '10%', marginRight: '1rem', marginLeft: '1rem' }}
                        onClick={() => navigate('/home')}
                    >
                        <img style={{width: "6rem"}} alt="Logo" src="../../src/core/assets/images/logo.png" />
                    </IconButton>
                    {!isMobile && (
                        <Typography
                            variant="h5"
                            sx={{
                                flexGrow: 1,
                                fontSize: '2rem',
                                transition: 'font-size 0.3s',
                                marginRight: "2rem"
                            }}
                            onClick={() => navigate('/home')}
                        >
                            Alugue um carro e viaje <span style={{color: colorRed}}>sem parar</span>
                        </Typography>
                    )}
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
                                component={Link}
                                to="/login"
                                sx={{ backgroundColor: colorRed, border: `1px solid ${colorRed}`, marginRight: '1rem' }}
                            >
                                Iniciar Sessão
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
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
                sx={{ width: { xs: '80vw', sm: '50vw', md: '30vw', lg: '20vw' } }}
            >
                <List sx={{ width: 250 }}>
                    <ListItemButton component={Link} to="/home">
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Menu
                        </Typography>
                    </ListItemButton>
                    <ListItemButton component={Link} to="/login">
                        Iniciar Sessão
                    </ListItemButton>
                    <ListItemButton component={Link} to="/register">
                        Criar Conta
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
}

export default Header;
