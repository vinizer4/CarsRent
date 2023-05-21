import { Container, Link, Box, AppBar, Toolbar, IconButton } from "@mui/material";

// @ts-ignore
import facebookImg from "../../assets/images/facebook.png";
// @ts-ignore
import linkedinImg from "../../assets/images/linkedin.png";
// @ts-ignore
import twitterImg from "../../assets/images/twitter.png";
// @ts-ignore
import instagramImg from "../../assets/images/instagram.png";

function Footer() {
    return (
        <AppBar
            position="fixed"
            sx={{
                top: 'auto',
                bottom: 0,
                backgroundColor: 'grey.900', // or 'primary.dark'
                height: '3rem',
            }}
        >
            <Container style={{marginTop: "-0.5rem"}}>
                <Toolbar disableGutters>
                    <Box flexGrow={1}>
                        <Link
                            href="#"
                            color="inherit"
                            underline="none"
                            sx={{
                                color: 'common.white',
                                fontWeight: 'fontWeightBold',
                            }}
                        >
                            @2023 Digital House - Grupo 03
                        </Link>
                    </Box>
                    <Box>
                        <IconButton href="#" color="inherit">
                            <img src={facebookImg} width={24} height={24} alt="Facebook" />
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <img src={linkedinImg} width={24} height={24} alt="LinkedIn" />
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <img src={twitterImg} width={24} height={24} alt="Twitter" />
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <img src={instagramImg} width={24} height={24} alt="Instagram" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Footer;
