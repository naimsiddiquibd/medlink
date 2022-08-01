import { Box, Card, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import CircularProgress from "@mui/material/CircularProgress";

const Experience = (props) => {
    const [getExperiencedList, setGetExperiencedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const QUERY_GETEXPERIENCELISTBYAPPLICANT = {
            query: `query MyQuery {
                getExperienceListByApplicant(userID : "${props.userID}") {
                    currentlyWorking
                    description
                    designation
                    designationID
                    employmentType
                    expID
                    hospital
                    hospitalID
                    jobType
                    notice
                    noticePeriodID
                    startingMonth
                    startingYear
                    workingMonth
                    workingYear
                   }
                }`
        };
        gqlquery(QUERY_GETEXPERIENCELISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => setGetExperiencedList(datas.data.getExperienceListByApplicant))
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
                    Experience
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
                        {getExperiencedList.map((info) => (
                            <Box key={info.designationID}>
                                <Typography
                                    variant="h6"
                                    sx={{ color: "#333333", fontWeight: "600" }}
                                    component="div"
                                >
                                    {info.designation}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: "#828282", fontWeight: "400" }}
                                    gutterBottom
                                    component="div"
                                >
                                    {info.hospital}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: "#828282", fontWeight: "400" }}
                                    gutterBottom
                                    component="div"
                                >
                                    {Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`${info.startingMonth}`))}
                                    &nbsp;
                                    {info.startingYear} to &nbsp;
                                    {
                                        info.currentlyWorking ? "Current" : <span>
                                            {Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`${info.workingMonth}`))}
                                            &nbsp;
                                            {info.workingYear}
                                        </span>
                                    } ({info.time})
                                </Typography>
                                <Box sx={{ pl: 0, pb: 1 }}>
                                    {/* {info.descriptions.map((description) => ( */}
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ color: "#828282", fontWeight: "400" }}
                                        component="div"
                                    >
                                        {info.description}
                                    </Typography>
                                    {/*     ))} */}
                                </Box>

                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: "#828282", fontWeight: "400" }}
                                    gutterBottom
                                    component="div"
                                >
                                  Notice Period  {info.notice}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                }


            </Card>
        </Container>
    );
};

export default Experience;
