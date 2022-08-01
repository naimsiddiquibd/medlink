import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { gqlquery, QUERY_SAVEDJOBS } from '../../api';
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarIcon from '@mui/icons-material/Star';


const SavedJobs = () => {

    const [savedJobs, setSavedJobs] = useState([]);
    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
        gqlquery(QUERY_SAVEDJOBS, null)
            .then((res) => res.json())
            .then((data) => setSavedJobs(data?.data?.getSavedJobs));
    }, [updateList]);

    console.log(savedJobs)
    const handleDeleteSavedJobs = (deleteId) => {

        if (window.confirm("Are you sure you want to delete?")) {
            const QUERY_REMOVEJOBFROMSAVEDLIST = {
                query: `mutation MyMutation {
                removeJobFromSavedList (vacancyID: ${Number(deleteId)})
                }`,
                variables: null,
                operationName: "MyMutation",
            };

            gqlquery(QUERY_REMOVEJOBFROMSAVEDLIST, null)
                .then((res) => res.json())
                .then((data) => setUpdateList(!updateList))
                .finally((e) =>
                    console.log("Deleting Save Job from database")
                );
        } else {
            console.log("You don't want to delete this!");
        }
    };



    const newSavedJobs = savedJobs?.map((savedJob) => {
        const date_diff_indays = function () {
            const dt1 = new Date(savedJob?.postedOn);
            const dt2 = new Date();
            const days = Math.floor(
                (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
                    Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
                (1000 * 60 * 60 * 24)
            );
            const month = Math.floor(days / 30)
            const day = days % 30
            if (days >= 30) {

                return {
                    month,
                    day
                }
            }
            return {
                days
            }
        };

        return {
            date_diff_indays,
            jobTitle: savedJob?.jobTitle,
            qualification: savedJob?.qualification,
            secondarySpecialization: savedJob?.secondarySpecialization,
            description: savedJob?.description,
            maximumSalary: savedJob?.maximumSalary,
            minimumSalary: savedJob?.minimumSalary,
            location: savedJob?.location,
            postedOn: savedJob?.postedOn,
            primarySpecialization: savedJob?.primarySpecialization,
            experience: savedJob?.experience,
            employmentType: savedJob?.employmentType,
            lastDateToApply: savedJob?.lastDateToApply,
            responses: savedJob?.responses,
            vacancyID: savedJob?.vacancyID,
            vacancyType: savedJob?.vacancyType,
        }
    })

    return (
        <Box>
            <Box sx={{ bgcolor: "#BDBDBD", width: "100%", height: "240px" }}>

            </Box>
            <Container
                sx={{
                    mt: -10,
                    mb: 7,
                }}
            >
                <Card
                    sx={{
                        margin: "auto",
                        borderRadius: "12px",
                        bgcolor: "#F2F2F2"
                    }}
                >
                    <CardContent >
                        <Typography sx={{ fontSize: "24px", fontWeight: "Bold", p: 3 }}>{savedJobs?.length} Jobs saved by you</Typography>
                    </CardContent>
                </Card>
            </Container>
            <Container sx={{mb: 10}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    {newSavedJobs?.map((savedJob) =>
                        <Box
                            key={savedJob?.vacancyID}
                            sx={{
                                bgcolor: "#F2F2F2",
                                borderRadius: 3,
                                p: 2.5,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                boxShadow: 1,
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{
                                    color: "#333333",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                }}
                            >
                                {savedJob?.jobTitle}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                component="div"
                                sx={{
                                    color: "#333333",
                                    fontWeight: "600",
                                }}
                            >
                                {/* {savedJob.hospitalName} */}
                                Hospital / Consultant name Here
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    pr: 2,
                                }}
                            >
                                <DescriptionTwoToneIcon
                                    fontSize="small"
                                    sx={{ color: "#323232" }}
                                />
                                <Typography
                                    component="div"
                                    sx={{ color: "#4F4F4F" }}
                                    variant="body1"
                                >
                                    {savedJob?.description}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{
                                        color: "#333333",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        lineHeight: "16px",
                                    }}
                                >
                                    Key Skills
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 2,
                                    }}
                                >

                                    {/* {savedJob.skills.map((skill) => ( */}
                                    <Typography
                                        variant="subtitle2"
                                        component="div"
                                        sx={{
                                            lineHeight: "16px",
                                            color: "#333333",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {savedJob?.primarySpecialization}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        component="div"
                                        sx={{
                                            lineHeight: "16px",
                                            color: "#333333",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {savedJob?.secondarySpecialization}
                                    </Typography>
                                    {/* ))}  */}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        pr: 2,
                                    }}
                                >
                                    <LocationOnTwoToneIcon
                                        fontSize="small"
                                        sx={{ color: "#323232" }}
                                    />
                                    <Typography
                                        component="div"
                                        sx={{ color: "#4F4F4F" }}
                                        variant="body1"
                                    >
                                        {savedJob?.location}

                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        pr: 2,
                                    }}
                                >
                                    <WorkTwoToneIcon
                                        fontSize="small"
                                        sx={{ color: "#323232" }}
                                    />
                                    <Typography
                                        component="div"
                                        sx={{ color: "#4F4F4F" }}
                                        variant="body1"
                                    >
                                        {savedJob?.experience} {savedJob?.experience === 1 ? "Year" : "Years"}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        pr: 2,
                                    }}
                                >
                                    <AccountBalanceWalletTwoToneIcon
                                        fontSize="small"
                                        sx={{ color: "#323232" }}
                                    />
                                    <Typography
                                        component="div"
                                        sx={{ color: "#4F4F4F" }}
                                        variant="body1"
                                    >
                                        {savedJob?.maximumSalary} {"INR"}
                                    </Typography>
                                </Box>
                            </Box>
                            <Grid container spacing={2}>

                                <Grid item xs={11}>
                                    <Box
                                        sx={{
                                            width: "max-content",
                                            display: "flex",
                                            alignItems: "center",
                                            bgcolor: "#E0E0E0",
                                            gap: 1,
                                            px: 2,
                                            borderRadius: 1.5,
                                        }}
                                    >
                                        <AccessTimeOutlinedIcon
                                            fontSize="small"
                                            sx={{ color: "#828282" }}
                                        />
                                        <Typography
                                            component="div"
                                            sx={{ color: "#828282" }}
                                            variant="body1"
                                        >
                                            {
                                                savedJob?.date_diff_indays()?.month ? (
                                                    <>
                                                        {savedJob?.date_diff_indays()?.month} {savedJob?.date_diff_indays()?.month === 1 ? "month" : "months"} {" "}
                                                        {
                                                            savedJob?.date_diff_indays().day ? (
                                                                <>
                                                                    {savedJob.date_diff_indays()?.day} {savedJob.date_diff_indays()?.day === 1 ? "day" : "days"} {"ago"}
                                                                </>
                                                            ) :
                                                                (
                                                                    <> {"ago"}
                                                                    </>
                                                                )
                                                        }
                                                    </>
                                                ) :
                                                    (
                                                        <>
                                                            {savedJob?.date_diff_indays().days} {savedJob?.date_diff_indays()?.days === 1 ? "day" : "days"}    {"ago"}
                                                        </>
                                                    )
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                                {/* <Grid item xs={1}>
                                    {
                                      newSavedJobs?.map ((savedjobs) => <Button onClick={() => handleDeleteSavedJobs(savedjobs.vacancyID)} sx={{ width: "max-content", bgcolor: "#E0E0E0", gap: 1 }}><StarIcon fontSize="small"></StarIcon> Saved </Button>
                                      
                                      ) }
                                    
                                </Grid> */}
                                <Grid item xs={1}>
                                     <Button onClick={() => handleDeleteSavedJobs(savedJob?.vacancyID)} sx={{ width: "max-content", bgcolor: "#E0E0E0", gap: 1 }}><StarIcon fontSize="small"></StarIcon> Saved </Button>  
                                </Grid>
                            </Grid>


                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default SavedJobs;