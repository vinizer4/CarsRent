import { Box, IconButton, Link, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { colorRed, colorSoftBlack } from "../../utils/const/consts";
/* // @ts-ignore
import facebookImg from "../../assets/images/facebook.png";
// @ts-ignore
import linkedinImg from "../../assets/images/linkedin.png";
// @ts-ignore
import twitterImg from "../../assets/images/twitter.png";
// @ts-ignore
import instagramImg from "../../assets/images/instagram.png"; */
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const StyledFooter = styled('footer')(({ theme }) => ({
    backgroundColor: colorSoftBlack,
    height: theme.breakpoints.down("sm") ? "10vh" : "10vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    width: "100%",
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
                    @2023   - <span style={{marginLeft: '0.5rem'}}>A<span style={{color: "#EF4649"}}>DH</span>ERENCE</span>
                </Typography>
            </Box>
            <Box>
            <FacebookIcon width={isMobile ? 10 : 24} height={isMobile ? 15 : 24} fontSize="large" style={{color: 'white'}} ></FacebookIcon>
            <LinkedInIcon width={isMobile ? 10 : 24} height={isMobile ? 15 : 24} fontSize="large" style={{color: 'white'}}></LinkedInIcon>
            <TwitterIcon width={isMobile ? 10 : 24} height={isMobile ? 15 : 24} fontSize="large" style={{color: 'white'}}></TwitterIcon>
            <InstagramIcon width={isMobile ? 10 : 24} height={isMobile ? 15 : 24} fontSize="large" style={{color: 'white'}}></InstagramIcon>
                {/* <IconButton href="#" color="inherit">
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
                </IconButton> */}
            </Box>
        </StyledFooter>
    );
}

export default Footer;
