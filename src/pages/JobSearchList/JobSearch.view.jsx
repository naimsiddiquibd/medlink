import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit"; 
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder'; 
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link, useLocation } from "react-router-dom";
import { gqlquery } from "../../api";
import styled from "@emotion/styled";
import bgImg from "../../assets/search-job-bg.jpg";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import { blue } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};


const values = ["column", "Grid", "Flex"];

const SearchButton = styled(Button)(() => ({
  color: "var(--clr-white) !important",
}));

const JobSearchList = () => {
  const location = useLocation();
  const [flag, setFlag] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchJobsQueryInfo, setSearchJobsItemsQueryInfo] = useState({});
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  const [searchResultsPerPage, setSearchResultsPerPage] = useState(10);
  const [jobsSearchInfo, setJobsSearchInfo] = useState({
    jobTitle: "",
    location: "",
  });

  const handleChange = (prop) => (event) => {
    setJobsSearchInfo({ ...jobsSearchInfo, [prop]: event.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    setFlag((prevData) => !prevData);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeSearchResultsPerPage = (event) => {
    setSearchResultsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSearchQueryData = () => {
    searchJobsQueryInfo.jobTitle = location?.state?.jobTitle;
    searchJobsQueryInfo.location = location?.state?.location;
    jobsSearchInfo.jobTitle = location?.state?.jobTitle;
    jobsSearchInfo.location = location?.state?.location;
  };

  useEffect(() => {
    const QUERY_SEARCHJOBS = {
      query: `query MyQuery {
                  searchJobs(location: "${location?.state?.location}",
                   title: "${location?.state?.jobTitle}") 
                   {
                  jobTitle
                  qualification
                  secondarySpecialization
                  description
                  maximumSalary
                  minimumSalary
                  postedOn
                  location
                  primarySpecialization
                  experience
                  vacancyID
                  savedJob
                  }
                  }
                `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_SEARCHJOBS, null)
      .then((res) => res.json())
      .then((data) => setSearchResults(data?.data?.searchJobs));
    getSearchQueryData();
  }, []);

  const handleJobsSearch = () => {
    const QUERY_SEARCHJOBS = {
      query: `query MyQuery {
                      searchJobs(location: "${jobsSearchInfo?.location}",
                       title: "${jobsSearchInfo?.jobTitle}") 
                       {
                            jobTitle
                            qualification
                            secondarySpecialization
                            description
                            maximumSalary
                            minimumSalary
                            postedOn
                            location
                            primarySpecialization
                            experience
                            vacancyID
                            savedJob
                        }
                      }
                    `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlquery(QUERY_SEARCHJOBS, null)
      .then((res) => res.json())
      .then((data) => setSearchResults(data?.data?.searchJobs))
    setFlag((prevData) => !prevData);
  };
  if (searchResults?.length) {
    searchJobsQueryInfo.jobTitle = searchResults[0]?.jobTitle;
    searchJobsQueryInfo.location = searchResults[0]?.location;
    if (jobsSearchInfo?.location === "") {
      searchJobsQueryInfo.location = jobsSearchInfo?.location
    }
  }


  const newSearchResults = searchResults?.map((searchResult) => {
    const date_diff_indays = function () {
      const dt1 = new Date(searchResult?.postedOn);
      const dt2 = new Date();
      const days = Math?.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
      );
      const month = Math.floor(days / 30);
      const day = days % 30;
      if (days >= 30) {
        return {
          month,
          day,
        };
      }
      return {
        days,
      };
    };

    return {
      date_diff_indays,
      jobTitle: searchResult?.jobTitle,
      qualification: searchResult?.qualification,
      secondarySpecialization: searchResult?.secondarySpecialization,
      description: searchResult?.description,
      maximumSalary: searchResult?.maximumSalary,
      minimumSalary: searchResult?.minimumSalary,
      location: searchResult?.location,
      postedOn: searchResult?.postedOn,
      primarySpecialization: searchResult?.primarySpecialization,
      experience: searchResult?.experience,
      vacancyID: searchResult?.vacancyID,
    };
  });

 
  return (
    <Box>

      {/* Header */}
      <Box sx={{ background: `url(${bgImg})`, px: 8, py: 4, display: { xs: "none", sm: "block"} }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!flag ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    color: "#ffff",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  Showing jobs for '{searchJobsQueryInfo?.jobTitle},{" "}
                  {searchJobsQueryInfo?.location}'
                </Typography>
                <EditIcon
                  onClick={onClick}
                  sx={{ color: "#ffff", fontSize: "16px" }}
                />
              </Box>
            </>
          ) : (
            <>
              <div style={{ display: "flex" }}>
                <>
                  <TextField
                    name="jobTitle"
                    defaultValue={searchJobsQueryInfo?.jobTitle}
                    onChange={handleChange("jobTitle")}
                    placeholder="Job Title"
                    sx={{
                      backgroundColor: "white",
                      width: "95%",
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                      zIndex: "1",
                      "& .MuiInputBase-input": { height: 31 },
                    }}
                  />

                  <TextField
                    name="location"
                    defaultValue={searchJobsQueryInfo?.location}
                    placeholder="Location"
                    onChange={handleChange("location")}
                    sx={{
                      backgroundColor: "white",
                      size: "large",
                      width: "105%",
                      borderTopRightRadius: "7px",
                      borderBottomRightRadius: "7px",
                      zIndex: "1",
                      "& .MuiInputBase-input": { height: 31 },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchButton
                            onClick={handleJobsSearch}
                            color="primary"
                            edge="end"
                            size="large"
                            sx={{
                              backgroundColor: "blue",
                              color: "white",
                              borderRadius: "5px",
                              width: 110,
                            }}
                          >
                            Search
                          </SearchButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              </div>
            </>
          )}

          <Box>
            <Button
              size="medium"
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "#4F4F4F",
                color: "white",
              }}
            >
              Save as Alert
            </Button>
          </Box>
        </Box>
      </Box>
      {/* End Header */}

      {/* Header Mobile */}
      <Box sx={{ px: 1, py: 1, display: { xs: "block", sm: "none"} }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
          }}
        >
          {!flag ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  mt: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    color: "#333333",
                    ml: 2,
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Showing jobs for '{searchJobsQueryInfo?.jobTitle},{" "}
                  {searchJobsQueryInfo?.location}'
                </Typography>
                <EditIcon
                  onClick={onClick}
                  sx={{ color: "#5A98F2", fontSize: "12px" }}
                />
              </Box>
            </>
          ) : (
            <>
              <div style={{ display: "flex" }}>
                <>
                  <TextField
                    name="jobTitle"
                    defaultValue={searchJobsQueryInfo?.jobTitle}
                    onChange={handleChange("jobTitle")}
                    placeholder="Job Title"
                    sx={{
                      backgroundColor: "white",
                      width: "95%",
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                      zIndex: "1",
                      "& .MuiInputBase-input": { height: 31 },
                    }}
                  />

                  <TextField
                    name="location"
                    defaultValue={searchJobsQueryInfo?.location}
                    placeholder="Location"
                    onChange={handleChange("location")}
                    sx={{
                      backgroundColor: "white",
                      size: "large",
                      width: "105%",
                      borderTopRightRadius: "7px",
                      borderBottomRightRadius: "7px",
                      zIndex: "1",
                      "& .MuiInputBase-input": { height: 31 },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchButton
                            onClick={handleJobsSearch}
                            color="primary"
                            edge="end"
                            size="large"
                            sx={{
                              backgroundColor: "blue",
                              color: "white",
                              borderRadius: "5px",
                              width: 110,
                            }}
                          >
                            Search
                          </SearchButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              </div>
            </>
          )}

          <Box>
            <Button
              size="medium"
              variant="contained"
              sx={{
                borderRadius: "20px",
                ml: 2,
                mt: 2,
                backgroundColor: "#4F4F4F",
                color: "white",
              }}
            >
              Save as Alert
            </Button>
          </Box>
        </Box>
      </Box>
      {/* End Header Mobile */}

      <Box sx={{ px: 3, py: 2 }}>
        <Grid container spacing={3}>

          {/* Filter component */}
          <Grid item xs={3}>
            <Box
              sx={{
                flexDirection: "column",
                gap: 3,
                display: { xs: "none", sm: "block"}
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  bgcolor: "#E4EEF5",
                  py: 1,
                  px: 3,
                  mb: 1.5,
                  gap: 2,
                  borderRadius: 2,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <FilterAltTwoToneIcon sx={{ color: "#395987" }} />
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    color: "#395987",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  All Filters
                </Typography>
              </Box>
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "#FFFFFF",
                  border: 1,
                  borderColor: "#E4EEF5",
                  py: 1,
                  px: 3,
                  mb: 1.5,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "18px",
                    color: "#333333",
                  }}
                >
                  Location
                </Typography>
                <ExpandMore
                  // onClick={handleAdvSearch}
                  sx={{
                    height: "35px",
                    width: "40px",
                    color: "#323232",
                  }}
                />
                
              </Box> */}
              <div>
      <Accordion sx={{mt: 1.6, border: 1,
                  borderColor: "#E4EEF5",}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{
            height: "35px",
            width: "40px",
            color: "#323232",
            mr: 1,
          }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="body1"
                  sx={{
                    fontSize: "18px",
                    color: "#333333",
                    ml: 1,
                  }}>Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem>
      <Checkbox
        {...label}
        sx={{
          color: blue[100],
          '&.Mui-checked': {
            color: blue[100],
          },
        }}
      /><ListItemText sx={{ml: 1}} primary="Bengaluru" />
      </ListItem>
      <Divider />
      <ListItem divider>
      <Checkbox
        {...label}
        sx={{
          color: blue[100],
          '&.Mui-checked': {
            color: blue[100],
          },
        }}
      /><ListItemText sx={{ml: 1}} primary="Chennai" />
      </ListItem>
      <ListItem>
      <Checkbox
        {...label}
        sx={{
          color: blue[100],
          '&.Mui-checked': {
            color: blue[100],
          },
        }}
      /><ListItemText sx={{ml: 1}} primary="Mumbai" />
      </ListItem>
      <Divider light />
      <ListItem>
      <Checkbox
        {...label}
        sx={{
          color: blue[100],
          '&.Mui-checked': {
            color: blue[100],
          },
        }}
      /><ListItemText sx={{ml: 1}} primary="Pune" />
      </ListItem>
    </List>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{mt: 1.6, border: 1,
                  borderColor: "#E4EEF5",}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{
            height: "35px",
            width: "40px",
            color: "#323232",
            mr: 1,
          }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="body1"
                  sx={{
                    fontSize: "18px",
                    color: "#333333",
                    ml: 1,
                  }}>Salary</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{mt: 1.6, border: 1,
                  borderColor: "#E4EEF5",}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{
            height: "35px",
            width: "40px",
            color: "#323232",
            mr: 1,
          }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="body1"
                  sx={{
                    fontSize: "18px",
                    color: "#333333",
                    ml: 1,
                  }}>Experience</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack spacing={1} direction="column" fullWidth>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        
      </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{mt: 1.6, border: 1,
                  borderColor: "#E4EEF5",}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{
            height: "35px",
            width: "40px",
            color: "#323232",
            mr: 1,
          }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="body1"
                  sx={{
                    fontSize: "18px",
                    color: "#333333",
                    ml: 1,
                  }}>Job Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack spacing={1} direction="column" fullWidth>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        
      </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{mt: 1.6, border: 1,
                  borderColor: "#E4EEF5",}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{
            height: "35px",
            width: "40px",
            color: "#323232",
            mr: 1,
          }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="body1"
                  sx={{
                    fontSize: "18px",
                    color: "#333333",
                    ml: 1,
                  }}>Education</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack spacing={1} direction="column" fullWidth>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        
      </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{mt: 1.6, border: 1,
                  borderColor: "#E4EEF5",}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{
            height: "35px",
            width: "40px",
            color: "#323232",
            mr: 1,
          }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="body1"
                  sx={{
                    fontSize: "18px",
                    color: "#333333",
                    ml: 1,
                  }}>Hospital</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack spacing={1} direction="column" fullWidth>
        <Button fullWidth variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        <Button variant="outlined">Text</Button>
        
      </Stack>
        </AccordionDetails>
      </Accordion>
      
    </div>
             
            </Box>
          </Grid>
          {/* End Filter */}


        {/* Search Result */}
          <Grid item xs={12} sm={9}>



              <Grid container>
                  <Grid item xs={12} sm={10.4} lg={10.4}>
                      <Typography variant="body2" sx={{ color: "#828282", mt: 2, }}>
                      1 - 20 of {searchResults?.length} {searchJobsQueryInfo?.jobTitle}{" "}
                      Jobs In {searchJobsQueryInfo?.location}
                      </Typography>
                  </Grid>
                  <Grid item xs={12} sm={1.6} lg={1.6}>
                        <FormControl
                      size="small"
                      sx={{
                        minWidth: 130,
                        bgcolor: "#E4EEF5",
                        border: "none",
                        outline: "none",
                        mt: 2,
                      }}
                      style={{
                        border:"none",
                        outline:"none",
                      }}
                    >
                  
                      <Select displayEmpty value={sort} onChange={handleSortChange} >
                        <MenuItem disabled value="">
                          <b>Sort By</b>
                        </MenuItem>
                        {values?.map((value) => (
                          <MenuItem value={value} key={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
              </Grid>

{/* Search Result */}
            <Box

              sx={{
                display: { xs: "none", sm: "block"},
                flexDirection: "column",
                gap: 3,
              }}
            >
              {newSearchResults
                ?.slice(
                  page * searchResultsPerPage,
                  page * searchResultsPerPage + searchResultsPerPage
                )
                ?.map((searchResult) => (

<>
<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
    
        </Grid>
        <Grid item xs={4}>
   
        </Grid>
        <Grid item xs={4}>
   
        </Grid>
        <Grid item xs={8}>
     
        </Grid>
      </Grid>
    </Box>
                  <Box
                    key={searchResult.id}
                    sx={{
                      bgcolor: "#FFFFFF",
                      borderRadius: 3,
                      p: 2.5,
                      border: 1,
                      borderColor: "#E4EEF5",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        color: "#395987",
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      <Link to={`/job-search-list/${searchResult?.vacancyID}`}>
                        {searchResult?.jobTitle}
                      </Link>
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{
                        color: "#333333",
                        fontWeight: "600",
                      }}
                    >
                      {/* {searchResult.hospitalName} */}
                      Hospital / Consultant name Here
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        pr: 2,
                      }}
                    >
                      <DescriptionTwoToneIcon
                        fontSize="small"
                        sx={{ color: "#C7D3E3" }}
                      />
                      <Typography
                        component="div"
                        sx={{ color: "#4F4F4F" }}
                        variant="body1"
                      >
                        {searchResult?.description}
                      </Typography>
                    </Box>
                    <Box
                      
                    >
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          color: "#333333",
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "16px",
                        }}
                      >
                        Key Skills
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        {/* {searchResult.skills.map((skill) => ( */}
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{
                            lineHeight: "16px",
                            color: "#333333",
                            fontWeight: "600",
                          }}
                        >
                          {searchResult?.primarySpecialization}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{
                            lineHeight: "16px",
                            color: "#333333",
                            fontWeight: "600",
                          }}
                        >
                          {searchResult?.secondarySpecialization}
                        </Typography>
                        {/* ))}  */}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          pr: 2,
                        }}
                      >
                        <LocationOnTwoToneIcon
                          fontSize="small"
                          sx={{ color: "#C7D3E3" }}
                        />
                        <Typography
                          component="div"
                          sx={{ color: "#4F4F4F" }}
                          variant="body1"
                        >
                          {searchResult?.location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          pr: 2,
                        }}
                      >
                        <WorkTwoToneIcon
                          fontSize="small"
                          sx={{ color: "#C7D3E3" }}
                        />
                        <Typography
                          component="div"
                          sx={{ color: "#4F4F4F" }}
                          variant="body1"
                        >
                          {searchResult?.experience}{" "}
                          {searchResult?.experience === 1 ? "Year" : "Years"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          pr: 2,
                        }}
                      >
                        <AccountBalanceWalletTwoToneIcon
                          fontSize="small"
                          sx={{ color: "#C7D3E3" }}
                        />
                        <Typography
                          component="div"
                          sx={{ color: "#4F4F4F" }}
                          variant="body1"
                        >
                          {searchResult?.maximumSalary} {"INR"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Box>
                        <Box sx={{
                          width: "max-content",
                          display: "flex",
                          alignItems: "center",
                          bgcolor: "#E4EEF5",
                          gap: 1,
                          px: "10px",
                          py: "4px",
                          borderRadius: 5,
                        }}>
                          <AccessTimeOutlinedIcon
                            fontSize="small"
                            sx={{ color: "#C7D3E3" }}
                          />
                          <Typography
                            component="div"
                            sx={{ color: "#395987" }}
                            variant="body1"
                          >
                            {searchResult?.date_diff_indays()?.month ? (
                              <>
                                {searchResult?.date_diff_indays()?.month}{" "}
                                {searchResult?.date_diff_indays()?.month === 1
                                  ? "month"
                                  : "months"}{" "}
                                {searchResult?.date_diff_indays()?.day ? (
                                  <>
                                    {searchResult?.date_diff_indays()?.day}{" "}
                                    {searchResult?.date_diff_indays()?.day === 1
                                      ? "day"
                                      : "days"}{" "}
                                    {"ago"}
                                  </>
                                ) : (
                                  <> {"ago"}</>
                                )}
                              </>
                            ) : (
                              <>
                                {searchResult?.date_diff_indays()?.days}{" "}
                                {searchResult?.date_diff_indays()?.days === 1
                                  ? "day"
                                  : "days"}{" "}
                                {"ago"}
                              </>
                            )}

                            {/* {searchResult.postedOn} */}
                          </Typography>
                        </Box>

                      </Box>
                      <Box>
                      {
                          searchResult?.savedJob ? (<Button /* onClick={handleSaveJob} */ disabled sx={{ width: "max-content", bgcolor: "#E0E0E0", gap: 1 }}><StarIcon fontSize="small" /> Saved </Button>) : (<Button /* onClick={() => handleDeleteSavedJobs(row?.vacancyID)} */ diababled sx={{  width: "max-content", borderRadius: 5, bgcolor: "#FFFFFF", gap: 1, border: 1,
                          borderColor: "#E4EEF5", }}><StarBorderIcon fontSize="small" /> Save Job </Button>)
                        }
                        
                       
                      </Box>
                    </Box>
                  </Box>
</>
                  
                ))}
            </Box>
{/* End Search Result */}

