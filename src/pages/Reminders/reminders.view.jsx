import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

function createData(id, title, time, description, viewed) {
    return { id, title, time, description, viewed };
}

let dataRows = [
    createData(
        "reminder10",
        "Reminder Title",
        "14 min",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
        false
    ),
    createData(
        "reminder11",
        "Reminder Title",
        "1 day",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
        false
    ),
    createData(
        "reminder12",
        "Reminder Title",
        "2 days",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
        false
    ),
    createData(
        "reminder13",
        "Reminder Title",
        "1 month",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
        true
    ),
    createData(
        "reminder14",
        "Reminder Title",
        "1 month",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
        true
    ),
];

const Reminders = () => {
    return (
        <Container
            maxWidth="md"
            sx={{ mb: 8, p: 3 /* fontFamily: "Open sans" */ }}
        >
            <Typography
                variant="body2"
                gutterBottom
                sx={{ mb: 3, color: "#828282" }}
            >
                Home &#62; Reminders
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    mb: "0.825rem",
                    fontWeight: "600",
                    color: "#333333",
                }}
                gutterBottom
                component="div"
            >
                Reminders
            </Typography>
            <Box sx={{ mx: "auto" }}>
                <Grid container gap={2} rowSpacing={1}>
                    {dataRows.map((reminder) => (
                        <Grid
                            item
                            xs={12}
                            sx={{
                                p: 2,
                                borderRadius: "0.5rem",
                                bgcolor: reminder.viewed
                                    ? "#F2F2F2"
                                    : "#E0E0E0",
                            }}
                        >
                            <Grid container>
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
                                        {reminder.title} &nbsp;
                                        <Typography
                                            variant="caption"
                                            display="inline"
                                            gutterBottom
                                            sx={{
                                                color: reminder.viewed
                                                    ? "#93A3BC"
                                                    : "#4F4F4F",
                                            }}
                                        >
                                            {reminder.time}
                                        </Typography>
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        component="div"
                                        sx={{ ml: 0, color: "#4F4F4F" }}
                                    >
                                        {reminder.description}
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
                                    {!reminder.viewed && (
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

export default Reminders;
