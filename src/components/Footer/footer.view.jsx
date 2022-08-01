import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import googlePlayIcon from "../../assets/google-play.svg";
import appStoreIcon from "../../assets/appstore.svg";
import { Link } from "react-router-dom";
import footerColumns from "./footerData";
import footer_logo from "../../assets/images/footer_logo.png"


const Footer = () => {
  const mobileView = useMediaQuery("(max-width: 900px)");
  return (
    <Box
      sx={{
        backgroundColor: "var(--clr-blue-footer)",
        color: "var(--clr-white)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: `${mobileView ? "column" : "row"}`,
            paddingBlock: "2rem",
            gap: "2rem",
            width: "90%",
            margin: "auto",
            borderBottom: "1px solid #ffffff1a",
          }}
        >
          {/* <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 700, fontSize: "48px", margin: "0.5rem" }}
          >
            LOGO
          </Typography> */}
          <img style={{ width: "12rem", height: "auto" }} src={footer_logo} alt="header_logo" />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ gap: "1rem" }}
          >
            <Grid
              item
              sx={{
                backgroundColor: "var(--clr-gray-6)",
                padding: "3px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
              }}
            >
              <CallOutlinedIcon sx={{ color: "var(--clr-blue-footer)" }} />
            </Grid>
            <Grid item>
              <Typography
                variant="p"
                sx={{ display: "block", lineHeight: "30px" }}
              >
                Toll No: +91-40-66116611
              </Typography>
              <Typography
                variant="p"
                sx={{ display: "block", lineHeight: "30px" }}
              >
                Toll Free No: 1-800-4196666
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ gap: "1rem" }}
          >
            <Grid
              item
              sx={{
                backgroundColor: "var(--clr-gray-6)",
                padding: "3px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
              }}
            >
              <EmailOutlinedIcon sx={{ color: "var(--clr-blue-footer)" }} />
            </Grid>
            <Grid item>
              <Typography
                variant="p"
                sx={{ display: "block", lineHeight: "30px" }}
              >
                info@medlinks.in
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="column"
            sx={{ gap: "0.5rem" }}
          >
            <a href="https://google.com" target="_blank" rel="noreferrer">
              <img src={googlePlayIcon} alt="google play store link" />
            </a>
            <a href="https://google.com" target="_blank" rel="noreferrer">
              <img src={appStoreIcon} alt="apple app store link" />
            </a>
          </Grid>
        </Box>
        {!mobileView && (
          <Grid
            container
            justifyContent="space-between"
            sx={{ paddingBlock: "2rem" }}
          >
            {footerColumns.map((column) => (
              <Box key={column.title}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontSize: "20px", marginBottom: "1rem" }}
                >
                  {column.title}
                </Typography>
                {column.links.map((link) => (
                  <Typography
                    key={link.name}
                    variant="p"
                    component="div"
                    sx={{ fontSize: "14px", lineHeight: "36px" }}
                  >
                    <Link to={link.path}>{link.name}</Link>
                  </Typography>
                ))}
              </Box>
            ))}
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontSize: "20px", marginBottom: "1rem" }}
              >
                Follow Us
              </Typography>
              <Grid container sx={{ gap: "1rem" }}>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookRoundedIcon />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                  <TwitterIcon />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon />
                </a>
              </Grid>
            </Box>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
