import { Button, Card, CardActions, CardContent, Container, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const BasicDetails = () => {

    const onClick = (e) => {
        e.preventDefault();
        // setFlag((prevData) => !prevData);
        // setShowUpdateCareerScreen((prevData) => !prevData);
    };
    

    const [values, setValues] = useState({
        name: "",
        specialization: "",
        experienceYears: "",
        experienceMonths: "",
        salaryLacs: "",
        salaryThousand: "",
        email: "",
        mobile: "",
        location: "",
    });
    const [error, setError] = useState("");
    const [errInput, setErrInput] = useState("");
    //   const [updateList, setUpdateList] = useState(false);
    //   const [showUpdateCareerScreen, setShowUpdateCareerScreen] = useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const handleBasicDetails = () => {
        if (values.name === "") {
            setErrInput("Text field can not be empty.");
        }
        else if (values.specialization === "") {
            setErrInput("Text field can not be empty.");
        }
        else if (values.email === "") {
            setErrInput("Text field can not be empty.");
        }
        else if (values.mobile === "") {
            setErrInput("Text field can not be empty.");
        }
        else {
            setErrInput("");
        }

        if (
            values.experienceYears === "" ||
            values.experienceMonths === "" ||
            values.salaryLacs === "" ||
            values.salaryThousand === "" ||
            values.location === ""
        ) {
            return setError("Please, select an option.");
        }
        /*    console.log("values", values);
           setValues(values); */

        /* when need to use server */
        values.name = "";
        values.specialization = "";
        values.experienceYears = "";
        values.experienceMonths = "";
        values.salaryLacs = "";
        values.salaryThousand = "";
        values.email = "";
        values.mobile = "";
        values.location = "";

        setErrInput("");
        setError("");

    };
    console.log("values", values);

    /* const CareerScreen = (item) => {
      // e.preventDefault();
      setShowUpdateCareerScreen((prevData) => !prevData);
      setCareerItem(careerItem);
    };
*/
    return (
        <Box>
            <Box backgroundColor={"#BDBDBD"} height={"240px"} width={"100%"} marginBottom={"60px"}>

            </Box>
            <Box>
                <Container>
                    <Grid container sx={{ marginBlock: "1rem" }} spacing={3}>
                        <Card
                            sx={{
                                height: "100%",
                                backgroundColor: "var(--clr-gray-6) !important",
                            }}
                        >
                            <Typography
                                component="h3"
                                variant="h5"
                                sx={{
                                    fontSize: 24,
                                    fontWeight: 700,
                                    margin: "1rem",
                                    marginBottom: 0,
                                    pl: 2
                                }}
                            >
                                Basic Details
                            </Typography>
                            <Grid
                                container
                                direction={"row"}
                                alignItems="flex-start"
                                padding={4}
                                spacing={3}
                                sx={{ lineHeight: 5 }}
                            >
                                <Grid item direction={"column"} xs={12} md={6}>
                                    <FormControl fullWidth >
                                        <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                                            <span style={{ color: '#616161' }}>Name</span>
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            sx={{ backgroundColor: "#ffffff", width: "100%" }}
                                            value={values.name}
                                            onChange={handleChange("name")}
                                            fullWidth
                                            error={values.name === "" && errInput}
                                            helpertext={error}
                                            placeholder="Text"
                                        />

                                        {values.name === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                {errInput}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item direction={"column"} xs={12} md={6}>
                                    <FormControl fullWidth >
                                        <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                                            <span style={{ color: '#616161' }}>Specialization</span>
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            sx={{ backgroundColor: "#ffffff", width: "100%" }}
                                            value={values.specialization}
                                            onChange={handleChange("specialization")}
                                            fullWidth
                                            error={values.specialization === "" && errInput}
                                            helpertext={error}
                                            placeholder="Text"
                                        />
                                        {values.specialization === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                {errInput}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item direction={"column"} xs={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item direction={"column"} xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                                                    <span style={{ color: '#616161' }}>Experience(Years)</span>
                                                </FormLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select-2"
                                                    error={values.experienceYears === "" && error}
                                                    value={values.experienceYears}
                                                    onChange={handleChange("experienceYears")}
                                                    sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="" disabled>Select</MenuItem>
                                                    <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                                                    <MenuItem value={"5 Lakhs to 10 Lakhs"}>5 Lakhs to 10 Lakhs</MenuItem>
                                                    <MenuItem value={"10 Lakhs to 20 Lakhs"}>10 Lakhs to 20 Lakhs</MenuItem>
                                                    <MenuItem value={"20 Lakhs to 50 Lakhs"}>20 Lakhs to 50 Lakhs</MenuItem>
                                                    <MenuItem value={"50 Lakhs above"}>50 Lakhs above</MenuItem>
                                                </Select>
                                                {values.experienceYears === "" && (
                                                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                        {error}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item direction={"column"} xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                                                    <span style={{ color: '#616161' }}>Experience(Months)</span>
                                                </FormLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select-2"
                                                    error={values.experienceMonths === "" && error}
                                                    value={values.experienceMonths}
                                                    onChange={handleChange("experienceMonths")}
                                                    sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="" disabled>Select</MenuItem>
                                                    <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                                                    <MenuItem value={"5 Lakhs to 10 Lakhs"}>5 Lakhs to 10 Lakhs</MenuItem>
                                                    <MenuItem value={"10 Lakhs to 20 Lakhs"}>10 Lakhs to 20 Lakhs</MenuItem>
                                                    <MenuItem value={"20 Lakhs to 50 Lakhs"}>20 Lakhs to 50 Lakhs</MenuItem>
                                                    <MenuItem value={"50 Lakhs above"}>50 Lakhs above</MenuItem>
                                                </Select>
                                                {values.experienceMonths === "" && (
                                                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                        {error}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item direction={"column"} xs={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item direction={"column"} xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                                                    <span style={{ color: '#616161' }}>Salary(Lacs)</span>
                                                </FormLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select-2"
                                                    error={values.salaryLacs === "" && error}
                                                    value={values.salaryLacs}
                                                    onChange={handleChange("salaryLacs")}
                                                    sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="" disabled>Select</MenuItem>
                                                    <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                                                    <MenuItem value={"5 Lakhs to 10 Lakhs"}>5 Lakhs to 10 Lakhs</MenuItem>
                                                    <MenuItem value={"10 Lakhs to 20 Lakhs"}>10 Lakhs to 20 Lakhs</MenuItem>
                                                    <MenuItem value={"20 Lakhs to 50 Lakhs"}>20 Lakhs to 50 Lakhs</MenuItem>
                                                    <MenuItem value={"50 Lakhs above"}>50 Lakhs above</MenuItem>
                                                </Select>
                                                {values.salaryLacs === "" && (
                                                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                        {error}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item direction={"column"} xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                                                    <span style={{ color: '#616161' }}>Salary(Thousand)</span>
                                                </FormLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select-2"
                                                    error={values.salaryThousand === "" && error}
                                                    value={values.salaryThousand}
                                                    onChange={handleChange("salaryThousand")}
                                                    sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="" disabled>Select</MenuItem>
                                                    <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                                                    <MenuItem value={"5 Lakhs to 10 Lakhs"}>5 Lakhs to 10 Lakhs</MenuItem>
                                                    <MenuItem value={"10 Lakhs to 20 Lakhs"}>10 Lakhs to 20 Lakhs</MenuItem>
                                                    <MenuItem value={"20 Lakhs to 50 Lakhs"}>20 Lakhs to 50 Lakhs</MenuItem>
                                                    <MenuItem value={"50 Lakhs above"}>50 Lakhs above</MenuItem>
                                                </Select>
                                                {values.salaryThousand === "" && (
                                                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                        {error}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item direction={"column"} xs={12} md={6}>
                                    <FormControl fullWidth >
                                        <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                                            <span style={{ color: '#616161' }}>Email</span>
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            sx={{ backgroundColor: "#ffffff", width: "100%" }}
                                            value={values.email}
                                            onChange={handleChange("email")}
                                            fullWidth
                                            error={values.email === "" && errInput}
                                            helpertext={error}
                                            placeholder="Text"
                                        />
                                        {values.email === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                {errInput}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item direction={"column"} xs={12} md={6}>
                                    <FormControl fullWidth >
                                        <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                                            <span style={{ color: '#616161' }}>Mobile</span>
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            sx={{ backgroundColor: "#ffffff", width: "100%" }}
                                            value={values.mobile}
                                            onChange={handleChange("mobile")}
                                            fullWidth
                                            error={values.mobile === "" && errInput}
                                            helpertext={error}
                                            placeholder="Text"
                                        />
                                        {values.mobile === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                {errInput}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item direction={"column"} xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                                            <span style={{ color: '#616161' }}>Location</span>
                                        </FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select-2"
                                            error={values.location === "" && error}
                                            value={values.location}
                                            onChange={handleChange("location")}
                                            sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>Select</MenuItem>
                                            <MenuItem value={"Andhra Pradesh"}>Andhra Pradesh</MenuItem>
                                            <MenuItem value={"Arunachal Pradesh"}>Arunachal Pradesh</MenuItem>
                                            <MenuItem value={"Assam"}>Assam</MenuItem>
                                            <MenuItem value={"Andaman and Nicobar Islands"}>Andaman and Nicobar Islands</MenuItem>
                                            <MenuItem value={"Bihar"}>Bihar</MenuItem>
                                            <MenuItem value={"Chattisgarh"}>Chattisgarh</MenuItem>
                                            <MenuItem value={"Chandigarh"}>Chandigarh</MenuItem>
                                            <MenuItem value={"Dadra and Nagar Haveli and Daman & Diu"}>Dadra and Nagar Haveli and Daman & Diu</MenuItem>
                                            <MenuItem value={"Goa"}>Goa</MenuItem>
                                            <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                                            <MenuItem value={"Haryana"}>Haryana</MenuItem>
                                            <MenuItem value={"Himachal Pradesh"}>Himachal Pradesh</MenuItem>
                                            <MenuItem value={"Jharkhand"}>Jharkhand</MenuItem>
                                            <MenuItem value={"Jammu & Kashmir"}>Jammu & Kashmir</MenuItem>
                                            <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                                            <MenuItem value={"Kerala"}>Kerala</MenuItem>
                                            <MenuItem value={"Ladakh"}>Ladakh</MenuItem>
                                            <MenuItem value={"Lakshadweep"}>Lakshadweep</MenuItem>
                                            <MenuItem value={"Madhya Pradesh"}>Madhya Pradesh</MenuItem>
                                            <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                                            <MenuItem value={"Manipur"}>Manipur</MenuItem>
                                            <MenuItem value={"Meghalaya"}>Meghalaya</MenuItem>
                                            <MenuItem value={"Mizoram"}>Mizoram</MenuItem>
                                            <MenuItem value={"Nagaland"}>Nagaland</MenuItem>
                                            <MenuItem value={"Odisha"}>Odisha</MenuItem>
                                            <MenuItem value={"Punjab"}>Punjab</MenuItem>
                                            <MenuItem value={"Puducherry"}>Puducherry</MenuItem>
                                            <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                                            <MenuItem value={"Sikkim"}>Sikkim</MenuItem>
                                            <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
                                            <MenuItem value={"Telangana"}>Telangana</MenuItem>
                                            <MenuItem value={"Tripura"}>Tripura</MenuItem>
                                            <MenuItem value={"The Government of NCT of Delhi"}>The Government of NCT of Delhi</MenuItem>
                                            <MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
                                            <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
                                            <MenuItem value={"West Bengal"}>West Bengal</MenuItem>
                                        </Select>
                                        {values.location === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                {error}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item direction={"column"} xs={12} md={6}>
                                    <span>No</span>
                                    <Button>
                                        <ToggleOffIcon fontSize={"large"} sx={{ color: "black" }} />
                                        {/* </ToggleButton> */}
                                    </Button>
                                    <span>YES</span>
                                </Grid>

                                <Grid
                                    item
                                    direction={"column"}
                                    xs={12}
                                    md={12}
                                    justifyContent="flex-end"
                                    sx={{ display: "grid" }}
                                >
                                    <CardContent>
                                        <CardActions
                                            sx={{ justifyContent: "flex-end", gap: "1rem", padding: 0 }}
                                        >
                                            <Button variant="outlined" onClick={onClick}>Cancel</Button>

                                            <Button variant="contained" onClick={handleBasicDetails}>
                                                Save
                                            </Button>
                                        </CardActions>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Container>
            </Box>

        </Box>
    );
};

export default BasicDetails;