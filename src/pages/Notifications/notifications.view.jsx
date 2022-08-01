import { Grid, Box, Container, Typography } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

function createData(id, title, time, description, viewed) {
    return { id, title, time, description, viewed };
}

let dataRows = [
    createData(
        "notify10",
        "Notification Title",
        "14 min",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
        false
    ),
    createData(
        "notify11",
        "Notification Title",
        "1 day",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
        false
    ),
    createData(
        "notify12",
        "Notification Title",
        "2 days",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
        false
    ),
    createData(
        "notify13",
        "Notification Title",
        "1 month",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
        true
    ),
    createData(
        "notify13",
        "Notification Title",
        "1 month",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
        true
    ),
];

const Notifications = () => {
    console.log(dataRows);
    return (
        <Container maxWidth="md" sx={{ mb: 8, p: 3 }}>
            <Box>
                <Typography
                    variant="body2"
                    gutterBottom
                    sx={{ mb: 3, color: "#828282" }}
                >
                    Home &#62; Notifications
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ mb: "0.825rem", fontWeight: "600", color: "#333333" }}
                    gutterBottom
                    component="div"
                >
                    Notifications
                </Typography>
            </Box>
            <Box sx={{ mx: "auto" }}>
                <Grid container gap={2} rowSpacing={1}>
                    {dataRows.map((notification) => (
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 2,
                                borderRadius: "0.5rem",
                                bgcolor: notification.viewed
                                    ? "#F2F2F2"
                                    : "#E0E0E0",
                            }}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <Typography
                                        variant="subtitle2"
                                        gutterBottom
                                        component="div"
                                        sx={{
                                            ml: 0,
                                            color: "#333333",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {notification.title} &nbsp;
                                        <Typography
                                            variant="caption"
                                            display="inline"
                                            gutterBottom
                                            sx={{
                                                color: notification.viewed
                                                    ? "#93A3BC"
                                                    : "#4F4F4F",
                                            }}
                                        >
                                            {notification.time}
                                        </Typography>
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        component="div"
                                        sx={{
                                            ml: 0,
                                            color: "#4F4F4F",
                                        }}
                                    >
                                        {notification.description}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        textAlign: "right",
                                        my: "auto",
                                    }}
                                >
                                    {!notification.viewed && (
                                        <CircleIcon
                                            fontSize="1rem"
                                            sx={{
                                                color: "#2F80ED",
                                            }}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Notifications;
