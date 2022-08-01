import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import profileImg from "../../assets/profile.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditIcon from "@mui/icons-material/Edit";
// import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
// import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
// import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
// import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";

const UserInfoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1.5rem",
}));

const profileData = {
  image: profileImg,
  name: "Manoj Kumar",
  specilization: "Cardiologist",
  location: "Bangalore",
  experience: 7,
  salary: "10 Lakhs and 50 Thousand",
  number: "+91 9009090909",
  email: "manoj@gmail.com",
  search: "Actively searching",
  strength: 90,
};

const AccountSettings = () => {
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const tabletView = useMediaQuery("(max-width:900px)");
  const mobileView = useMediaQuery("(max-width:600px)");

  const openEmailChange = () => {
    setEmailEdit(true);
    setPhoneEdit(false);
    setPasswordEdit(false);
  };
  const openPhoneChange = () => {
    setEmailEdit(false);
    setPhoneEdit(true);
    setPasswordEdit(false);
  };
  const openPasswordChange = () => {
    setEmailEdit(false);
    setPhoneEdit(false);
    setPasswordEdit(true);
  };

  return (
    <Box>
      <Box sx={{ bgcolor: "#BDBDBD", height: "240px", width: "100%" }}></Box>
      <Container
        maxWidth="md"
        sx={{
          marginTop: "-120px",
          mx: "auto",
          mb: 10,
        }}
      >
        <Card
          sx={{
            margin: "auto",
            borderRadius: "12px",
            mb: 5,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              gap: "1.5rem",
              flexDirection: `${mobileView ? "column" : "row"}`,
            }}
          >
            <Avatar
              sx={{
                width: "60px",
                height: "60px",
                margin: `${tabletView ? "1rem auto" : "0 1rem"}`,
              }}
              src={profileData.image}
            />
            <Grid container>
              <Grid item xs={12} md={10}>
                <Box sx={{ textAlign: `${mobileView ? "center" : "left"}` }}>
                  <Typography variant="h5" component="h2">
                    {profileData.name}
                  </Typography>
                  <Typography variant="p" component="p">
                    {profileData.specilization}
                  </Typography>
                </Box>
                <Grid container sx={{ marginTop: "1.5rem" }}>
                  <Grid item xs={12} md={6}>
                    <UserInfoBox>
                      <LocationOnIcon />
                      {profileData.location}
                    </UserInfoBox>
                    <UserInfoBox>
                      <WorkIcon />
                      {profileData.experience} years
                    </UserInfoBox>
                    <UserInfoBox>
                      <AccountBalanceWalletIcon />
                      {profileData.salary}
                    </UserInfoBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <UserInfoBox>
                      <EmailIcon />
                      {profileData.email}
                    </UserInfoBox>
                    <UserInfoBox>
                      <PhoneIphoneIcon />
                      {profileData.number}
                    </UserInfoBox>
                    <UserInfoBox>
                      <AssignmentIndIcon />
                      {profileData.search}
                    </UserInfoBox>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ position: "relative", margin: "auto" }}>
                  <CircularProgress
                    variant="determinate"
                    value={90}
                    thickness={5}
                    sx={{
                      width: "120px !important",
                      height: "120px !important",
                      transform: "rotate(0deg) !important",
                      color: "var(--clr-gray-3)",
                    }}
                  />
                  <Typography
                    component="span"
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      position: "absolute",
                      top: 60,
                      left: 60,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="strength-value"
                  >
                    {profileData.strength}%
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      fontSize: 13,
                      lineHeight: "16px",
                      fontWeight: 600,
                      color: "var(--clr-gray-3)",
                      marginTop: "0.5rem",
                    }}
                  >
                    Profile Strength
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: "#F2F2F2", px: 2.5, pt: 2, pb: 5 }}>
          <Typography variant="h5" sx={{ color: "#333333", fontWeight: "700" }}>
            Account Settings
          </Typography>
          <Box
            sx={{
              px: 0.4,
              py: 3,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#333333", fontWeight: "600" }}
                  >
                    Primary Email
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#828282",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    manoj@apollo.com
                  </Typography>
                </Box>
                <IconButton onClick={openEmailChange} sx={{ m: 0, p: 0 }}>
                  <EditIcon fontSize="small" sx={{ color: "#828282" }} />
                </IconButton>
              </Box>
              {emailEdit && (
                <Box sx={{ width: "400px" }}>
                  <Box>
                    <InputLabel
                      sx={{
                        color: "#6F7482",
                        fontSize: "12px",
                      }}
                      htmlFor="Change_Email"
                    >
                      Change Email
                    </InputLabel>
                    <TextField
                      placeholder="Enter your Email"
                      id="Change_Email"
                      type="email"
                      fullWidth
                      sx={{
                        color: "#6F7482",
                        bgcolor: "#FFFFFF",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 2,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setEmailEdit(false);
                      }}
                      sx={{
                        color: "#000000",
                        borderRadius: 2,
                        fontWeight: "bold",
                      }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      // onClick={handleEdit}
                      sx={{ bgColor: "#4F4F4F", borderRadius: 2 }}
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "#333333", fontWeight: "600" }}
                  >
                    Contact Number
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#828282",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    +91 98746 46371
                  </Typography>
                </Box>
                <IconButton onClick={openPhoneChange} sx={{ m: 0, p: 0 }}>
                  <EditIcon fontSize="small" sx={{ color: "#828282" }} />
                </IconButton>
              </Box>
              {phoneEdit && (
                <Box sx={{ width: "400px" }}>
                  <Box>
                    <InputLabel
                      sx={{
                        color: "#6F7482",
                        fontSize: "12px",
                      }}
                      htmlFor="Contact_number"
                    >
                      Contact Number
                    </InputLabel>
                    <TextField
                      placeholder="Enter phone number"
                      id="Contact_number"
                      type="tel"
                      fullWidth
                      sx={{
                        color: "#6F7482",
                        bgcolor: "#FFFFFF",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 2,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setPhoneEdit(false);
                      }}
                      sx={{
                        color: "#000000",
                        borderRadius: 2,
                        fontWeight: "bold",
                      }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      // onClick={handleEdit}
                      sx={{ bgColor: "#4F4F4F", borderRadius: 2 }}
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: "#333333", fontWeight: "600" }}
                >
                  Password
                </Typography>
                <Button
                  onClick={openPasswordChange}
                  variant="text"
                  size="small"
                  sx={{ color: "#828282", m: 0, p: 0 }}
                >
                  Change Password
                </Button>
              </Box>
              {passwordEdit && (
                <Box sx={{ width: "400px" }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                  >
                    <Box>
                      <InputLabel
                        sx={{
                          color: "#6F7482",
                          fontSize: "12px",
                        }}
                        htmlFor="Old_Password"
                      >
                        Old Password&nbsp;
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ fontSize: "16px" }}
                        >
                          *
                        </Typography>
                      </InputLabel>
                      <TextField
                        placeholder="Enter your Old Password"
                        id="Old_Password"
                        type="password"
                        fullWidth
                        sx={{
                          color: "#6F7482",
                          bgcolor: "#FFFFFF",
                        }}
                      />
                    </Box>
                    <Box>
                      <InputLabel
                        sx={{
                          color: "#6F7482",
                          fontSize: "12px",
                        }}
                        htmlFor="New_Password"
                      >
                        New Password&nbsp;
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ fontSize: "16px" }}
                        >
                          *
                        </Typography>
                      </InputLabel>
                      <TextField
                        placeholder="Enter your New Password"
                        id="New_Password"
                        type="password"
                        fullWidth
                        sx={{
                          color: "#6F7482",
                          bgcolor: "#FFFFFF",
                        }}
                      />
                    </Box>
                    <Box>
                      <InputLabel
                        sx={{
                          color: "#6F7482",
                          fontSize: "12px",
                        }}
                        htmlFor="Confirm_Password"
                      >
                        Confirm New Password&nbsp;
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ fontSize: "16px" }}
                        >
                          *
                        </Typography>
                      </InputLabel>
                      <TextField
                        placeholder="Confirm New Password"
                        id="Confirm_Password"
                        type="password"
                        fullWidth
                        sx={{
                          color: "#6F7482",
                          bgcolor: "#FFFFFF",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2.5,
                      mt: 2.5,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setPasswordEdit(false);
                      }}
                      sx={{
                        color: "#000000",
                        borderRadius: 2,
                        fontWeight: "bold",
                      }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      // onClick={handleEdit}
                      sx={{ bgColor: "#4F4F4F", borderRadius: 2 }}
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      </Container>
      <Container></Container>
    </Box>
  );
};

export default AccountSettings;
