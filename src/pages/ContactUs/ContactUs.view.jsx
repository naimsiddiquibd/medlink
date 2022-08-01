import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import React, { useState, useEffect } from "react";

// const locations = [
//   "Kalkata",
//   "Dehli",
//   "Mombai",
//   "Bangalore",
//   "Bihar",
//   "Chennai",
// ];

const ContactUs = () => {
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();

  const [values, setValues] = useState({
    lookingFor: null,
    name: "",
    companyName: "",
    email: "",
    contactNumber: "",
    location: "",
    designation: "",
  });
  const [error, setError] = useState("");
  const [errRadio, setErrRadio] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [latlng, setLatlng] = useState({});

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const getAdressObject = (address_components) => {
    const shouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      street: ["street_address", "route"],
      province: ["administrative_area_level_1"],
      city: ["locality"],
      country: ["country"],
    };
    let address = {
      street_number: "",
      postal_code: "",
      street: "",
      province: "",
      city: "",
      country: "",
    };
    address_components.forEach((component) => {
      for (var shouldBe in shouldBeComponent) {
        if (shouldBeComponent[shouldBe].indexOf(component?.type[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = component?.short_name;
          } else {
            address[shouldBe] = component?.long_name;
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
      const geocodeObject =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));
      const addressObject =
        geocodeObject && getAdressObject(geocodeObject[0].address_components);
      setAddressObj(addressObject);
      geocodeByAddress(address?.label)
        .then((result) => getLatLng(result[0]))
        .then(({ lat, lng }) => {
          setLatlng({ lat, lng });
          console.log("64 Successfully got latitude and longitude");
        });
    };
    func();
  }, [address]);
  console.log("latlang", latlng);

  const handleContactUs = () => {
    // values.location = address?.value?.structured_formatting?.main_text;

    if (values.lookingFor === null) {
      setErrRadio("Please select what you looking for!");
    }
    if (address?.value?.structured_formatting?.main_text === undefined) {
      setErrAddress("You must be need to select company location.");
    }
    if (
      values.name === "" ||
      values.companyName === "" ||
      values.email === "" ||
      values.contactNumber === "" ||
      values.designation === ""
    ) {
      return setError("Text-Field Can't be Empty");
    }

    console.log(values);
    console.log(address);

    setErrRadio("");
    setErrAddress("");
    setError("");
  };

  return (
    <Box sx={{ mb: 10 }}>
      <Box sx={{ bgcolor: "#E0E0E0", height: "240px" }} />
      <Container
        maxWidth="md"
        sx={{
          marginTop: "-100px",
        }}
      >
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            boxShadow: 1,
            px: 2.5,
            py: 2,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#000000",
              fontSize: "24px",
              fontWeight: "600",
            }}
            component="div"
          >
            Contact Us
          </Typography>
          <Grid sx={{ mt: 1 }} container spacing={4}>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel
                  sx={{
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  I am looking for
                </FormLabel>
                <RadioGroup
                  onChange={handleChange("lookingFor")}
                  value={values.lookingFor}
                  error={errRadio}
                  row
                  name="row-radio-buttons-looking-for"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <FormControlLabel
                    sx={{ color: "#3B4256" }}
                    value="Recruitment Solutions"
                    control={<Radio />}
                    label="Recruitment Solutions"
                  />
                  <FormControlLabel
                    sx={{ color: "#3B4256" }}
                    value="Job Opportunities"
                    control={<Radio />}
                    label="Job Opportunities"
                  />
                  <FormControlLabel
                    sx={{ color: "#3B4256" }}
                    value="Job Posting"
                    control={<Radio />}
                    label="Job Posting"
                  />
                  <FormControlLabel
                    sx={{ color: "#3B4256" }}
                    value="Branding Solutions"
                    control={<Radio />}
                    label="Branding Solutions"
                  />
                </RadioGroup>
              </FormControl>
              {values.lookingFor === null && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {errRadio}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                sx={{
                  color: "#6F7482",
                  fontSize: "0.8rem",
                }}
              >
                Name&nbsp;
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ fontSize: "16px" }}
                >
                  *
                </Typography>
              </InputLabel>
              <TextField
                onChange={handleChange("name")}
                value={values.name}
                error={error}
                placeholder="Text"
                type="text"
                fullWidth
                sx={{
                  color: "#6F7482",
                  bgcolor: "#FFFFFF",
                }}
              />
              {values.name === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                sx={{
                  color: "#6F7482",
                  fontSize: "0.8rem",
                }}
              >
                Company Name&nbsp;
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ fontSize: "16px" }}
                >
                  *
                </Typography>
              </InputLabel>
              <TextField
                onChange={handleChange("companyName")}
                value={values.companyName}
                error={error}
                placeholder="Text"
                type="text"
                fullWidth
                sx={{
                  color: "#6F7482",
                  bgcolor: "#FFFFFF",
                }}
              />
              {values.companyName === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                sx={{
                  color: "#6F7482",
                  fontSize: "0.8rem",
                }}
              >
                Email&nbsp;
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ fontSize: "16px" }}
                >
                  *
                </Typography>
              </InputLabel>
              <TextField
                onChange={handleChange("email")}
                value={values.email}
                error={error}
                placeholder="Enter Email"
                type="email"
                fullWidth
                sx={{
                  color: "#6F7482",
                  bgcolor: "#FFFFFF",
                }}
              />
              {values.email === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                sx={{
                  color: "#6F7482",
                  fontSize: "0.8rem",
                }}
              >
                Contact Number&nbsp;
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ fontSize: "16px" }}
                >
                  *
                </Typography>
              </InputLabel>
              <TextField
                onChange={handleChange("contactNumber")}
                value={values.contactNumber}
                error={error}
                placeholder="Enter Number"
                type="tel"
                fullWidth
                sx={{
                  color: "#6F7482",
                  bgcolor: "#FFFFFF",
                }}
              />
              {values.email === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                sx={{
                  color: "#6F7482",
                  fontSize: "0.8rem",
                }}
              >
                Company Location&nbsp;
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ fontSize: "16px" }}
                >
                  *
                </Typography>
              </InputLabel>
              <GooglePlacesAutocomplete
                apiKey="AIzaSyChTcMUCY9Zw3j00st0uKkqTz0RGlOpea8"
                placeholder="Type in an address"
                AutocompletionRequest={{
                  bounds: [
                    { lat: 50, lng: 50 },
                    { lat: 100, lng: 100 },
                  ],
                  componentRestrictions: {
                    country: ["us", "ca", "uy"],
                  },
                }}
                selectProps={{
                  isClearable: true,
                  value: address,
                  onChange: (value) => {
                    setAddress(value);
                  },
                  styles: {
                    input: (provided) => ({
                      ...provided,
                      boxShadow: 0,
                      borderRadius: "6px",
                      height: "46px",
                      "&:hover": {
                        border: "1px solid purple",
                      },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      boxShadow: 0,
                      "&:hover": {
                        border: "1px solid purple",
                      },
                    }),
                  },
                }}
              />
              {address?.value?.structured_formatting?.main_text ===
                undefined && (
                <FormHelperText
                  sx={{
                    color: "red",
                    mb: 0,
                    textAlign: "left",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  {errAddress}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                sx={{
                  color: "#6F7482",
                  fontSize: "0.8rem",
                }}
              >
                Designation&nbsp;
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ fontSize: "16px" }}
                >
                  *
                </Typography>
              </InputLabel>
              <TextField
                onChange={handleChange("designation")}
                value={values.designation}
                error={error}
                placeholder="Text"
                type="Text"
                fullWidth
                sx={{
                  color: "#6F7482",
                  bgcolor: "#FFFFFF",
                }}
              />
              {values.designation === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Box sx={{ px: 32, pt: 5, pb: 2 }}>
            <Button
              onClick={handleContactUs}
              variant="contained"
              sx={{ borderRadius: 2 }}
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            boxShadow: 1,
            py: 1.3,
            px: 2.5,
            borderRadius: 2,
          }}
        >
          <Grid container>
            <Grid item xs={6} sx={{ borderRight: "1px solid #BDBDBD" }}>
              <Typography
                component="h6"
                variant="caption"
                sx={{ color: "#333333", fontWeight: "600" }}
              >
                Sale Enquires
              </Typography>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                sx={{ gap: "1rem", my: 1 }}
              >
                <Grid
                  item
                  sx={{
                    backgroundColor: "#828282",
                    padding: "3px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <PhoneIcon sx={{ color: "#FFFFFF" }} />
                </Grid>
                <Grid item>
                  <Typography
                    component="p"
                    sx={{
                      display: "block",
                      lineHeight: "30px",
                      color: "#828282",
                      fontSize: "20px",
                    }}
                  >
                    Toll No: +91-40-66116611
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      display: "block",
                      lineHeight: "30px",
                      color: "#828282",
                      fontSize: "20px",
                    }}
                  >
                    Toll Free No: 1-800-4196666
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                sx={{ gap: "1rem", my: 1 }}
              >
                <Grid
                  item
                  sx={{
                    backgroundColor: "#828282",
                    padding: "3px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <EmailIcon sx={{ color: "#FFFFFF" }} />
                </Grid>
                <Grid item>
                  <Typography
                    component="p"
                    sx={{
                      display: "block",
                      lineHeight: "30px",
                      color: "#828282",
                      fontSize: "20px",
                    }}
                  >
                    info@medilinks.in
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ borderLeft: "2px solid #BDBDBD", pl: 10 }}>
              <Typography
                component="h6"
                variant="caption"
                sx={{ color: "#333333", fontWeight: "600" }}
              >
                Customer Support
              </Typography>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                sx={{ gap: "1rem", my: 1 }}
              >
                <Grid
                  item
                  sx={{
                    backgroundColor: "#828282",
                    padding: "3px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <PhoneIcon sx={{ color: "#FFFFFF" }} />
                </Grid>
                <Grid item>
                  <Typography
                    component="p"
                    sx={{
                      display: "block",
                      lineHeight: "30px",
                      color: "#828282",
                      fontSize: "20px",
                    }}
                  >
                    Toll No: +91-40-66116611
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      display: "block",
                      lineHeight: "30px",
                      color: "#828282",
                      fontSize: "20px",
                    }}
                  >
                    Toll Free No: 1-800-4196666
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                sx={{ gap: "1rem", my: 1 }}
              >
                <Grid
                  item
                  sx={{
                    backgroundColor: "#828282",
                    padding: "3px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <EmailIcon sx={{ color: "#FFFFFF" }} />
                </Grid>
                <Grid item>
                  <Typography
                    component="p"
                    sx={{
                      display: "block",
                      lineHeight: "30px",
                      color: "#828282",
                      fontSize: "20px",
                    }}
                  >
                    info@medilinks.in
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
