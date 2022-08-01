import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Grid,
    FormControl,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    Breadcrumbs,
    Link,
    Slider,
    FormHelperText,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from "@mui/system";
import { gqlquery, QUERY_GETHOSPITAL, QUERY_GETMYPROFILE } from "../../api/hospitalIndex.js";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CreateVacancy = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState();
    const [addressObj, setAddressObj] = useState();
    const [latlng, setLatlng] = useState({});
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        jobTitle: "",
        location: "",
        qualification: "",
        employmentType: "",
        experience: "",
        lastDateToApply: new Date(),
        description: "",
        salaryRange: [100000, 9900000],
        filterKeyword: "",
        filterLocation: "",
        filterExperienceFrom: "",
        filterExperienceTo: "",
        filterSalaryRange: [100000, 9900000],
    });
    const [inputErr, setInputErr] = useState("");
    const [primarySpecialization, setPrimarySpecialization] = useState(null);
    const [secondarySpecialization, setSecondarySpecialization] = useState(null);
    const [hospitalData, setHospitalData] = useState([]);
    const [accessJobPosting, setAccessJobPosting] = useState([]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const formValueChange = (e) => {
        setForm((_form) => {
            let __form = { ..._form };
            __form[e.target.name] = e.target.value;
            return __form;
        });
    };

    const handleNavigate = () => {
        navigate("/hospital-dashboard");
    };

    // console.log("from line 74", addressObj);
    // console.log("from line 75", address?.label);
    // console.log("from line 76", address?.value?.structured_formatting?.main_text);

    //TODO: resovle location issue from google place

    useEffect(() => {
        gqlquery(QUERY_GETHOSPITAL, null)
            .then((res) => res.json())
            .then((datas) => {
                setHospitalData(datas?.data?.getHospital);
                console.log("successfull from hot vacancies", datas);
            });

        gqlquery(QUERY_GETMYPROFILE, null)
            .then((res) => res.json())
            .then((datas) => {
                setAccessJobPosting(datas?.data?.getMyProfile);
                if (datas?.data?.getMyProfile?.accessJobPosting === false) {
                    setOpen(true);
                    setTimeout(handleNavigate, 4000)
                }
                console.log("successfull 2 from hot vacancies", datas);
            });

    }, []);

    const handleCreate = () => {
        if (form.jobTitle === "" || form.description === "" || form.qualification === "" || form.employmentType === "" || form.experience === "" || form.primarySpecialization === "" || form.secondarySpecialization === "" || form.lastDateToApply === "" || form.salaryRange === "") {
            return setInputErr("This field can't be empty.");
        } else {
            setInputErr("")
        }

        console.log(form)
        console.log(typeof form.salaryRange, form.salaryRange)
        const QUERY_CREATEHOTVACANCY = {
            query: `mutation MyMutation {
                       createHotVacancy    (
                            description: "${form.description}", 
                            employmentType: "${form.employmentType}", 
                            experience: ${Number(form.experience)},
                            jobTitle: "${form.jobTitle}", 
                            lastDateToApply: "${form.lastDateToApply.toISOString().slice(0, 10)}", 
                            location: "${address?.value?.structured_formatting?.main_text}", 
                            maximumSalary: ${Number(form.salaryRange[1])}, 
                            minimumSalary: ${Number(form.salaryRange[0])}, 
                            qualification: "${form.qualification}",
                            primarySpecialization: "${primarySpecialization?.join()}", 
                            secondarySpecialization: "${secondarySpecialization?.join()}"
                            )   
                        }`,
            variables: null,
            operationName: "MyMutation",
        };

        gqlquery(QUERY_CREATEHOTVACANCY, null)
            .then((res) => res.json())
            .then((datas) => {
                //   setUpdateList(!updateList);
                console.log(datas);
                if (datas?.data?.createHotVacancy === "Inserted") {
                    navigate("/manage-jobs-and-responses")
                }
            })
            .finally((e) => console.log("create a new hot vacancy!"));
        setOpen(true);
        setTimeout(handleNavigate, 1500);
    };

    const getAddressObject = (address_components) => {
        // console.log(address_components);
        const ShouldBeComponent = {
            street_number: ["street_number"],
            postal_code: ["postal_code"],
            street: ["street_address", "route"],
            province: ["administrative_area_level_1"],
            city: ["locality"],
            country: ["country"]
        };

        let address = {
            street_number: "",
            postal_code: "",
            street: "",
            province: "",
            city: "",
            country: ""
        };

        address_components.forEach((component) => {
            for (var shouldBe in ShouldBeComponent) {
                if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                    if (shouldBe === "country") {
                        address[shouldBe] = component.short_name;
                    } else {
                        address[shouldBe] = component.long_name;
                    }
                }
            }
        });

        // Fix the shape to match our schema
        address.address = address.street_number + " " + address.street;
        delete address.street_number;
        delete address.street;
        if (address.country === "US") {
            address.state = address.province;
            delete address.province;
        }
        return address;
    };

    useEffect(() => {
        const func = async () => {
            const geocodeObj =
                address &&
                address.value &&
                (await geocodeByPlaceId(address.value.place_id));
            const addressObject =
                geocodeObj && getAddressObject(geocodeObj[0].address_components);
            // console.log("addressObject", addressObject);
            setAddressObj(addressObject);
            geocodeByAddress(address?.label)
                .then(results => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                    setLatlng({ lat, lng });
                }
                );
        };
        func();
    }, [address]);

    return (
        <Container maxWidth="xl">
            {accessJobPosting?.accessJobPosting ? (
                <Grid
                    container
                    sx={{
                        gap: "1rem",
                        marginBottom: "3rem",
                        marginLeft: "2%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                        sx={{ marginTop: "1%" }}
                    >
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/jobs-and-responses"
                        >
                            {"Jobs & Responses"}
                        </Link>
                        <Typography color="text.primary">Hot Vacancy </Typography>
                    </Breadcrumbs>
                    <Typography
                        variant="h5"
                        component="h2"
                        style={{
                            fontSize: "22px",
                            fontWeight: "600",
                            color: "#333333",
                        }}
                    >
                        Create Hot Vacancy
                    </Typography>
                    <Grid container>
                        <Grid
                            item
                            xs={7}
                            maxWidth="xl"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "left",
                                alignItems: "left",
                                backgroundColor: "#F2F2F2",
                                textAlign: "left",
                                paddingBlock: "2rem",
                                borderRadius: "10px",
                            }}
                        >
                            {/*  create hot vacancy  */}
                            <Grid container spacing={4}>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Job Title <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            name="jobTitle"
                                            type="text"
                                            placeholder="Text"
                                            value={form.jobTitle}
                                            onChange={formValueChange}
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        />
                                        {form.jobTitle === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                {inputErr}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <div style={{ width: "100%", alignItems: "center", margin: "0 auto" }}>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Location <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <GooglePlacesAutocomplete
                                            apiKey="AIzaSyChTcMUCY9Zw3j00st0uKkqTz0RGlOpea8"
                                            placeholder="Type in an address"
                                            AutocompletionRequest={{
                                                bounds: [
                                                    { lat: 50, lng: 50 },
                                                    { lat: 100, lng: 100 }
                                                ],
                                                componentRestrictions: {
                                                    country: ['us', 'ca', 'uy'],
                                                }
                                            }}
                                            selectProps={{
                                                isClearable: true,
                                                value: address,
                                                onChange: (val) => {
                                                    setAddress(val);
                                                },
                                                styles: {
                                                    input: (provided) => ({
                                                        ...provided,
                                                        boxShadow: 0, borderRadius: '6px', height: "46px",
                                                        "&:hover": {
                                                            border: "1px solid purple"
                                                        }
                                                    }),
                                                    singleValue: (provided) => ({
                                                        ...provided,
                                                        boxShadow: 0,
                                                        "&:hover": {
                                                            border: "1px solid purple"
                                                        }
                                                    })
                                                }
                                            }}
                                        />
                                        {address?.value?.structured_formatting?.main_text === undefined && (
                                            <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                {inputErr}
                                            </FormHelperText>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography variant="p" sx={{ textAlign: "left" }} >
                                            Qualification <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        {/* <InputLabel id="demo-simple-select-label">
                                        item.designation
                                    </InputLabel> */}
                                        <Select
                                            defaultValue={""}
                                            value={form.qualification}
                                            onChange={formValueChange}
                                            label="qualification"
                                            name="qualification"
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <MenuItem value={""} disabled select>Qualification</MenuItem>
                                            <MenuItem value={"MBBS"}>MBBS</MenuItem>
                                            <MenuItem value={"MD"}>MD</MenuItem>
                                            <MenuItem value={"MS"}>MS</MenuItem>
                                            <MenuItem value={"MCH"}>MCH</MenuItem>
                                            <MenuItem value={"DM"}>DM</MenuItem>
                                            <MenuItem value={"DIP"}>DIP</MenuItem>
                                        </Select>
                                        {form.qualification === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                {inputErr}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <>
                                        {/* <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        item.designation
                                    </InputLabel>
                                    <Typography
                                        variant="p"
                                        sx={{ textAlign: "left" }}
                                    >
                                        Qualification
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-1"
                                        label="Designation"
                                        // defaultValue={"MBBS"}
                                        // error={values.designation === "" && error}
                                        value={form.qualification}
                                        onChange={formValueChange}
                                        sx={{ backgroundColor: "#ffffff" }}
                                    >
                                        <MenuItem value={"MBBS"}>MBBS</MenuItem>
                                        <MenuItem value={"MBBS"}>MBBS</MenuItem>
                                        <MenuItem value={"MBBS"}>MBBS</MenuItem>
                                        {allDesignation.map((singleDesignation) => (
                                            <MenuItem value={singleDesignation.dmID}>
                                                {singleDesignation.name}
                                            </MenuItem>
                                        ))}  
                                    </Select>

                                   {values.designation === "" && (
                                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                                            {error}
                                        </FormHelperText>
                                    )}  
                                </FormControl> */}
                                    </>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Employment Type  <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <Select
                                            value={form.employmentType}
                                            onChange={formValueChange}
                                            label="employmentType"
                                            name="employmentType"
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <MenuItem value={"Permanent"}>
                                                Permanent
                                            </MenuItem>
                                            <MenuItem value={"Contractual"}>
                                                Contractual
                                            </MenuItem>
                                            <MenuItem value={"Both"}>
                                                Both
                                            </MenuItem>
                                        </Select>
                                        {form.employmentType === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                {inputErr}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%" }} >
                                    <FormControl fullWidth sx={{ bgColor: "white" }}>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Primary Specialization <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <Autocomplete
                                            multiple
                                            freeSolo
                                            style={{ backgroundColor: "white" }}
                                            id="tags-outlined"
                                            options={topSpecializations.map((option) => option.title)}
                                            onChange={(event, val) => setPrimarySpecialization(val)}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                ))
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{ backgroundColor: "white" }}
                                                    variant="outlined"
                                                    // label="Primary Specialization"
                                                    placeholder="Specialization"
                                                />
                                            )}
                                        />
                                        {(primarySpecialization === null || primarySpecialization?.length === 0) && (
                                            <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                {inputErr}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%" }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Secondary Specialization <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <Autocomplete
                                            multiple
                                            freeSolo
                                            style={{ backgroundColor: "white" }}
                                            id="tags-outlined"
                                            options={topSpecializations.map((option) => option.title)}
                                            onChange={(event, val) => setSecondarySpecialization(val)}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                ))
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{ backgroundColor: "white" }}
                                                    variant="outlined"
                                                    // label="Primary Specialization"
                                                    placeholder="Specialization"
                                                />
                                            )}
                                        />
                                        {(secondarySpecialization === null || secondarySpecialization?.length === 0) && (
                                            <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                {inputErr}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Experience <span style={{ color: "gray" }}>(In Year)</span> <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <TextField
                                            name="experience"
                                            type="Number"
                                            variant="outlined"
                                            placeholder="Number"
                                            value={form.experience}
                                            onChange={formValueChange}
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        />
                                        {form.experience === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                {inputErr}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Last Date to Apply  <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <DesktopDatePicker
                                                name="lastDateToApply"
                                                inputFormat="dd/MM/yyyy"
                                                value={form.lastDateToApply}
                                                onChange={(value) => {
                                                    formValueChange({
                                                        target: {
                                                            name: "lastDateToApply",
                                                            value: new Date(value),
                                                        },
                                                    });
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        sx={{
                                                            backgroundColor:
                                                                "white",
                                                            borderRadius: "6px",
                                                        }}
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={11} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Description <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <TextField
                                            name="description"
                                            type="text"
                                            variant="outlined"
                                            placeholder="Text"
                                            multiline
                                            rows={5}
                                            value={form.description}
                                            onChange={formValueChange}
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        />
                                        {form.description === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                {inputErr}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={10.5}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginLeft: "5.5%",
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Salary Range <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <Slider
                                            name="salaryRange"
                                            getAriaLabel={() => "Salary range"}
                                            onChange={formValueChange}
                                            valueLabelDisplay="auto"
                                            value={form.salaryRange}
                                            min={100000}
                                            max={9900000}
                                            marks={[
                                                { value: 100000, label: `${(Math.round((form.salaryRange[0] / 100000) * 100) / 100).toFixed(2)} lakh INR` },
                                                { value: 9900000, label: `${(Math.round((form.salaryRange[1] / 100000) * 100) / 100).toFixed(2)} lakh INR` },
                                            ]}
                                            sx={{
                                                "& .MuiSlider-thumb": {
                                                    height: 24,
                                                    width: 24,
                                                    color: "white",
                                                },
                                                "& .MuiSlider-track": {
                                                    height: 10,
                                                    color: "#80828282",
                                                },
                                                "& .MuiSlider-rail": {
                                                    height: 10,
                                                    color: "white",
                                                },
                                            }}
                                        />
                                        {form.salaryRange === "" && (
                                            <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                {inputErr}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 4 }}></Box>
                            <hr
                                style={{
                                    color: "black",
                                    margin: "0 3% 5% 3%",
                                    border: "1px solid #E0E0E0",
                                }}
                            />
                            {/* set job response filter  */}
                            <Typography
                                variant="h5"
                                component="h2"
                                style={{
                                    fontSize: "22px",
                                    fontWeight: "600",
                                    color: "#333333",
                                    paddingLeft: "21px",
                                    marginBottom: "15px"
                                }}
                            >
                                Set Response Filters
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Keywords
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            name="filterKeyword"
                                            type="text"
                                            placeholder="Text"
                                            value={form.filterKeyword}
                                            onChange={formValueChange}
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <div style={{ width: "100%", alignItems: "center", margin: "0 auto" }}>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Location
                                        </Typography>
                                        <GooglePlacesAutocomplete
                                            apiKey="AIzaSyChTcMUCY9Zw3j00st0uKkqTz0RGlOpea8"
                                            placeholder="Type in an address"
                                            AutocompletionRequest={{
                                                bounds: [
                                                    { lat: 50, lng: 50 },
                                                    { lat: 100, lng: 100 }
                                                ],
                                                componentRestrictions: {
                                                    country: ['us', 'ca', 'uy'],
                                                }
                                            }}
                                            selectProps={{
                                                isClearable: true,
                                                value: address,
                                                onChange: (val) => {
                                                    setAddress(val);
                                                },
                                                styles: {
                                                    input: (provided) => ({
                                                        ...provided,
                                                        boxShadow: 0, borderRadius: '6px', height: "46px",
                                                        "&:hover": {
                                                            border: "1px solid purple"
                                                        }
                                                    }),
                                                    singleValue: (provided) => ({
                                                        ...provided,
                                                        boxShadow: 0,
                                                        "&:hover": {
                                                            border: "1px solid purple"
                                                        }
                                                    })
                                                }
                                            }}
                                        />
                                        {/* {address?.value?.structured_formatting?.main_text === undefined && (
                                        <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                            {inputErr}
                                        </FormHelperText>
                                    )} */}
                                    </div>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Experience From
                                        </Typography>
                                        <Select
                                            value={form.filterExperienceFrom}
                                            onChange={formValueChange}
                                            label="Experience From"
                                            name="filterExperienceFrom"
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <MenuItem value={"0"}>0 </MenuItem>
                                            <MenuItem value={"1"}>1 </MenuItem>
                                            <MenuItem value={"2"}> 2</MenuItem>
                                            <MenuItem value={"3"}> 3</MenuItem>
                                            <MenuItem value={"4"}>4 </MenuItem>
                                            <MenuItem value={"5"}>5 </MenuItem>
                                            {/* <MenuItem value={'6'}>6 </MenuItem>
                                        <MenuItem value={'7'}>7 </MenuItem>
                                        <MenuItem value={'8'}>8 </MenuItem>
                                        <MenuItem value={'9'}>9 </MenuItem>
                                        <MenuItem value={'10'}>10 </MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Experience To
                                        </Typography>
                                        <Select
                                            value={form.filterExperienceTo}
                                            onChange={formValueChange}
                                            label="Experience To"
                                            name="filterExperienceTo"
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            <MenuItem value={"0"}>0 </MenuItem>
                                            <MenuItem value={"1"}>1 </MenuItem>
                                            <MenuItem value={"2"}> 2</MenuItem>
                                            <MenuItem value={"3"}> 3</MenuItem>
                                            <MenuItem value={"4"}>4 </MenuItem>
                                            <MenuItem value={"5"}>5 </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={11} sx={{ display: "flex", flexDirection: "column", marginLeft: "3%", }} >
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Salary Range
                                        </Typography>
                                        <Slider
                                            name="filterSalaryRange"
                                            getAriaLabel={() => "Salary range"}
                                            onChange={formValueChange}
                                            valueLabelDisplay="auto"
                                            value={form.filterSalaryRange}
                                            min={100000}
                                            max={9900000}
                                            marks={[
                                                { value: 100000, label: "100000 INR" },
                                                { value: 9900000, label: "9900000 INR" },
                                            ]}
                                            sx={{
                                                "& .MuiSlider-thumb": {
                                                    height: 24,
                                                    width: 24,
                                                    color: "white",
                                                },
                                                "& .MuiSlider-track": {
                                                    height: 10,
                                                    color: "#80828282",
                                                },
                                                "& .MuiSlider-rail": {
                                                    height: 10,
                                                    color: "white",
                                                },
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginLeft: "3%", marginRight: "5%", }} >
                                    <Button size="large" sx={{ backgroundColor: "white", marginRight: "2%", borderRadius: "5px", }} >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleCreate}
                                        style={{ color: "white" }}
                                        sx={{
                                            backgroundColor: "#4F4F4F",
                                            borderRadius: "5px",
                                            color: "white",
                                        }}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* side tips on the right side */}
                        <Grid
                            item
                            xs={4}
                            maxWidth="xl"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "#F2F2F2",
                                paddingBlock: "2rem",
                                marginLeft: "2%",
                                borderRadius: "10px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="h2"
                                style={{
                                    fontSize: "22px",
                                    fontWeight: "600",
                                    color: "#333333",
                                    paddingLeft: "21px"
                                }}
                            >
                                TIPS
                            </Typography>
                            <hr
                                color="#333333"
                                height="10px"
                                width="85%"
                                style={{ marginLeft: "5%" }}
                            />
                            <ul
                                style={{
                                    marginLeft: "5%",
                                    marginTop: "2%",
                                    padding: "3%",
                                }}
                            >
                                <li style={{ marginBottom: "4%" }}>
                                    {" "}
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptate quia sunt quam nam
                                    harum? Necessitatibus, alias! Sequi fuga error
                                    rem temporibus animi.
                                </li>
                                <li style={{ marginBottom: "4%" }}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptate quia sunt quam nam
                                    harum? Necessitatibus, alias! Sequi fuga error
                                    rem temporibus animi.
                                </li>
                                <li style={{ marginBottom: "4%" }}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptate quia sunt quam nam
                                    harum? Necessitatibus, alias! Sequi fuga error
                                    rem temporibus animi.
                                </li>
                                <li style={{ marginBottom: "4%" }}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptate quia sunt quam nam
                                    harum? Necessitatibus, alias! Sequi fuga error
                                    rem temporibus animi.
                                </li>
                                <li style={{ marginBottom: "4%" }}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptate quia sunt quam nam
                                    harum? Necessitatibus, alias! Sequi fuga error
                                    rem temporibus animi.
                                </li>
                                <li style={{ marginBottom: "4%" }}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptate quia sunt quam nam
                                    harum? Necessitatibus, alias! Sequi fuga error
                                    rem temporibus animi.
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        This user does not have sufficient privileges for this page. Please contact your administrator.
                    </Alert>
                </Snackbar>
            )}


        </Container>
    );
};

export default CreateVacancy;

const topSpecializations = [
    { title: 'Cardiac Surgeon', year: 1994 },
    { title: 'Orthopaedic Doctor', year: 1972 },
    { title: 'Neonatal Surgeon', year: 1974 },
    { title: 'Pediatrician', year: 2008 },
    { title: 'Physician', year: 1957 },
    { title: "General Physician", year: 1993 },
    { title: 'Anesthesiologist', year: 1994 },
    { title: 'Gastroenterologists', year: 1966 },
    { title: 'Hematologists', year: 1999 }
];