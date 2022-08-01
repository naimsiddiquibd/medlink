import { Box, Container, Grid } from "@mui/material";
import React from "react";
import HospitalSignUpForm from "../../components/HospitalSignUpForm/HospitalSignUpForm.view";
import JobRelatedInfo from "../../components/JobRelatedInfo"; 

const HospitalSignUp = () => {

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
                <HospitalSignUpForm pageType="HospitalSignUp" />
                <JobRelatedInfo />
            </Grid>
        </Container>
    )
}

export default HospitalSignUp;