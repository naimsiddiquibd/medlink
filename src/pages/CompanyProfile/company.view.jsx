import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import scletonImg from "../../assets/square_img.png";
import EditIcon from "@mui/icons-material/Edit";
// Swiper react slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";

const sliderImages = [
  { id: 0, img: scletonImg },
  { id: 1, img: scletonImg },
  { id: 2, img: scletonImg },
  { id: 3, img: scletonImg },
  { id: 4, img: scletonImg },
  { id: 5, img: scletonImg },
  { id: 6, img: scletonImg },
  { id: 7, img: scletonImg },
  { id: 8, img: scletonImg },
  { id: 9, img: scletonImg },
  { id: 10, img: scletonImg },
  { id: 11, img: scletonImg },
  { id: 12, img: scletonImg },
  { id: 13, img: scletonImg },
];

const accountDetails = {
  username: "shrinidhi@mimothi.com",
  email: "shrinidhi@mimothi.com",
  role: "Recruiter",
  reportManager: "Shrinidhi",
  number: "+91-9844639898 ",
  companyName: "Mimothi Solutions",
};

const companyDetails = {
  companyType: "shrinidhi@mimothi.com",
  indrustyType: "shrinidhi@mimothi.com",
  contactPerson: "Recruiter",
  alias: "Shrinidhi",
  designation: "Manager",
  websiteURL: "https://websitename.com",
  vacancies: "",
  classFields: "",
  alias2: "",
  number1: "+91-9844639898",
  number2: "+91-9844639898 ",
  faxNumber: "",
  tanNumber: "",
};

const kycDetails = {
  kyc: "approved",
  panNumber: "AANCM8069M",
  namePanCard: "Company solutions pvt. ltd.",
  datePanCard: "12/12/2019",
  addressLevel: "2A, Jupiter, Basaveshwar Nagar, Gokul Road, Bengaluru",
  country: "INDIA",
  state: "KARNATAKA",
  city: "Bangalore",
  pinCode: "560017",
  gstIn: "29AANCM8069M1ZF",
};

const CompanyProfile = () => {
  const { username, email, role, reportManager, number, companyName } =
    accountDetails;
  const {
    companyType,
    indrustyType,
    contactPerson,
    alias,
    designation,
    websiteURL,
    vacancies,
    classFields,
    alias2,
    number1,
    number2,
    faxNumber,
    tanNumber,
  } = companyDetails;
  const {
    kyc,
    panNumber,
    namePanCard,
    datePanCard,
    addressLevel,
    country,
    state,
    city,
    pinCode,
    gstIn,
  } = kycDetails;
  return (
    <Container maxWidth="md" sx={{ mx: "auto", p: 3 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ marginTop: "1%" }}
      >
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/profile">
          Profile
        </Link>
        <Link underline="hover" color="inherit" href="/profile/company-profile">
          Company Profile
        </Link>
        {/* <Typography color="text.primary">Company Profile</Typography> */}
      </Breadcrumbs>
      <Box sx={{ mt: 2, mb: 6 }}>
        <Typography
          variant="h5"
          sx={{ mb: "0.825rem", fontWeight: "600", color: "#333333" }}
          gutterBottom
          component="div"
        >
          {companyName}
        </Typography>
        <Box>
          <Card
            sx={{
              bgcolor: "#F2F2F2",
              borderRadius: "0.5rem",
              my: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "flexEnd",
                p: 4.5,
                gap: 2,
              }}
            >
              <Box sx={{ position: "relative", margin: "auto" }}>
                <img
                  style={{ marginRight: "38px" }}
                  height="108px"
                  width="108px"
                  src={scletonImg}
                  alt="image_template"
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -20,
                    right: 10,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#FFFFFF",
                    padding: "3px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <CameraEnhanceIcon sx={{ color: "#828282" }} />
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "#333333", fontWeight: "600" }}
                >
                  About
                </Typography>
                <Typography variant="body2" sx={{ color: "#333333" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Auctor in commodo urna cursus dui. Duis aenean nunc elementum
                  pretium sit ut magna. Quam adipiscing viverra vivamus dapibus
                  ultrices tempor tristique. Faucibus consectetur
                  venenatis.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2.5,
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#333333", fontWeight: "600" }}
              >
                Gallery
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: "#FFFFFF",
                  borderRadius: 1,
                  border: "2px solid #4F4F4F",
                }}
              >
                Upload
              </Button>
            </Box>
            <Box sx={{ px: 2.5, pt: 2 }}>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={"auto"}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {sliderImages.map((slide) => (
                  <SwiperSlide
                    style={{
                      backgroundColor: "#BDBDBD",
                      height: "150px",
                      width: "150px",
                    }}
                    key={slide?.id}
                  >
                    <img
                      style={{ padding: "50px" }}
                      src={slide.img}
                      alt="slide"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box sx={{ px: 2.5, py: 2 }}>
              <Grid container alignItems="center" specing={2}>
                <Grid item xs={3}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#333333", fontWeight: "600" }}
                  >
                    Company Video
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <a href="#">
                    <Typography variant="body2" sx={{ color: "#333333" }}>
                      https://www.youtube.com/watch?v=P7mz7PtuQZs
                    </Typography>
                  </a>
                </Grid>
                <Grid item xs={1}>
                  <EditIcon fontSize="small" sx={{ color: "#828282" }} />
                </Grid>
              </Grid>
            </Box>
          </Card>
          <Card
            sx={{
              bgcolor: "#F2F2F2",
              borderRadius: "0.5rem",
              pt: 1,
              px: 3,
              pb: 3,
              my: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#333333", fontWeight: "bold" }}
              gutterBottom
              component="div"
            >
              Account Details
            </Typography>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Username:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {username}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Email for Communication:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Role:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {role}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Reporting Manager:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {reportManager}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Mobile Number:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {number}
              </Typography>
            </Box>
          </Card>
          <Card
            sx={{
              bgcolor: "#F2F2F2",
              borderRadius: "0.5rem",
              pt: 2,
              px: 3,
              pb: 3,
              my: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#333333", fontWeight: "bold" }}
              gutterBottom
              component="div"
            >
              Company Details
            </Typography>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Company Type:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {companyType}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Industry Type:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {indrustyType}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Contact Person:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {contactPerson}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Alias:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {alias}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Designation:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {designation}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Website URL:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {websiteURL}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Profile for HOT vacancies:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {vacancies}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Profile for Classfields
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {classFields}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Alias:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {alias2}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Number 1:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {number1}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Number 2:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {number2}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Fax Number:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {faxNumber}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                TAN Number:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {tanNumber}
              </Typography>
            </Box>
          </Card>
          <Card
            sx={{
              bgcolor: "#F2F2F2",
              borderRadius: "0.5rem",
              pt: 2,
              px: 3,
              pb: 3,
              my: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#333333", fontWeight: "bold" }}
              gutterBottom
              component="div"
            >
              KYC Compliance Details
            </Typography>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                KYC Status:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {kyc}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                PAN Number:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {panNumber}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Name On PAN Card:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {namePanCard}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Date On PAN Card:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {datePanCard}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Address Label:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {addressLevel}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                Country:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {country}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                State:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {state}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                City:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {city}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                PIN Code:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {pinCode}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#4F4F4F" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ width: "25vh", textAlign: "right" }}
              >
                GSTIN:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ width: "70vh", textAlign: "left" }}
              >
                {gstIn}
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default CompanyProfile;
