import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "./core/components/Footer/Footer";
import Header from "./core/components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/register/UserRegister";
import Home from "./pages/home/Home";
import React from "react";
import { Box } from '@mui/system';

// create your theme
const theme = createTheme({
    palette: {
        mode: 'light', // or 'dark' for dark mode
        // other theme properties...
    },

    // other theme configurations...
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
                width="100vw"
                sx={{
                    '& > :nth-of-type(2)': { // targeting the Routes wrapper
                        flexGrow: 1, // This makes sure the route content takes all available space, pushing the footer down
                        px: {
                            xs: '1rem', // Padding of 1rem on extra small screens
                            sm: '1.5rem', // 1.5rem on small screens
                            md: '3rem', // 3rem on medium screens
                        },
                        py: {
                            xs: '3rem', // Padding of 3rem on extra small screens
                            sm: '4.5rem', // 4.5rem on small screens
                            md: '5rem', // 5rem on medium screens
                        }
                    }
                }}
            >
                <Header/>
                <div style={{marginTop: "3%"}}>
                    <Routes>
                        <Route path={'login'} element={<Login/>} />
                        <Route path={'register'} element={<Register/>} />
                        <Route path={'home'} element={<Home/>}/>
                    </Routes>
                </div>


            </Box>
            <Footer/>
        </ThemeProvider>
    );
}

export default App;
