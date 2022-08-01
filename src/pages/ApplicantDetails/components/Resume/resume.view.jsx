import React from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import ResumeIcon from "../../../../assets/Vector.svg";

const resumeDetails = {
    title: "Resume name here.pdf",
    date: "12/01/2022",
};

const Resume = () => {
    return (
        <Container maxWidth="lg" sx={{ mx: "auto" }}>
            <Card sx={{ bgcolor: "#F2F2F2", px: 3, pt: 2, pb: 2 }}>
                <Typography
                    variant="h5"
                    sx={{ color: "#333333", fontWeight: "bold", pb: 1 }}
                    gutterBottom
                    component="div"
                >
                    Resume
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 3,
                        px: 1,
                    }}
                >
                    <Box>
                        <img src={ResumeIcon} alt="Resume_icon" />
                    </Box>
                    <Box sx={{ px: 2 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "#4F4F4F", fontWeight: "600" }}
                            component="div"
                        >
                            {resumeDetails.title}
                        </Typography>
                        <Typography
                            variant="caption"
                            display="block"
                            sx={{ color: "#828282", fontWeight: "400" }}
                        >
                            Uploaded on: {resumeDetails.date}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 3,
                                color: "#828282",
                                pt: 2,
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                component="div"
                                sx={{
                                    color: "#828282",
                                    fontWeight: "600",
                                    textDecoration: "underline",
                                }}
                            >
                                View Resume
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                component="div"
                                sx={{
                                    color: "#828282",
                                    fontWeight: "600",
                                    textDecoration: "underline",
                                }}
                            >
                                Download
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
};

export default Resume;
