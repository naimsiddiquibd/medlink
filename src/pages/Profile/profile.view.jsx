import React from "react";
import { Box, Container } from "@mui/material";
import { ProfileSnap, UserTabs } from "../../components";
import bgImg from "../../assets/welcome-bg.jpg";

const Profile = (props) => {
  return (
    <Box className="profile" style={{ minHeight: "100vh" }}>
      <Box
        sx={{ background: `url(${bgImg})`, height: "240px", width: "100%" }}
      ></Box>
      <Container maxWidth="md" sx={{ mx: "auto", marginTop: "-120px" }}>
        <ProfileSnap profileData={props.profileData} />
        <UserTabs tabsData={props.tabsData} />
      </Container>
       
    </Box>
  );
};

export default Profile;
