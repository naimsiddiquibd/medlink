import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
  Slider,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from '@mui/material/Checkbox';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

function CustomizedSelects() {
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "baseline",
        alignItems: "center",
        marginTop: "35px",
      }}
    >
      <FormControl sx={{}} variant="standard">
        <Box
          style={{
            display: "flex",
            justifyContent: "baseline",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            style={{ width: "20px", height: "20px", marginRight: "13px" }}
            checked
          />
          The preffered location is
        </Box>
      </FormControl>
    </div>
  );
}

const AdvSearch = (props) => {
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();
  const [latlng, setLatlng] = useState({});
  const [openAdvSearch, setOpenAdvSearch] = useState(true);
  const [values, setValues] = useState({
    experienceFrom: "",
    experienceTo: "",
    employmentType: "",
    salaryRange: [0, 100],
  });
  const [currentLocation, setCurrentLocation] = useState(true);
  const [anyKeyWords, setAnyKeywords] = useState(null);
  const [allKeyWords, setAllKeywords] = useState(null);
  const [experienceCount, setExperienceCount] = useState();

  const handleAdvSearch = () => {
    setOpenAdvSearch(!openAdvSearch);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let city = address?.value?.structured_formatting?.main_text;

  if (city === undefined) {
    city = "";
  }

  useEffect(() => {
    function getYears() {
      let yearArr = [];
      for (let i = 0; i <= 20; i++) {
        yearArr.push(i);
      }
      setExperienceCount(yearArr);
    }
    getYears();
  }, [])

  const getAddressObject = (address_components) => {
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
      // console.log("214 addressObject", addressObject);
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

  const sendData = {
    keyword1: anyKeyWords,
    keyword2: allKeyWords,
    cityName: city,
    inputValues: values
  }

  useEffect(() => {
    props?.getAdvanceSearch(sendData);
  }, [city, values, anyKeyWords, allKeyWords]);
   
  return (
    <Grid
      container
      sx={{
        // gap: "1rem",
        marginBottom: "3rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ marginTop: "1.5%", marginBottom: "2%" }}
      >
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/jobs-and-responses">
          {"Resume Database"}
        </Link>
        <Typography color="text.primary">Search Resume</Typography>
      </Breadcrumbs>

      {/* Advance search */}
      <Grid
        item
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
          marginBottom: "-25px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "3%",
            marginRight: "3%",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "-30px",
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#333333",
              }}
            >
              Advance Search
            </Typography>
            {openAdvSearch ? (
              <ExpandLess
                onClick={handleAdvSearch}
                style={{ height: "35px", width: "40px" }}
              />
            ) : (
              <ExpandMore
                onClick={handleAdvSearch}
                style={{ height: "35px", width: "40px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Collapse in={openAdvSearch} timeout="auto" unmountOnExit>
        <Grid
          item
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F2F2F2",
            textAlign: "center",
            paddingBlock: "2rem",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={4}>
            {/* any keywords  */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 3% 0 3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Any Keywords
                </Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  style={{ backgroundColor: "white", border: "2px solid white" }}
                  id="tags-outlined"
                  options={topSpecializations.map((option) => option.title)}
                  onChange={(event, val) => setAnyKeywords(val)}
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
                      disableUnderline
                      // label="Primary Specialization"
                      placeholder="Keywords"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/* all keywords must have  */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 3% 0 3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  All Keywords (Must Have)
                </Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  style={{ backgroundColor: "white", border: "2px solid white" }}
                  id="tags-outlined"
                  options={topSpecializations.map((option) => option.title)}
                  onChange={(event, val) => setAllKeywords(val)}
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
                      disableUnderline
                      // label="Primary Specialization"
                      placeholder="Keywords"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/* Experience From */}
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Experience From
                </Typography>
                <Select
                  value={values.experienceFrom}
                  onChange={handleChange("experienceFrom")}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  {
                    experienceCount?.map(expC => (
                      <MenuItem value={expC}>{expC}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>
            </Grid>
            {/* Experience To */}
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 4%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Experience To
                </Typography>
                <Select
                  value={values.experienceTo}
                  onChange={handleChange("experienceTo")}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  {
                    experienceCount?.map(expC => (
                      <MenuItem value={expC}>{expC}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            {/* Employment Type */}
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Employment Type
                </Typography>
                <Select
                  defaultValue={"Full Time"}
                  value={values.employmentType}
                  onChange={handleChange("employmentType")}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  <MenuItem value="" disabled>Select</MenuItem>
                  <MenuItem value={"Full Time"}>Full Time</MenuItem>
                  <MenuItem value={"Part Time"}>Part Time</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Current Location */}
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 4%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Current Location
                </Typography>
                <div style={{ width: "" }}>
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
                </div>
              </FormControl>

              <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", mt: 1 }}>
                <input
                  style={{ width: "20px", height: "20px", }}
                  checked={currentLocation}
                  type="checkbox"
                  onChange={(e) => setCurrentLocation(e.target.checked)}
                />
                <Box sx={{ display: "flex", alignItems: "center", }}>
                  {currentLocation ? (
                    <Typography sx={{ pl: 2 }}> The preffered location is <span style={{ fontWeight: "bold" }}>same as selected</span></Typography>
                  ) : (
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
                      <Typography sx={{ pl: 2, pr: 1 }} >The preffered location is </Typography>  <div style={{ width: "250px" }}>
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
                      </div>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            {/* Salary Range */}
            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Salary Range
                </Typography>
                <Slider
                  name="salaryRange"
                  getAriaLabel={() => "Salary range"}
                  valueLabelDisplay="auto"
                  value={values.salaryRange}
                  onChange={handleChange("salaryRange")}
                  min={0}
                  max={100}
                  marks={[
                    { value: 0, label: `₹${values.salaryRange[0]} Lakh` },
                    { value: 100, label: `₹${values.salaryRange[1]} Lakh` },
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
          </Grid>
        </Grid>
      </Collapse >
    </Grid >
  );
};

export default AdvSearch;


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