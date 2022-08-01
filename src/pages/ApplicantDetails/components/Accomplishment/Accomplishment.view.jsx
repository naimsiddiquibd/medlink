import { Box, Card, Container, Typography, Divider, Button, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import CircularProgress from "@mui/material/CircularProgress";

const Accomplishments = (props) => {
    const [membershipDetails, setMembershipDetails] = useState([]);
    const [paperDetails, setPaperDetails] = useState([]);
    const [awardDetails, setAwardDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const QUERY_GETMEMBERSHIPSBYAPPLICANT = {
            query: `query MyQuery {
                getMembershipsByApplicant(userID : "${props.userID}") {
                    lifeMembership
                    memID
                    organization
                    positionHeld
                   }
                }`
        };
        gqlquery(QUERY_GETMEMBERSHIPSBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => setMembershipDetails(datas.data?.getMembershipsByApplicant));
    }, []); 
    
    useEffect(() => {
        const QUERY_GETPAPERSBYAPPLICANT = {
            query: `query MyQuery {
                getPapersByApplicant(userID : "${props.userID}") {
                    description
                    fileURL
                    month
                    paperID
                    title
                    url
                    year
                   }
                }`
        };
        gqlquery(QUERY_GETPAPERSBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => setPaperDetails(datas.data?.getPapersByApplicant));
    }, []);

    useEffect(() => {
        const QUERY_GETAWARDSBYAPPLICANT = {
            query: `query MyQuery {
                getAwardsByApplicant(userID : "${props.userID}") {
                    awardID
                    description
                    month
                    url
                    name
                    year
                   }
                }`
        };
        gqlquery(QUERY_GETAWARDSBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => setAwardDetails(datas.data?.getAwardsByApplicant));
    }, []);

    return (
        <div>
            <Container maxWidth="lg" sx={{ mx: "auto" }}>
                <Card sx={{ bgcolor: "#F2F2F2", px: 3, pt: 2, pb: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{ color: "#333333", fontWeight: "bold", pb: 3 }}
                        gutterBottom
                        component="div"
                    >
                        Accomplishments
                    </Typography>

                    <Box sx={{ pl: 0, pb: 0, display: "flex", flexDirection: "column", gap: 2, width: "80%" }} >
                        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                            <Typography variant="h6" sx={{
                                fontSize: 18, fontWeight: 700, // margin: "1rem",
                            }} >
                                Memberships & Positions
                            </Typography>

                        </Box>
                        <Box sx={{ width: "700px" }}>
                            {
                                membershipDetails?.map(membership => (
                                    <Box sx={{ display: "flex", justifyContent: "", alignItems: "baseline", mb: 2, gap: 3 }}>
                                        <Box>
                                            <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                                                <Typography variant="subtitle2" gutterBottom component="div" sx={{ width: "150px" }}
                                                >
                                                    Position Held
                                                </Typography>
                                                <Typography variant="subtitle2" gutterBottom component="div" sx={{ color: "#4F4F4F" }}
                                                >
                                                    {membership.positionHeld}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                                                <Typography variant="subtitle2" gutterBottom component="div" sx={{ width: "150px" }}
                                                >
                                                    Organization
                                                </Typography>
                                                <Typography variant="subtitle2" gutterBottom component="div" sx={{ color: "#4F4F4F" }}
                                                >
                                                    {membership.organization}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                                                <Typography variant="subtitle2" gutterBottom component="div" sx={{ width: "150px" }}
                                                >
                                                    Life Membership
                                                </Typography>
                                                <Typography variant="subtitle2" gutterBottom component="div" sx={{ color: "#4F4F4F" }}
                                                >
                                                    {membership.lifeMembership ? "Yes" : "No"}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Button
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            {/* <EditIcon
                                  sx={{ fontSize: "medium" }}
                                  onClick={() => open("updatememberposition", membership)}
                                /> */}
                                        </Button>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>

                    <Divider
                        sx={{ color: "#333333", fontWeight: "bold", my: 4 }}
                    />

                    <Box style={{ marginTop: "0%" }}>
                        <div
                            style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center", width: "80%"
                            }}
                        >
                            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}
                            >
                                Papers
                            </Typography>

                        </div>
                        <div>
                            {paperDetails?.map((paperItem, index) => (
                                <CardContent sx={{ display: "flex", alignItems: "baseline", p: 0, mb: 2 }}>
                                    <Box sx={{ display: "grid", lineHeight: "25px" }}>
                                        <Typography variant="p">
                                            <b>{paperItem.title}</b>
                                        </Typography>
                                        <Typography variant="info" sx={textStyle}>
                                            {Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`${paperItem.month}`))} &nbsp;
                                            {new Date(paperItem.year).toLocaleString("default", {
                                                year: "numeric",
                                            })}
                                        </Typography>
                                        <Typography variant="info" sx={textStyle}>
                                            <a href={paperItem.url}>{paperItem.url}</a>
                                        </Typography>
                                        <Typography variant="info" sx={textStyle}>
                                            {paperItem.description}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "",
                                        }}
                                    >
                                        <Button>
                                            {/* <EditIcon sx={{ fontSize: "medium" }} onClick={() => open("updatepaper", paperItem)} /> */}
                                        </Button>

                                    </Box>
                                </CardContent>
                            ))}
                        </div>
                    </Box>
                    <Divider
                        sx={{ color: "#333333", fontWeight: "bold", my: 4 }}
                    />

                    <Box>
                        <Box style={{
                            display: "flex", justifyContent: "", marginTop: "0px", width: "80%"
                        }}
                        >
                            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, margin: "0rem", marginBottom: "2%", }}
                            >
                                Awards
                            </Typography>

                        </Box>
                        <Box>
                            {awardDetails?.map((awardItem, index) => (
                                <Box key={`accomplishments-awards-${index}`}>
                                    <CardContent sx={{ display: "flex", alignItems: "baseline", gap: 3, p: 0 }}>
                                        <Box sx={{ display: "grid", lineHeight: "25px" }}>
                                            <Typography variant="p">
                                                <b>{awardItem.name}</b>
                                            </Typography>
                                            <Typography variant="info" sx={textStyle}>
                                                {Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`${awardItem.month}`))}  &nbsp;
                                                {awardItem.year}
                                            </Typography>
                                            <Typography variant="info" sx={textStyle}>
                                                <a href={awardItem.url}>{awardItem.url}</a>
                                            </Typography>
                                            <Typography variant="info" sx={textStyle}>
                                                {awardItem.description}
                                            </Typography>
                                        </Box>
                                        <Button sx={{ display: "flex", justifyContent: "space-between" }} >
                                            {/* <EditIcon sx={{ fontSize: "medium" }} onClick={() => open("updateaward", awardItem)} /> */}
                                        </Button>
                                    </CardContent>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Card>
            </Container>
        </div>
    );
};

export default Accomplishments;
const textStyle = { fontSize: 12, color: "#828282" };