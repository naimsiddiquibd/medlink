import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import "./Signup2Form.css";
import { QUERY_LISTPROFILES, gqlquery, } from "../../api/index";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SignupGrid = styled(Grid)(() => ({ 
  backgroundColor: "var(--clr-white)",
  boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
  borderRadius: "6px", 
  padding: "20px 39px 40px"
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();
  const [latlng, setLatlng] = useState({});
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhoneNum] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [cityNameErr, setcCityNameErr] = useState("");
  const [phoneNumErr, setPhoneNumErr] = useState("");
  const [checked, setChecked] = useState(true);
  const [primarySpecialization, setPrimarySpecialization] = useState(null);
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    newsletter: false,
    experience: 1,
    activelySearching: false,
    salaryRange: 100000,
    specialization: "",
  });
  const [open, setOpen] = useState(false);
  const [infoSaved, setInfoSaved] = useState(false);
  const [infoSaveFailed, setInfoSaveFailed] = useState(false);

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
  };

  const fileInputRef = useRef();
  const handleFileChange = async (e) => {
    console.log("Upload resume");
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleNavigateProfileHome = () => {
    navigate("/profile-home");
  }

  gqlquery(QUERY_LISTPROFILES, null)
    .then((res) => res.json())
    .then((datas) => {
      if (datas?.data?.getProfile?.name) {
        navigate("/profile-home"); // Redirect after Login 
      }
    })
  // .finally((e) => console.log("executed"));

  console.log("from line 85", addressObj?.city);
  // console.log("from line 86", address);
  // console.log("from line 87", address?.value?.structured_formatting?.main_text);

  const handleBasicDetails = async (e) => {
    // e.preventDefault();
    setError("");

    let nameRegex = /^[0-9_-]*[a-zA-Z]{3,}[0-9_-]*/;
    if (nameRegex.test(name) && name !== "") {
      setNameErr("");
    } else {
      setNameErr("Name must have at least 3 characters");
    }

    let cityRegex = /^[0-9_-]*[a-zA-Z]{3,}[0-9_-]*/;
    if (cityRegex.test(city)) {
      setcCityNameErr("");
    } else {
      setcCityNameErr("Name must have at least 3 characters");
    }

    let phoneRegex = /^\+[1-9]\d{1,14}$/;
    // let phoneRegex = /^\+[1-9]\d{10,14}$/;
    if (phoneRegex.test(phone)) {
      setPhoneNumErr("");
      console.log(phone, "passed phone number validation");
    } else {
      setPhoneNumErr("Invalid phone number");
      console.log("failed")
    }

    if (nameErr !== "" || cityNameErr !== "" || phoneNumErr !== "") {
      // return console.log("You must fill up all the required field.");
    }

    console.log("all inputs are: ", name, phone, city, newsletter, form.experience, form.salaryRange);

    const QUERY_POSTPROFILES = {
      query: `mutation MyMutation {
           addProfile (
             name: "${name}",
             phone: "${phone}",
             city: "${addressObj?.city}",
             newsletter: ${newsletter},
             activelySearching: ${checked},
             exp: ${Number(form.experience)},
             salary: ${form.salaryRange},
             specialization: "${primarySpecialization}"
            ) {
                activelySearching
                city
                exp
                expMonths
                name
                newsletter
                phone
                phoneVerified
                salary
                salaryThousands
                specialization
              }
            }
          `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTPROFILES, null)
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas);
        if (datas?.data?.addProfile) {
          setOpen(true);
          setInfoSaved(true);
          setTimeout(handleNavigateProfileHome, 3000);
        }
        else {
          setOpen(true);
          setInfoSaveFailed(true);
        }
      })
      .finally((e) => console.log("adding to database"));
  };


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

  return (
    <SignupGrid item xs className="doctor-signup">
      <Box sx={{ display: "flex", flexDirection: "column",/*  justifyContent: "center", alignItems: "center", */ gap: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: "24px", fontWeight: "600", color: "var(--clr-blue-footer)", textAlign: "center" }}
        >
          Register
        </Typography>
        {/* name input  */}
        <Box>
          <InputLabel sx={{ py: 0.5 }}>Name</InputLabel>
          <Input
            sx={{
              borderRadius: 1,
            }}
            disableUnderline
            fullWidth
            error
            placeholder="Name"
            name="name"
            type="text"
            value={name}
            helperText={nameErr && "Name must have at least 3 characters"}
            onChange={(e) => setName(e.target.value)}
          />
          {/* {nameErr && (
            <FormHelperText sx={{ color: "red", mb: 0 }}>
              {nameErr}
            </FormHelperText>
          )} */}
        </Box>

        {/* email input  */}
        <Box>
          <div style={{ width: "100%", alignItems: "center", margin: "0 auto" }}>
            <InputLabel sx={{ py: 0.5 }}>Location</InputLabel>
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

        {/* phone number  */}
        <Box>
          <InputLabel sx={{ py: 0.5 }}>Phone Number</InputLabel>
          <Input
            sx={{
              borderRadius: 1,
            }}
            disableUnderline
            fullWidth
            error
            name="name"
            type="text"
            value={phone}
            placeholder="Phone Number"
            helperText={phoneNumErr}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </Box>

        {/* specialization */}
        <Box>
          <InputLabel sx={{ py: 0.5 }}>Specializations</InputLabel>
          <Autocomplete
            multiple
            freeSolo
            sx={{
              borderRadius: 1,
            }}
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
                sx={{ backgroundColor: "white", borderRadius: 1 }}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                disableUnderline
                placeholder="Specialization"
              />
            )}
          />
        </Box>

        {/* salary */}
        <Box>
          <InputLabel sx={{ py: 0.5 }}>Salary range</InputLabel>
          <Box sx={{ px: 3 }}>
            <Slider
              name="salaryRange"
              getAriaLabel={() => "Salary range"}
              onChange={formValueChange}
              // valueLabelDisplay="auto"
              value={form.salaryRange}
              min={100000}
              max={9900000}
              marks={[
                { value: 100000, label: `₹${(Math.round((form.salaryRange / 100000) * 100) / 100).toFixed(1)} L` },
                // { value: 9900000, label: `₹${(Math.round((form.salaryRange[1] / 100000) * 100) / 100).toFixed(1)} L` },
              ]}
              sx={{
                "& .MuiSlider-thumb": {
                  height: 24,
                  width: 24,
                  color: "var(--clr-blue-light)",
                },
                "& .MuiSlider-track": {
                  height: 10,
                  color: "var(--clr-blue-footer)",
                },
                "& .MuiSlider-rail": {
                  height: 10,
                  color: "var(--clr-gray-3)",
                },
              }}
            />
          </Box>
        </Box>

        {/* experience */}
        <Box>
          <InputLabel sx={{ py: 0.5 }}>Experience</InputLabel>
          <Box sx={{ px: 3 }}>
            <Slider
              name="experience"
              getAriaLabel={() => "experience"}
              onChange={formValueChange}
              // valueLabelDisplay="auto"
              value={form.experience}
              min={0}
              max={55}
              marks={[
                { value: 0, label: `${form.experience} Y` },
                // { value: 55, label: `₹${55} L` },
              ]}
              sx={{
                "& .MuiSlider-thumb": {
                  height: 24,
                  width: 24,
                  color: "var(--clr-blue-light)",
                },
                "& .MuiSlider-track": {
                  height: 10,
                  color: "var(--clr-blue-footer)",
                },
                "& .MuiSlider-rail": {
                  height: 10,
                  color: "var(--clr-gray-3)",
                },
              }}
            />
          </Box>
        </Box>

        {/* upload resume button  */}
        <Box>
          <Box
            sx={{
              border: "1px solid var(--clr-blue-light)",
              borderRadius: 1,
              textAlign: "center",
              py: 1,
              px: 5
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", fontWeight: "400", mb: 2, lineHeight: "24px", color: "var(--clr-secondayGray-2)", /* width: 200, mx: "auto", */ }}
            >
              Upload resume to get the full benefits of your Medlink's profile!
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: 16,
              }}
              onClick={() => fileInputRef.current.click()}
            >
              Upload Resume
            </Button>
            <input
              onChange={handleFileChange}
              multiple={false}
              ref={fileInputRef}
              type="file"
              hidden
            />
          </Box>
          <Typography
            sx={{
              m: 0.5,
              textAlign: "left",
              color: "var(--clr-gray-4)",
              fontSize: "12px",
            }}
          >
            Format: DOC, DOCx, PDF Maximum file size: 2MB
          </Typography>
        </Box>

        {/* conditons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "start",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "var(--clr-gray-2)",
            }}
          >
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            &nbsp;
            <b>Actively Searching?</b>
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "var(--clr-gray-2)",
            }}
          >
            <Checkbox
              sx={{ marginRight: "5px", display: "inline-block" }}
              type="checkbox"
              onChange={(e) => setNewsletter(e.target.checked)}
            />
            &nbsp;
            <b>Subscribe to our Newsletter</b>
          </Typography>
          <Typography
            sx={{
              color: "var(--clr-gray-1)",
              fontSize: "0.8rem",
              lineHeight: "24px"
            }}
          >
            <b>
              By clicking Register, you agree to the&nbsp;
              <Link style={{ color: "var(--clr-blue-secondary)", textDecoration: "underline" }} to="/terms-and-conditions">Terms and Conditions</Link> &
              <Link style={{ color: "var(--clr-blue-secondary)", textDecoration: "underline" }} to="/privacy-policy"> Privacy Policy</Link> of Medlinks
            </b>
          </Typography>
        </Box>
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={handleBasicDetails}
        sx={{ mt: 5, borderRadius: 16, }}
      >
        Register Now
      </Button>
      {
        infoSaved && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Congratulation! Your information has been saved.
          </Alert>
        </Snackbar>
      }
      {
        infoSaveFailed && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Operation was not successful. Try again. Please!
          </Alert>
        </Snackbar>
      }
    </SignupGrid>
  );
};

export default SignupForm;

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