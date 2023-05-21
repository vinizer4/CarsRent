import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline                    from '@mui/material/CssBaseline';
import Footer
                                      from "./core/components/Footer/Footer";
import Header
                                      from "./core/components/Header/Header";
import RoutesConfig                   from "./routes/routesConfig";

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
            <div>
                <Header/>
                <div style={{
                    marginBottom: '5rem',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    marginTop: '5rem'
                }}>
                    <RoutesConfig/>
                </div>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}

export default App;
