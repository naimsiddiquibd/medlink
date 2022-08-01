import { Box, Card, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery, } from "../../../../api/hospitalIndex.js";
import CircularProgress from "@mui/material/CircularProgress";

const KeySkills = (props) => {
    const [savedSkills, setSavedSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // For defaut value
        const QUERY_GETSKILLSLISTBYAPPLICANT = {
            query: `query MyQuery {
                getSkillsListByApplicant(userID : "${props.userID}") {
                    name
                    sID
                    skillID
                   }
                }`
        };
        gqlquery(QUERY_GETSKILLSLISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => setSavedSkills(data?.data.getSkillsListByApplicant))
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
                    Key Skills
                </Typography>

                {
                    isLoading ? <Box sx={{ textAlign: "center" }}>
                        <CircularProgress color="inherit" />
                    </Box> : <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, px: 1 }}>
                        {savedSkills.map((skill) => (
                            <Typography
                                sx={{
                                    bgcolor: "#E0E0E0",
                                    color: "#333333",
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                }}
                                variant="body2"
                            >
                                {skill?.name}
                            </Typography>
                        ))}
                    </Box>
                }

            </Card>
        </Container>
    );
};

export default KeySkills;
