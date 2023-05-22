import { Box, IconButton, Link, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { colorRed, colorSoftBlack } from "../../utils/const/consts";
// @ts-ignore
import facebookImg from "../../assets/images/facebook.png";
// @ts-ignore
import linkedinImg from "../../assets/images/linkedin.png";
// @ts-ignore
import twitterImg from "../../assets/images/twitter.png";
// @ts-ignore
import instagramImg from "../../assets/images/instagram.png";

const StyledFooter = styled('footer')(({ theme }) => ({
    backgroundColor: colorSoftBlack,
    height: theme.breakpoints.down("sm") ? "10vh" : "10vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
}));

function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <StyledFooter>
            <Box>
                <Typography
                    variant="caption"
                    sx={{
                        color: "common.white",
                        fontWeight: "bold",
                        fontSize: isMobile ? "0.8rem" : "1rem",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    @2023 Digital House - Grupo 03
                </Typography>
            </Box>
            <Box>
                <IconButton href="#" color="inherit">
                    <img
                        src={facebookImg}
                        width={isMobile ? 10 : 24}
                        height={isMobile ? 15 : 24}
                        alt="Facebook"
                    />
                </IconButton>
                <IconButton href="#" color="inherit">
                    <img
                        src={linkedinImg}
                        width={isMobile ? 10 : 24}
                        height={isMobile ? 15 : 24}
                        alt="LinkedIn"
                    />
                </IconButton>
                <IconButton href="#" color="inherit">
                    <img
                        src={twitterImg}
                        width={isMobile ? 10 : 24}
                        height={isMobile ? 15 : 24}
                        alt="Twitter"
                    />
                </IconButton>
                <IconButton href="#" color="inherit">
                    <img
                        src={instagramImg}
                        width={isMobile ? 10 : 24}
                        height={isMobile ? 15 : 24}
                        alt="Instagram"
                    />
                </IconButton>
            </Box>
        </StyledFooter>
    );
}

export default Footer;
