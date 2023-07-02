import React, { useState } from 'react';
import {
    AppBar,
    Avatar,
    Button,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    Popover,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../../core/context/authContext'; // Caminho para o useAuth hook
import { colorRed, colorSoftBlack } from '../../utils/const/consts';
import styles from './Header.module.css'

function Header() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');
    const { user, logout } = useAuth();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAvatarClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/')
        handlePopoverClose();
    };

    const getUserInitials = (firstName: string, lastName: string) => {
        return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    };

    return (
        <>
            <AppBar style={{ width: '100%', backgroundColor: colorSoftBlack }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ width: '5rem', height: '10%', marginRight: '1rem', marginLeft: '1rem' }}
                        onClick={() => navigate('/home')}
                    >
                        <img style={{ width: '9rem' }} alt="Logo" src="https://dh-grupo03.s3.sa-east-1.amazonaws.com/logo/Adherence+-+Logo.png" />
                    </IconButton>
                    {!isMobile && (
                        <Typography
                            variant="h5"
                            sx={{
                                flexGrow: 1,
                                fontSize: '1.2rem',
                                transition: 'font-size 0.3s',
                                marginRight: '2rem',
                                marginLeft: '2rem',
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate('/home')}
                        >
                            Alugue um carro e viaje <span style={{ color: colorRed }}>sem parar.</span>
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
                            {user ? (
                                <Avatar
                                    style={{ backgroundColor: colorRed, marginRight: '1rem' }}
                                    onClick={handleAvatarClick}
                                >
                                    {getUserInitials(user.firstName, user.lastName)}
                                </Avatar>
                            ) : (
                                <>
                                    <Button
                                        className={styles.button}
                                        color="inherit"
                                        component={Link}
                                        to="/login"
                                        sx={{
                                            backgroundColor: colorRed,
                                            border: `1px solid ${colorRed}`,
                                            marginRight: '1rem',
                                            width: { xs: '20vw', sm: '10vw', md: '20vw', lg: '20vw' },
                                        }}
                                    >
                                        Iniciar Sessão
                                    </Button>
                                    <Button
                                        className={styles.button2}
                                        color="inherit"
                                        component={Link}
                                        to="/register"
                                        sx={{ width: { xs: '20vw', sm: '10vw', md: '20vw', lg: '20vw' } }}
                                    >
                                        Criar Conta
                                    </Button>
                                </>
                            )}
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
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List>
                    <ListItemButton onClick={handleLogout}>Logout</ListItemButton>
                </List>
            </Popover>
        </>
    );
}

export default Header;
