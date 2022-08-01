import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

const theme = createTheme();
const useStyles = makeStyles({
    jobRelatedInfoSection: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
});

const JobRelatedInfoGrid = styled(Grid)(() => ({
    display: "grid",
    placeItems: "center",
    position: "relative",
    background: "#bdbdbd80",
    "&::before": {
        content: '""',
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -2,
        // background: `url(${welcomeBg})`,
        opacity: 0.7,
    },
}));

const JobRelatedInfo = (props) => {
    const classes = useStyles();
    return (
        <JobRelatedInfoGrid item xs={8} className={classes.jobRelatedInfoSection}>
            <Grid container alignItems="flex-start" sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#DEDEDE",
                marginLeft: '2%',
                borderRadius: '10px'
            }}>
                <Grid item xs={12} maxWidth="xl" sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f2f2f2",
                    margin: '2%',
                    borderRadius: '10px'
                }}>
                    <Typography variant="h2" align="left" component="h2" sx={{ fontSize: "24px", fontWeight: "600", color: "#333333", margin: '3%' }}>Job Posting</Typography>
                    <Typography align="left" sx={{ fontSize: "16px", marginLeft: '3%' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                        quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
                        temporibus animi.</Typography>
                    <Button sx={{ backgroundColor: '#f5f5f5', width: '15%', marginLeft: '3%', marginTop: '2%', marginBottom: '3%' }}>Know More</Button>
                </Grid>
                <Grid item xs={12} maxWidth="xl" sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f2f2f2",
                    margin: '2%',
                    borderRadius: '10px'
                }}>
                    <Typography variant="h2" align="left" component="h2" sx={{ fontSize: "24px", fontWeight: "600", color: "#333333", margin: '3%' }}>Resume Database</Typography>
                    <Typography align="left" sx={{ fontSize: "16px", marginLeft: '3%' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                        quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
                        temporibus animi.</Typography>
                    <Button sx={{ backgroundColor: '#f5f5f5', width: '15%', marginLeft: '3%', marginTop: '2%', marginBottom: '3%' }}>Know More</Button>
                </Grid>
                <Grid item xs={12} maxWidth="xl" sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f2f2f2",
                    margin: '2%',
                    borderRadius: '10px'
                }}>
                    <Typography variant="h2" align="left" component="h2" sx={{ fontSize: "24px", fontWeight: "600", color: "#333333", margin: '3%' }}>Advertisement</Typography>
                    <Typography align="left" sx={{ fontSize: "16px", marginLeft: '3%' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                        quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
                        temporibus animi.</Typography>
                    <Button sx={{ backgroundColor: '#f5f5f5', width: '15%', marginLeft: '3%', marginTop: '2%', marginBottom: '3%' }}>Know More</Button>
                </Grid>
            </Grid>
        </JobRelatedInfoGrid>
    )
}

export default JobRelatedInfo;