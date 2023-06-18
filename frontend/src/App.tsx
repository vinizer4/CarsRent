import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline                  from '@mui/material/CssBaseline';
import Footer                       from "./core/components/Footer/Footer";
import Header                       from "./core/components/Header/Header";
import {Route, Routes}              from "react-router-dom";
import Login                        from "./pages/user/login/Login";
import Register                     from "./pages/user/register/UserRegister";
import Home                         from "./pages/home/Home";
import React                        from "react";
import {Box}                        from '@mui/system';
import Details                      from './pages/details/Details';
import Reserva                      from './pages/reserva/Reserva';
import {AuthProvider}               from "./core/context/authContext";


const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <CssBaseline/>
                <Box
                    display="flex"
                    flexDirection="column"
                    minHeight="90vh"
                    width="100vw"
                    sx={{
                        '& > :nth-of-type(2)': { // targeting the Routes wrapper
                            flexGrow: 1, // This makes sure the route content takes all available
                                         // space, pushing the footer down
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
                    <div style={{marginTop: '3rem'}}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path={'login'} element={<Login/>}/>
                            <Route path={'register'} element={<Register/>}/>
                            <Route path={'home'} element={<Home/>}/>
                            <Route path="/detail/:id" element={<Details/>}/>
                            <Route path={'/reserva/:id'} element={<Reserva/>}/>
                        </Routes>
                    </div>
                </Box>
                <Footer/>
                </AuthProvider>
        </ThemeProvider>
);
}

export default App;
