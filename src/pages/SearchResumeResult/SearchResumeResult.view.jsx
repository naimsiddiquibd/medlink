import * as React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  FormControl,
  Typography,
  TextField,
  Button,
  Breadcrumbs,
  Box,
  Pagination,
  Slider,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import porfilepic from "../../assets/profilepic.svg";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import Collapse from "@mui/material/Collapse";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, Link } from "react-router-dom";
import { gqlquery } from "../../api/hospitalIndex";

const times = [
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months",
];

const SearchResumeResult = (props) => {
  const location = useLocation();
  const [date, setDate] = React.useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    experience: [0, 100],
    lastDateToApply: new Date(),
    description: "",
    ctc: [0, 40000],
  });
  const [openedItemId, setOpenedItemId] = useState(true);
  const [resultMerged, setResultMerged] = useState([]);

  const results = location?.state?.searchResume;

  const handleClick = orgEvent => {
    let clickedItemId = orgEvent.currentTarget.id;
    if (openedItemId === clickedItemId) {
      setOpenedItemId("");
    } else {
      setOpenedItemId(clickedItemId);
    }
    //setOpen(!open);
  };

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
    console.log(form);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    results?.map(result => {

      const QUERY_SEARCHRESUME = {
        query: `query MyQuery {
          getCandidateCurrentExperience (userID: "${result?.userID}") {
              currentlyWorking
              description
              designationID
              employmentType
              hospitalID
              hospital
              jobType
              noticePeriodID
              startingMonth
              startingYear
              workingMonth
              workingYear
            }
        }`
      };
      gqlquery(QUERY_SEARCHRESUME, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getCandidateCurrentExperience !== null) {
            Object.assign(result, datas?.data);
          }
        });

      const QUERY_GETCANDIDATEEDUCATION = {
        query: `query MyQuery {
          getCandidateEducation (userID: "${result?.userID}") {
            courseID
            courseName
            courseType
            eduID
            specialization
            specializationID
            title
            university
            universityID
            yearOfPassing
            }
        }`
      };
      gqlquery(QUERY_GETCANDIDATEEDUCATION, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getCandidateEducation !== null) {
            Object.assign(result, datas?.data);
          }
        });

      const QUERY_GETCANDIDATESKILLS = {
        query: `query MyQuery {
            getCandidateSkills (userID: "${result?.userID}") {
                name
                sID
                skillID
              }
          }`
      };
      gqlquery(QUERY_GETCANDIDATESKILLS, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getCandidateSkills !== null) {
            Object.assign(result, datas?.data);
            setResultMerged(result);
          }
        });

    });
  }, [results]);

  useEffect(() => {
    // console.log("00000000000000", resultMerged);
  }, [resultMerged])

  // console.log(results);
  return (
    <Container maxWidth="xl" sx={{ mb: 8 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ marginTop: "1.5%", marginBottom: "2%" }}
      >
        <Link to="/">
          Home
        </Link>
        <Link to="/jobs-and-responses">
          {"Resume Database"}
        </Link>
        <Typography color="text.primary">Search Resume</Typography>
        <Typography color="text.primary">Results</Typography>
      </Breadcrumbs>

      {/* Search Resume with any keyword and Industry wise.  */}
      <Box
        sx={{
          p: 2,
          borderRadius: "0.5rem",
          bgcolor: "#F2F2F2",
          py: 2,
          px: 3,
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          rowSpacing={3}
          columnSpacing={6}
        >
          <Grid item xs={6}>
            <InputLabel
              sx={{ color: "#6F7482", fontSize: "0.8rem" }}
              htmlFor="Any_Keywords"
            >
              Any Keywords
            </InputLabel>
            <TextField
              variant="outlined"
              name="jobTitle"
              type="text"
              placeholder="Text"
              value={form.jobTitle}
              onChange={formValueChange}
              id="Any_Keywords"
              size="small"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              sx={{ color: "#6F7482", fontSize: "0.8rem" }}
              htmlFor="Industry"
            >
              Industry
            </InputLabel>
            <TextField
              variant="outlined"
              name="location"
              type="text"
              placeholder="Text"
              value={form.location}
              onChange={formValueChange}
              id="Industry"
              fullWidth
              size="small"
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 4,
            gap: 3,
          }}
        >
          <Button
            size="medium"
            variant="contained"
            sx={{
              borderRadius: 2,
              backgroundColor: "#4F4F4F",
              color: "white",
            }}
          >
            Modify Search
          </Button>
          <Button
            size="medium"
            variant="outlined"
            sx={{
              border: "2px solid #333333",
              color: "#4F4F4F",
              borderRadius: 2,
            }}
          >
            New Search
          </Button>
          <Button
            size="large"
            variant="text"
            sx={{
              color: "#4F4F4F",
            }}
          >
            Save Search
          </Button>
        </Box>
      </Box>

      {/* Resume result and drop down container */}
      <Box sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Box
              sx={{
                diplay: "flex",
                flexDirection: "column",
                gap: 3,
                // paddingTop: "145px",
                pt: 19,
              }}
            >
              {/* keywords */}
              <Box>
                <Box
                  onClick={handleClick}
                  id="keywords"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#F2F2F2",
                    py: 1,
                    px: 3,
                    mb: 1.5,
                    borderRadius: 1,
                  }}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#333333" }}
                  >
                    Keywords
                  </Typography>
                  {openedItemId === "keywords" ? (
                    <ExpandLess
                      style={{ height: "35px", width: "40px" }}
                    />
                  ) : (
                    <ExpandMore
                      style={{ height: "35px", width: "40px" }}
                    />
                  )}
                </Box>
                <Collapse in={openedItemId === "keywords"} timeout="auto" unmountOnExit>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox /> <Typography> Full Stack Dev </Typography>
                  </Box>
                  <Checkbox />Full Stack Dev 1<br />
                  <Checkbox />Full Stack Dev 2<br />
                  <Checkbox />Full Stack Dev 3<br />

                </Collapse>
              </Box>
              {/* company */}
              <Box>
                <Box
                  onClick={handleClick}
                  id="company"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#F2F2F2",
                    py: 1,
                    px: 3,
                    mb: 1.5,
                    borderRadius: 1,
                  }}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#333333" }}
                  >
                    Company
                  </Typography>
                  {openedItemId === "company" ? (
                    <ExpandLess
                      style={{ height: "35px", width: "40px" }}
                    />
                  ) : (
                    <ExpandMore
                      style={{ height: "35px", width: "40px" }}
                    />
                  )}
                </Box>
                <Collapse in={openedItemId === "company"} timeout="auto" unmountOnExit>
                  <Box sx={{}}>
                    <FormControl sx={{}} variant="standard">
                      <Input
                        fullWidth
                        sx={{
                          px: 1, py: 0.5, width: "335px",
                          backgroundColor: "#f2f2f2",
                          border: "none",
                          borderRadius: "10px",
                        }}
                        disableUnderline
                        id="outlined-adornment-password"
                        type="text"
                        // value={values.password}
                        // onChange={handleChange("password")}
                        placeholder="Search"
                        style={{ borderBottom: "none" }}
                        endAdornment={
                          <InputAdornment position="end" style={{ outline: "none" }}>
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {/* {values.searchUser} */}
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Search User"
                      />
                    </FormControl> <br />
                    <Checkbox />Hospital Name 1 <br />
                    <Checkbox />Hospital Name 2 <br />
                    <Checkbox />Hospital Name 3 <br />
                  </Box>

                </Collapse>
              </Box>
              {/* designation */}
              <Box>
                <Box
                  onClick={handleClick}
                  id="designation"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#F2F2F2",
                    py: 1,
                    px: 3,
                    mb: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#333333" }}
                  >
                    Designation
                  </Typography>
                  {openedItemId === "designation" ? (
                    <ExpandLess
                      style={{ height: "35px", width: "40px" }}
                    />
                  ) : (
                    <ExpandMore
                      style={{ height: "35px", width: "40px" }}
                    />
                  )}
                </Box>
                <Collapse in={openedItemId === "designation"} timeout="auto" unmountOnExit>
                  <Box sx={{}}>
                    <FormControl sx={{}} variant="standard">
                      <Input
                        fullWidth
                        sx={{
                          px: 1, py: 0.5, width: "335px",
                          backgroundColor: "#f2f2f2",
                          border: "none",
                          borderRadius: "10px",
                        }}
                        disableUnderline
                        id="outlined-adornment-password"
                        type="text"
                        // value={values.password}
                        // onChange={handleChange("password")}
                        placeholder="Search"
                        style={{ borderBottom: "none" }}
                        endAdornment={
                          <InputAdornment position="end" style={{ outline: "none" }}>
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {/* {values.searchUser} */}
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Search User"
                      />
                    </FormControl> <br />

                  </Box>
                  <Checkbox /> Full Stack Dev  <br />
                  <Checkbox /> Full Stack Dev <br />
                </Collapse>
              </Box>
              {/* experience  */}
              <Box>
                <Box
                  onClick={handleClick}
                  id="experience"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#F2F2F2",
                    py: 1,
                    px: 3,
                    mb: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#333333" }}
                  >
                    Experience
                  </Typography>
                  {openedItemId === "experience" ? (
                    <ExpandLess
                      style={{ height: "35px", width: "40px" }}
                    />
                  ) : (
                    <ExpandMore
                      style={{ height: "35px", width: "40px" }}
                    />
                  )}
                </Box>
                <Collapse in={openedItemId === "experience"} timeout="auto" unmountOnExit>
                  <Box sx={{ px: 4 }}>
                    <Slider
                      name="experience"
                      getAriaLabel={() => "Experience range"}
                      onChange={formValueChange}
                      valueLabelDisplay="auto"
                      value={form.experience}
                      min={0}
                      max={100}
                      marks={[
                        { value: 0, label: "0" },
                        { value: 100, label: "100" },
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
                  </Box>
                </Collapse>
              </Box>
              {/* ctc */}
              <Box>
                <Box
                  onClick={handleClick}
                  id="ctc"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#F2F2F2",
                    py: 1,
                    px: 3,
                    mb: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#333333" }}
                  >
                    CTC
                  </Typography>
                  {openedItemId === "ctc" ? (
                    <ExpandLess
                      style={{ height: "35px", width: "40px" }}
                    />
                  ) : (
                    <ExpandMore
                      style={{ height: "35px", width: "40px" }}
                    />
                  )}
                </Box>
                <Collapse in={openedItemId === "ctc"} timeout="auto" unmountOnExit>
                  <Box sx={{ px: 4 }}>
                    <Slider
                      name="ctc"
                      getAriaLabel={() => "Salary range"}
                      onChange={formValueChange}
                      valueLabelDisplay="auto"
                      value={form.ctc}
                      min={0}
                      max={100}
                      marks={[
                        { value: 0, label: "0" },
                        { value: 100, label: "100" },
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
                  </Box>
                </Collapse>
              </Box>
              {/* functional area  */}
              <Box>
                <Box
                  onClick={handleClick}
                  id="functionalArea"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#F2F2F2",
                    py: 1,
                    px: 3,
                    mb: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#333333" }}
                  >
                    Functional Area
                  </Typography>
                  {openedItemId === "functionalArea" ? (
                    <ExpandLess
                      style={{ height: "35px", width: "40px" }}
                    />
                  ) : (
                    <ExpandMore
                      style={{ height: "35px", width: "40px" }}
                    />
                  )}
                </Box>
                <Collapse in={openedItemId === "functionalArea"} timeout="auto" unmountOnExit>
                  <Box>
                    <FormControl sx={{}} variant="standard">
                      <Input
                        fullWidth
                        sx={{
                          px: 1, py: 0.5, width: "335px",
                          backgroundColor: "#f2f2f2",
                          border: "none",
                          borderRadius: "10px",
                        }}
                        disableUnderline
                        id="outlined-adornment-password"
                        type="text"
                        // value={values.password}
                        // onChange={handleChange("password")}
                        placeholder="Search"
                        style={{ borderBottom: "none" }}
                        endAdornment={
                          <InputAdornment position="end" style={{ outline: "none" }}>
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {/* {values.searchUser} */}
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Search User"
                      />
                    </FormControl> <br />
                  </Box>
                  <Checkbox />Department Name 1 <br />
                  <Checkbox />Department Name 2 <br />
                  <Checkbox />Department Name 3 <br />
                </Collapse>
              </Box>
              {/* location   */}
              <Box>
                <Box
                  onClick={handleClick}
                  id="location"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#F2F2F2",
                    py: 1,
                    px: 3,
                    mb: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#333333" }}
                  >
                    Location
                  </Typography>
                  {openedItemId === "location" ? (
                    <ExpandLess
                      style={{ height: "35px", width: "40px" }}
                    />
                  ) : (
                    <ExpandMore
                      style={{ height: "35px", width: "40px" }}
                    />
                  )}
                </Box>
                <Collapse in={openedItemId === "location"} timeout="auto" unmountOnExit>
                  <Box sx={{}}>
                    <FormControl sx={{}} variant="standard">
                      <Input
                        fullWidth
                        sx={{
                          px: 1, py: 0.5, width: "335px",
                          backgroundColor: "#f2f2f2",
                          border: "none",
                          borderRadius: "10px",
                        }}
                        disableUnderline
                        id="outlined-adornment-password"
                        type="text"
                        // value={values.password}
                        // onChange={handleChange("password")}
                        placeholder="Search"
                        style={{ borderBottom: "none" }}
                        endAdornment={
                          <InputAdornment position="end" style={{ outline: "none" }}>
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {/* {values.searchUser} */}
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Search User"
                      />
                    </FormControl> <br />
                  </Box>
                  <Checkbox />Hospital Name 1 <br />
                  <Checkbox />Hospital Name 2 <br />
                  <Checkbox />Hospital Name 3 <br />
                </Collapse>
              </Box>
              {/* active in  */}
              <Box>
                <Box
                  onClick={handleClick}
                  id="activeIn"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#F2F2F2",
                    py: 1,
                    px: 3,
                    mb: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#333333" }}
                  >
                    Active In
                  </Typography>
                  {openedItemId === "activeIn" ? (
                    <ExpandLess
                      style={{ height: "35px", width: "40px" }}
                    />
                  ) : (
                    <ExpandMore
                      style={{ height: "35px", width: "40px" }}
                    />
                  )}
                </Box>
                <Collapse in={openedItemId === "activeIn"} timeout="auto" unmountOnExit>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "0 0 0 3%",
                  }}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel value="1" control={<Radio />} label="1 day" />
                        <FormControlLabel value="7" control={<Radio />} label="7 days" />
                        <FormControlLabel value="15" control={<Radio />} label="15 days" />
                        <FormControlLabel value="30" control={<Radio />} label="1 month" />
                        <FormControlLabel value="60" control={<Radio />} label="2 months" />
                        <FormControlLabel value="90" control={<Radio />} label="3 months" />
                        <FormControlLabel value="180" control={<Radio />} label="6 months" />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Collapse>
              </Box>
              {/* regine search  */}
              <Box sx={{ textAlign: "right" }}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#4F4F4F",
                    color: "white",
                  }}
                >
                  Refine Search
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      fontSize: "12px",
                      color: "#6F7482",
                    }}
                  >
                    Result Found
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      // fontSize: "12px",
                      color: "#3B4256",
                    }}
                  >
                    {results?.length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box>
                    <InputLabel htmlFor="active">Active In</InputLabel>
                    <FormControl
                      id="active"
                      size="small"
                      sx={{ minWidth: 200 }}
                    >
                      <Select value={date} onChange={handleDateChange}>
                        {times.map((time) => (
                          <MenuItem value={time} key={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <InputLabel htmlFor="show">Show</InputLabel>
                    <FormControl id="show" size="small" sx={{ minWidth: 200 }}>
                      <Select value={date} onChange={handleDateChange}>
                        {times.map((time) => (
                          <MenuItem value={time} key={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      sx={{
                        color: "#333333",
                        fontSize: "18px",
                      }}
                      control={<Checkbox defaultChecked />}
                      label="Select All"
                    />
                  </FormGroup>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box>
                    <FormControl
                      size="small"
                      sx={{
                        minWidth: 150,
                        bgcolor: "#E0E0E0",
                        border: "none",
                      }}
                    >
                      <Select value={date} onChange={handleDateChange}>
                        {times.map((time) => (
                          <MenuItem value={time} key={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      size="small"
                      sx={{
                        minWidth: 130,
                        bgcolor: "#E0E0E0",
                        border: "none",
                      }}
                    >
                      <Select value={date} onChange={handleDateChange}>
                        {times.map((time) => (
                          <MenuItem value={time} key={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      size="small"
                      sx={{
                        minWidth: 160,
                        bgcolor: "#E0E0E0",
                        border: "none",
                      }}
                    >
                      <Select value={date} onChange={handleDateChange}>
                        {times.map((time) => (
                          <MenuItem value={time} key={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Applicant list container */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                pt: 1,
              }}
            >
              {results
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => (
                  <Link to={`/applicants-detail/${row?.userID}`} state={{ userID: row?.userID }}>
                    <Grid
                      sx={{
                        bgcolor: "#F2F2F2",
                        borderRadius: 1,
                      }}
                      container
                      spacing={1}
                    >
                      <Grid sx={{ textAlign: "center" }} item xs={1}>
                        <FormControl
                        // onClick={handleChackbox}
                        >
                          <Checkbox />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <Box sx={{ p: 2 }}>
                          <img src={porfilepic} alt="Applicant_avater" />
                        </Box>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#333333", pb: 1 }}
                        >
                          {row?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "#333333",
                            pb: 1,
                          }}
                        >
                          <PhoneIphoneTwoToneIcon fontSize="medium" />
                          {row?.phone}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "#333333",
                            py: 1,
                          }}
                        >
                          <MailTwoToneIcon fontSize="medium" />
                          {row?.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "#333333",
                            py: 1,
                          }}
                        >
                          <LocationOnTwoToneIcon fontSize="medium" />
                          {row?.city}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "#333333",
                            py: 1,
                          }}
                        >
                          <WorkTwoToneIcon fontSize="medium" />
                          {row?.exp} years
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "#333333",
                            py: 1,
                            mb: 2,
                          }}
                        >
                          <AccountBalanceWalletTwoToneIcon fontSize="medium" />
                          {(row?.salary / 100000)?.toFixed(0)} Lakhs
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Box
                          sx={{
                            px: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            pt: 1,
                            pb: 1,
                          }}
                        >
                          <Box>
                            <Typography
                              variant="caption"
                              display="block"
                              sx={{
                                color: "#6F7482",
                                fontWeight: "600",
                              }}
                            >
                              Current
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#3B4256",
                              }}
                            >
                              {row?.getCandidateCurrentExperience?.hospital}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="caption"
                              display="block"
                              sx={{
                                color: "#6F7482",
                                fontWeight: "600",
                              }}
                            >
                              Education
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#3B4256",
                              }}
                            >
                              {row?.getCandidateEducation?.map((edu) => (
                                <span style={{ fontWeight: "lighter" }}> {edu?.courseName} in {edu?.specialization} from {edu?.university}, </span>
                              ))}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="caption"
                              display="block"
                              sx={{
                                color: "#6F7482",
                                fontWeight: "600",
                              }}
                            >
                              Preferred Location
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#3B4256",
                              }}
                            >
                              {"Hyderabad"}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="p"
                              component="div"
                              sx={{
                                color: "#333333",
                                pb: 0,
                                fontWeight: 400,
                              }}
                            >
                              Key Skills
                            </Typography>
                            <Box
                              sx={{
                                diplay: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                              }}
                            >
                              {row?.getCandidateSkills?.map((skill) => (
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: "#333333",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    display: "inline-block",
                                    pr: 2,
                                    py: 0.5,
                                  }}
                                >
                                  {skill?.name}
                                </Typography>
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                  </Link>
                ))}
            </Box>

            {/* Pagination */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pt: 2,
              }}
            >
              <Box>
                <Pagination
                  variant="outlined"
                  count={5}
                  shape="rounded"
                  component="div"
                  page={page}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  onChangePage={handleChangePage}
                />
              </Box>
            </Box>
          </Grid>
        </Grid >
      </Box >
    </Container >
  );
};

export default SearchResumeResult;
