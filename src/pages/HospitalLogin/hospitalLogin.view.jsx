import { useState } from "react";
import { Container, Grid } from "@mui/material";
import JobRelatedInfo from "../../components/JobRelatedInfo";
import HospitalSignUpForm from "../../components/HospitalSignUpForm/HospitalSignUpForm.view";

const HospitalLogin = () => {

    return (
        <Container maxWidth="xl">
            <Grid
                container
                sx={{
                    gap: "1rem",
                    marginBottom: "3rem",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <HospitalSignUpForm pageType="HospitalLogIn" />
                <JobRelatedInfo />
            </Grid>
        </Container>
    );
};

export default HospitalLogin;