import { Box, Card, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import CircularProgress from "@mui/material/CircularProgress";

const Education = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [educationDetails, setEducationDetails] = useState([]);

    useEffect(() => {
        const QUERY_GETEDUCATIONLISTBYAPPLICANT = {
            query: `query MyQuery {
                getEducationListByApplicant(userID : "${props.userID}") {
                    courseID
                    courseName
                    courseType
                    eduID
                    specialization
                    specializationID
                    title
                    university
                    universityID
                    yearOfPassing
                   }
                }`
        };
        gqlquery(QUERY_GETEDUCATIONLISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => setEducationDetails(datas.data?.getEducationListByApplicant))
            .finally((e) => setIsLoading(false));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mx: "auto" }}>
            <Card sx={{ bgcolor: "#F2F2F2", px: 3, pt: 2, pb: 2 }}>
                <Typography
                    variant="h5"
                    sx={{ color: "#333333", fontWeight: "bold", pb: 3 }}
                    gutterBottom
                    component="div"
                >
                    Education
                </Typography>
                {
                    isLoading ? <Box sx={{ textAlign: "center" }}>
                        <CircularProgress color="inherit" />
                    </Box> : <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            gap: 3,
                            px: 1,
                        }}
                    >
                        {educationDetails?.map((info) => (
                            <Box key={info.id}>
                                <Typography
                                    variant="h6"
                                    sx={{ color: "#333333", fontWeight: "600" }}
                                    component="div"
                                >
                                    {info.courseName}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: "#828282", fontWeight: "medium" }}
                                    gutterBottom
                                    component="div"
                                >
                                    {info.university}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: "#828282", fontWeight: "400" }}
                                    gutterBottom
                                    component="div"
                                >
                                    {info.yearOfPassing} ({info.courseType})
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                }

            </Card>
        </Container>
    );
};

export default Education;
