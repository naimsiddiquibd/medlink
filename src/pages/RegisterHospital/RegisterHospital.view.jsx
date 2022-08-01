import { useEffect, useState } from "react";
import { Container, Grid, FormControl, Typography, TextField, Button, Checkbox, FormHelperText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { gqlquery, QUERY_GETHOSPITAL } from "../../api/hospitalIndex.js";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const RegisterHospital = () => {
    const [address, setAddress] = useState();
    const [addressObj, setAddressObj] = useState();
    const [form, setForm] = useState({
        'hospitalName': '',
        'hospitalShortName': '',
        'location': '',
        'hospitalType': '',
        'primaryName': '',
        'primaryContact': '',
        'primaryEmail': '',
        'gstin': '',
        'promotionoalCommunication': false,
        'termsAndPolicy': false
    });
    const [inputErr, setInputErr] = useState("");
    const [phoneNumErr, setPhoneNumErr] = useState("");
    const [latlng, setLatlng] = useState({});
    const navigate = useNavigate();

    // console.log("from line 25", addressObj?.address);
    // console.log("from line 36", address?.label);
    // console.log("38", latlng)

    const { promotionoalCommunication, termsAndPolicy } = form;
    const formValueChange = (e) => {
        setForm((_form) => {
            let __form = { ..._form };
            __form[e.target.name] = e.target.value;
            return __form;
        });
    }

    const handleChangeCheckbox = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.checked
        });
    }

    const getAddressObject = (address_components) => {
        console.log(address_components);
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

    useEffect(() => {
        gqlquery(QUERY_GETHOSPITAL, null)
            .then((res) => res.json())
            .then((datas) => {
                console.log("successfull", datas);
                if (datas?.data?.getHospital) {
                    navigate("/hospital-dashboard");
                }

            });
    }, []);

    const handlRegisterHospital = e => {

        if (address?.value?.structured_formatting?.main_text === undefined || form.hospitalType === "" || form.primaryName === "" || form.gstin) {
            setInputErr("This field can't be empty.")
        } else {
            setInputErr("");
        }

        let phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (phoneRegex.test(form.primaryContact)) {
            setPhoneNumErr("");
            // console.log(form.primaryContact, "passed phone number validation");
        } else {
            console.log("NOT WORKING")
            return setPhoneNumErr("Invalid phone number");
        }

        const QUERY_SIGNUPHOSPITAL = {
            query: `mutation MyMutation {
                    addHospital (
                        contactEmail: "ckpatil@gmail.com", 
                        contactName: "${form.primaryName}", 
                        contactPhone: "${Number(form.primaryContact)}", 
                        description: "${address?.value?.description}",
                        googlePlaceID: "${address?.value?.place_id}",
                        latitude: "${latlng.lat}",
                        longitude: "${latlng.lng}",
                        name: "${address?.value?.structured_formatting?.main_text}", 
                        taxNumber: "${form.gstin}", 
                        type: "${form.hospitalType}",  
                        )
                    }`,
            variables: null,
            operationName: "MyMutation",
        };

        gqlquery(QUERY_SIGNUPHOSPITAL, null)
            .then((res) => res.json())
            .then((datas) => {
                //    setHospitalData(!updateList)
                console.log("successfull", datas);
                if (datas?.data?.addHospital) {
                    navigate("/hospital-dashboard");
                }
            })
            .finally((e) => console.log("adding hospital details to database"));
    }

    return (
        <Container maxWidth="xl">
            <Grid container sx={{ gap: "1rem", marginBottom: "3rem", marginLeft: "2%", display: 'flex', flexDirection: 'column' }}>
                <Grid container>
                    <Grid item xs={4} maxWidth="xl" sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#C0C0C0",
                        paddingBlock: "2rem",
                        borderRadius: '10px'
                    }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h2"
                                    component="h2"
                                    sx={{ fontSize: "22px", fontWeight: "600", color: "#333333" }}>
                                    Register Your Hospital
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', }}>
                                <div style={{ width: "65%", alignItems: "center", margin: "0 auto" }}>
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
                                {/*    <pre style={{ textAlign: "left", background: "#f0f0f0", padding: 20 }}>
                                    {JSON.stringify(addressObj, 0, 2)}
                                </pre>
                                {
                                    "postal_code": "3050",
                                "province": "Vlaams Gewest",
                                "city": "Oud-Heverlee",
                                "country": "BE",
                                "address": "3050 Steenbergstraat"
                                } */}
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControl fullWidth sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <TextField
                                        variant="outlined"
                                        name="hospitalType"
                                        type="text"
                                        placeholder="Hospital Type"
                                        value={form.hospitalType}
                                        onChange={formValueChange}
                                        sx={{ backgroundColor: 'white', borderRadius: '6px', width: '65%' }}
                                    />
                                    {form.hospitalType === "" && (
                                        <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                            {inputErr}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControl fullWidth sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <TextField
                                        variant="outlined"
                                        name="primaryName"
                                        type="text"
                                        placeholder="Primary Name"
                                        value={form.primaryName}
                                        onChange={formValueChange}
                                        sx={{ backgroundColor: 'white', borderRadius: '6px', width: '65%' }}
                                    />
                                    {form.primaryName === "" && (
                                        <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                            {inputErr}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControl fullWidth sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <TextField
                                        variant="outlined"
                                        name="primaryContact"
                                        type="text"
                                        placeholder="Primary Contact"
                                        value={form.primaryContact}
                                        onChange={formValueChange}
                                        sx={{ backgroundColor: 'white', borderRadius: '6px', width: '65%' }}
                                    />
                                    {form.primaryContact === "" && (
                                        <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                            {phoneNumErr}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControl fullWidth sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <TextField
                                        variant="outlined"
                                        name="gstin"
                                        type="text"
                                        placeholder="GSTIN"
                                        value={form.gstin}
                                        onChange={formValueChange}
                                        sx={{ backgroundColor: 'white', borderRadius: '6px', width: '65%' }}
                                    />
                                    {form.gstin === "" && (
                                        <FormHelperText sx={{ color: "red", mb: 0, textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                            {inputErr}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
                                <Typography sx={{
                                    fontSize: "16px", color: "#333333",
                                    margin: "0 auto", width: "322px",
                                    display: "flex", flexDirection: "row",
                                    gap: 0, alignItems: 'flex-start',
                                    justifyContent: 'center', mb: 2,
                                }} >
                                    <Checkbox name="promotionoalCommunication" checked={promotionoalCommunication} color="default" onChange={(e) => handleChangeCheckbox(e)} />
                                    &nbsp;
                                    <b style={{ fontWeight: 400 }}>I agree to receive Promotional Communication</b>
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#333333", fontSize: "16px",
                                        margin: "0 auto", textJustify: "inner-word",
                                        width: "322px", display: "flex",
                                        flexDirection: "row", gap: 0,
                                        alignItems: 'flex-start', justifyContent: 'center',
                                    }}
                                >
                                    <Checkbox name="termsAndPolicy" checked={termsAndPolicy} color="default" onChange={(e) => handleChangeCheckbox(e)} />
                                    &nbsp;
                                    <b style={{ fontWeight: 400 }}>
                                        I agree to &nbsp;
                                        <Link to="/terms-and-conditions">Terms & Conditions</Link> and&nbsp;
                                        <Link to="/privacy-policy">Privacy Policy</Link>
                                    </b>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={handlRegisterHospital}
                                    sx={{ mt: 2, borderRadius: 2, py: 2, px: 10, width: "65%" }}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7} maxWidth="xl">
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
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    );
};

export default RegisterHospital;