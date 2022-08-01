import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const roles = ["Recruter", "Manager", "CEO"];

const AccountDetails = () => {
    const [userRole, setUserRole] = useState("");

    // handle snacks Pupup
    const [open, setOpen] = useState(false);

    const handleSnacksOpen = () => {
        setOpen(true);
    };
    const handleSnacksClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setUserRole(value);
    };

    // Onsubmit handler
    const handleAccountDetails = () => {
        handleSnacksOpen();
    };

    return (
        <Container maxWidth="md" sx={{ mb: 6, p: 3 }}>
            <Typography
                variant="body2"
                gutterBottom
                sx={{ mb: 3, color: "#828282" }}
            >
                Home &#62; Profile &#62; Company Profile
            </Typography>
            <Typography
                variant="h5"
                sx={{ mb: "0.9rem", fontWeight: "600", color: "#333333" }}
                component="div"
            >
                Account Details
            </Typography>

            <Box>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: "0.5rem",
                        bgcolor: "#E0E0E0",
                        boxShadow: 1,
                        py: 4,
                        px: 5,
                    }}
                >
                    <Grid
                        container
                        justifyContent="space-between"
                        rowSpacing={3}
                        columnSpacing={8}
                    >
                        <Grid item xs={6}>
                            <InputLabel
                                sx={{ color: "#6F7482", fontSize: "0.8rem" }}
                                htmlFor="username"
                            >
                                Username
                            </InputLabel>
                            <TextField
                                placeholder="Title name here"
                                id="username"
                                size="small"
                                type="text"
                                fullWidth
                                sx={{
                                    color: "#6F7482",
                                    bgcolor: "#FFFFFF",
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel
                                sx={{ color: "#6F7482", fontSize: "0.8rem" }}
                                htmlFor="email"
                            >
                                Email for Communication
                            </InputLabel>
                            <TextField
                                placeholder="Title name here"
                                id="email"
                                fullWidth
                                size="small"
                                type="email"
                                sx={{
                                    color: "#6F7482",
                                    bgcolor: "#FFFFFF",
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel
                                sx={{
                                    color: "#6F7482",
                                    fontSize: "0.8rem",
                                }}
                                htmlFor="role"
                            >
                                Role
                            </InputLabel>
                            <FormControl
                                sx={{
                                    color: "#6F7482",
                                    bgcolor: "#FFFFFF",
                                    width: "100%",
                                }}
                                placeholder="Title name here"
                            >
                                <Select
                                    value={userRole}
                                    onChange={handleChange}
                                    size="small"
                                    input={<OutlinedInput id="role" />}
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel
                                sx={{ color: "#6F7482", fontSize: "0.8rem" }}
                                htmlFor="reporter"
                            >
                                Reporting Manager
                            </InputLabel>
                            <TextField
                                placeholder="Title name here"
                                id="reporter"
                                fullWidth
                                size="small"
                                type="text"
                                sx={{
                                    color: "#6F7482",
                                    bgcolor: "#FFFFFF",
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel
                                sx={{ color: "#6F7482", fontSize: "0.8rem" }}
                                htmlFor="number"
                            >
                                Mobile Number
                            </InputLabel>
                            <TextField
                                placeholder="Title name here"
                                id="number"
                                fullWidth
                                size="small"
                                type="tel"
                                sx={{
                                    color: "#6F7482",
                                    bgcolor: "#FFFFFF",
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 4,
                        mt: 3,
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        sx={{
                            color: "#000000",
                            borderRadius: 2,
                            fontWeight: "bold",
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAccountDetails}
                        sx={{ bgColor: "#4F4F4F", borderRadius: 2 }}
                        variant="contained"
                    >
                        Save
                    </Button>
                </Box>
            </Box>
            <Box>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleSnacksClose}
                    message="Note archived"
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    sx={{ bgColor: "#D8D8D8" }}
                >
                    <div
                        style={{
                            backgroundColor: "#F4F4F4",
                            border: "1px solid #D8D8D8",
                            boxShadow: "5px 3px 10px #DDDDDD",
                            borderRadius: "12px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: 600,
                                // gap: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <Button>
                                    <AddCircleOutlineOutlinedIcon />
                                </Button>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#1A1A1A",
                                            fontSize: "16px",
                                            fontWeight: "700",
                                        }}
                                        variant="subtitle1"
                                    >
                                        Toast Title
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#1A1A1A",
                                            fontSize: "12px",
                                            fontWeight: "400",
                                        }}
                                        variant="body2"
                                    >
                                        Toast message goes here. Lorem ipsum.
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 2,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                }}
                            >
                                Buy Now
                            </Button>
                        </Box>
                    </div>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default AccountDetails;
