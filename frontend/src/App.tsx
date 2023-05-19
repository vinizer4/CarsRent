import Header           from "./core/components/Header/Header"
import Footer           from "./core/components/Footer/Footer"
import RoutesConfig     from "./routes/routesConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {ChakraProvider} from '@chakra-ui/react'

function App() {

    return (
        <div>
            <ChakraProvider>
                <Header/>
                <div style={{
                    marginBottom: '5rem',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    marginTop: '-2rem'
                }}>
                    <RoutesConfig/>
                </div>
                <Footer/>
            </ChakraProvider>
        </div>
    )
}

export default App;
