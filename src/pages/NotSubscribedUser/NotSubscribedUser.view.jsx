import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,

} from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {

    InputAdornment,
    MenuItem,
    Pagination,
    Select,
  } from "@mui/material";
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
  import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { useLocation } from "react-router-dom";
import { gqlquery } from "../../api";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });




  const values = ["column", "Grid", "Flex"];
  
  const SearchButton = styled(Button)(() => ({
    color: "var(--clr-white) !important",
  }));

const NotSubscribedUser = () => {


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
        <>
        <Container maxWidth="lg" sx={{ mx: "auto", pb: 5 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ marginTop: "1%" }}
      >
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/">
          Resume database
        </Link>
        <Link underline="hover" color="inherit" href="/Search Resume">
          Search Resume
        </Link>
        <Link underline="hover" color="inherit" href="/">
          Results
        </Link>
      </Breadcrumbs>
      <Container 
        
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          my: 2,
        }}
      >
          <Box sx={{
            bgcolor: "#FFFFFF",
            px: "15px",
            py: "15px",
            borderRadius: 2,
            boxShadow: 1,
   
          }}>
        
          <Grid container spacing={4} sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Grid item>
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Any Keywords
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            style = {{width: "500px"}}
                                           
                                            type="text"
                                            placeholder="Text"
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        />
                                        
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl fullWidth>
                                        <Typography
                                            variant="p"
                                            sx={{ textAlign: "left" }}
                                        >
                                            Industry
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            style = {{width: "500px"}}
                                            
                                            type="text"
                                            placeholder="Text"
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "6px",
                                            }}
                                        />
                                        
                                    </FormControl>
                                </Grid>
                        </Grid>
                        <Grid container spacing={4} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid item>
                                <Button
                                    sx={{ px: 1.6, py: 1, mt: 3, color: "#5A98F2", borderRadius: 16, fontWeight: 600 }}
                                    variant="contained"
                                    component={Link}
                                    to="/login"
                                    className="hospital-login-btn"
                                >
                                    Modify Search
                                </Button>

                                <Button
                                    variant="outlined"
                                   
                                    sx={{ px: 1.6, py: 1, ml: "20px", mt: 3, color: "#5A98F2", borderRadius: 16, fontWeight: 600 }}
                                >
                                    Know more
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                   
                                    sx={{ px: 1.6, py: 1, ml: "20px", mt: 3, color: "#5A98F2", borderRadius: 16, fontWeight: 600 }}
                                >
                                    Save Search
                                </Button>
                            </Grid>
                        </Grid>  
                        </Box>      
      </Container>
    </Container>
    
   

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



    <Box sx={{ px: 8, py: 4, mt: 5 }}>
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Box
          sx={{
            diplay: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              bgcolor: "#E0E0E0",
              py: 1,
              px: 3,
              mb: 1.5,
              gap: 2,
              borderRadius: 2,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <FilterAltTwoToneIcon sx={{ color: "#323232" }} />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                color: "#333333",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              All Filters
            </Typography>
          </Box>
          <Box
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
          </Box>
          <Box
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
              sx={{
                fontSize: "18px",
                color: "#333333",
              }}
            >
              Salary
            </Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              sx={{
                height: "35px",
                width: "40px",
                color: "#323232",
              }}
            />
          </Box>
          <Box
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
              sx={{
                fontSize: "18px",
                color: "#333333",
              }}
            >
              Experience
            </Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              sx={{
                height: "35px",
                width: "40px",
                color: "#323232",
              }}
            />
          </Box>
          <Box
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
              sx={{
                fontSize: "18px",
                color: "#333333",
              }}
            >
              Job Type
            </Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              sx={{
                height: "35px",
                width: "40px",
                color: "#323232",
              }}
            />
          </Box>
          <Box
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
              sx={{
                fontSize: "18px",
                color: "#333333",
              }}
            >
              Education
            </Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              sx={{
                height: "35px",
                width: "40px",
                color: "#323232",
              }}
            />
          </Box>
          <Box
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
              sx={{
                fontSize: "18px",
                color: "#333333",
              }}
            >
              Hospitals
            </Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              sx={{
                height: "35px",
                width: "40px",
                color: "#323232",
              }}
            />
          </Box>
        </Box>




      </Grid>


      <Grid item xs={9}>
        

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          
          <Paper
      sx={{
        p: 2,
        
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
      <Grid item>
            <Checkbox {...label} />
          </Grid>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="https://images.unsplash.com/photo-1653999291403-5cd1597b34ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container sx={{ml: 5}}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
            
        </Box>
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
  </>
    );
};

export default NotSubscribedUser;