{/* Search Result Mobile */}
<Box

sx={{
  display: { xs: "block", sm: "none"},
  flexDirection: "column",
  gap: 3,
}}
>
{newSearchResults
  ?.slice(
    page * searchResultsPerPage,
    page * searchResultsPerPage + searchResultsPerPage
  )
  ?.map((searchResult) => (

<>
<Box sx={{ flexGrow: 1 }}>
<Grid container spacing={2}>
<Grid item xs={8}>

</Grid>
<Grid item xs={4}>

</Grid>
<Grid item xs={4}>

</Grid>
<Grid item xs={8}>

</Grid>
</Grid>
</Box>
    <Box
      key={searchResult.id}
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: 3,
        p: 2.5,
        border: 1,
        borderColor: "#E4EEF5",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        component="div"
        sx={{
          color: "#395987",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        <Link to={`/job-search-list/${searchResult?.vacancyID}`}>
          {searchResult?.jobTitle}
        </Link>
      </Typography>
      <Typography
        variant="subtitle2"
        component="div"
        sx={{
          color: "#333333",
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        {/* {searchResult.hospitalName} */}
        Hospital / Consultant name Here
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          pr: 2,
        }}
      >
        <DescriptionTwoToneIcon
          fontSize="small"
          sx={{ color: "#C7D3E3" }}
        />
        <Typography
          component="div"
          sx={{ color: "#4F4F4F", fontSize: "18px", }}
          variant="body1"
        >
          {searchResult?.description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            color: "#333333",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "16px",
          }}
        >
          Key Skills
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* {searchResult.skills.map((skill) => ( */}
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              lineHeight: "16px",
              color: "#333333",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {searchResult?.primarySpecialization}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              lineHeight: "16px",
              color: "#333333",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {searchResult?.secondarySpecialization}
          </Typography>
          {/* ))}  */}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pr: 2,
          }}
        >
          <LocationOnTwoToneIcon
            fontSize="small"
            sx={{ color: "#C7D3E3" }}
          />
          <Typography
            component="div"
            sx={{ color: "#4F4F4F", fontSize: "16px", }}
            variant="body1"
          >
            {searchResult?.location}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pr: 2,
          }}
        >
          <WorkTwoToneIcon
            fontSize="small"
            sx={{ color: "#C7D3E3" }}
          />
          <Typography
            component="div"
            sx={{ color: "#4F4F4F" }}
            variant="body1"
          >
            {searchResult?.experience}{" "}
            {searchResult?.experience === 1 ? "Year" : "Years"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pr: 2,
          }}
        >
          <AccountBalanceWalletTwoToneIcon
            fontSize="small"
            sx={{ color: "#C7D3E3" }}
          />
          <Typography
            component="div"
            sx={{ color: "#4F4F4F" }}
            variant="body1"
          >
            {searchResult?.maximumSalary} {"INR"}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box sx={{
            width: "max-content",
            display: "flex",
            alignItems: "center",
            bgcolor: "#E4EEF5",
            gap: 1,
            px: "10px",
            py: "4px",
            borderRadius: 5,
          }}>
            <AccessTimeOutlinedIcon
              fontSize="14px"
              sx={{ color: "#C7D3E3" }}
            />
            <Typography
              component="div"
              sx={{ color: "#395987", fontSize: "12px" }}
              variant="body1"
            >
              {searchResult?.date_diff_indays()?.month ? (
                <>
                  {searchResult?.date_diff_indays()?.month}{" "}
                  {searchResult?.date_diff_indays()?.month === 1
                    ? "month"
                    : "months"}{" "}
                  {searchResult?.date_diff_indays()?.day ? (
                    <>
                      {searchResult?.date_diff_indays()?.day}{" "}
                      {searchResult?.date_diff_indays()?.day === 1
                        ? "day"
                        : "days"}{" "}
                      {"ago"}
                    </>
                  ) : (
                    <> {"ago"}</>
                  )}
                </>
              ) : (
                <>
                  {searchResult?.date_diff_indays()?.days}{" "}
                  {searchResult?.date_diff_indays()?.days === 1
                    ? "day"
                    : "days"}{" "}
                  {"ago"}
                </>
              )}

              {/* {searchResult.postedOn} */}
            </Typography>
          </Box>

        </Box>
        <Box>
        {
            searchResult?.savedJob ? (<Button /* onClick={handleSaveJob} */ disabled sx={{ width: "max-content", fontSize: "12px", bgcolor: "#E0E0E0", gap: 1 }}><StarIcon fontSize="14px" /> Saved </Button>) : (<Button /* onClick={() => handleDeleteSavedJobs(row?.vacancyID)} */ diababled sx={{  width: "max-content", fontSize: "12px", borderRadius: 5, bgcolor: "#FFFFFF", gap: 1, border: 1,
            borderColor: "#E4EEF5", }}><StarBorderIcon fontSize="14px" /> Save Job </Button>)
          }
          
         
        </Box>
      </Box>
    </Box>
</>
    
  ))}
</Box>
{/* End Search Result */}

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
                  count={1}
                  shape="rounded"
                  component="div"
                  page={page}
                  onChangeRowsPerPage={handleChangeSearchResultsPerPage}
                  onChangePage={handleChangePage}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default JobSearchList;
