import {
    Box,
    Button,
    Container,
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
  import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
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
  import banner from '../../../src/assets/banner.png';
  import logo from '../../../src/assets/LifeStanceLogo.png';

  // Slider
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];


  
  const values = ["column", "Grid", "Flex"];
  
  const SearchButton = styled(Button)(() => ({
    color: "var(--clr-white) !important",
  }));
  
  const FeaturedHospital = () => {

    // Slider
    const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
    // Slider

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
      const QUERY_SAVEDJOBS = {
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
  
      gqlquery(QUERY_SAVEDJOBS, null)
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
  
  
    // console.log(searchResults);
  
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
  
    console.log(jobsSearchInfo)
    return (
      <>
      
      <Box>
        <Box sx={{ pt: 10, maxWidth: 1180, ml:"auto" }}>
        
                <Grid container  spacing={2} justify = "right" alignItems = "center" sx={{ alighItems: 'center' }}>
                    <Grid sx={{ alighItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'absolute',
                  left: '0px',
                  width: '460px',
                  height: '600px',
                  background: 'linear-gradient(208.18deg, #67C3F3 9.05%, #5A98F2 76.74%)',
                  zIndex:'-1',
               }}></Grid>

                    <Grid item xs={12} sm={12} md={1} lg={1}>
                    <Box>
                       <MobileStepper
                            variant="progress"
                            steps={6}
                            position="static"
                            activeStep={activeStep}
                            sx={{ maxWidth: 400, marginLeft: -15, backgroundColor: 'none', background: 'none', flexGrow: 1, transform: 'translateX(-10%) translateY(-50%) rotate(-90deg)'}}
                            nextButton={
                              <Button sx={{ TextColor: 'white' }} size="small" onClick={handleNext} disabled={activeStep === 5}>
                                05
                                {theme.direction === 'rtl' ? (
                                  <KeyboardArrowLeft />
                                ) : (
                                  <KeyboardArrowRight />
                                )}
                              </Button>
                            }
                            backButton={
                              <Button sx={{ TextColor: 'white' }} size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                  <KeyboardArrowRight />
                                ) : (
                                  <KeyboardArrowLeft />
                                )}
                                01
                              </Button>
                            }
                          />
                       </Box>
                    </Grid>
                      
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                          {/* Slider */}
                          <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                          
                          <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                          >
                            {images.map((step, index) => (
                              <div key={step.label}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                  <Box
                                    component="img"
                                    sx={{
                                      height: 432,
                                      display: 'block',
                                      maxWidth: 432,
                                      overflow: 'hidden',
                                      width: '100%',
                                    }}
                                    src={step.imgPath}
                                    alt={step.label}
                                  />
                                ) : null}
                              </div>
                            ))}
                          </AutoPlaySwipeableViews>
                          
                          
                        </Box>
                          {/* Slider */}
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{pr: 2}}>
                        <Typography variant="h4" sx={{ fontWeight: 400, fontSize: 24, mb: 4 }}>
                        <img src={logo} alt="" width="200px" height="44px"/>
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 400, fontSize: 24 }}>
                        Hospital Name
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 2, my: 3, fontSize: 14 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet massa quam ornare laoreet nisl, nunc. Pellentesque vitae gravida et dignissim sit commodo dignissim molestie. Praesent tellus fames diam at. Feugiat ullamcorper tristique nunc tincidunt enim. Pellentesque vitae ac pulvinar eu viverra rhoncus elementum nunc, massa.
                        <br></br>
                        Interdum posuere libero ut purus at volutpat, placerat. Vitae, semper malesuada etiam malesuada a proin tincidunt. Eget cras tristique vitae tincidunt vestibulum, diam, fames lobortis a. Sit vulputate elementum, facilisis ornare. Libero in donec sit turpis. Mauris vulputate egestas ac leo. Sem ut nulla feugiat arcu malesuada nisl. Sollicitudin dui semper metus aliquet vel.
                        </Typography>
                        <Button variant="contained">View Jobs</Button>
                        <Button sx={{ ml: 2 }} variant="text" startIcon={<PlayCircleFilledIcon />}>Watch video</Button>
                    </Grid>
                    
                </Grid>
            </Box>
            
        <Box sx={{ px: 8, py: 4,mt:15 }}>
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
                
                    <Box
                      key={1}
                      sx={{
                        bgcolor: "#F2F2F2",
                        borderRadius: 3,
                        p: 2.5,
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
                          color: "#333333",
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        <Link to={`/job-search-list/`}>
                            Job Title here
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
                          sx={{ color: "#323232" }}
                        />
                        <Typography
                          component="div"
                          sx={{ color: "#4F4F4F" }}
                          variant="body1"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est netus commodo amet massa diam. Vel nulla lectus.
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
                            gap: 2,
                          }}
                        >
                  
                          <Typography
                            variant="subtitle2"
                            component="div"
                            sx={{
                              lineHeight: "16px",
                              color: "#333333",
                              fontWeight: "600",
                            }}
                          >
                            Skill name 1
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
                            Skill name 2
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
                            Skill name 400
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
                            Skill name 30
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
                            Skill name 7
                          </Typography>
                        
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
                            sx={{ color: "#323232" }}
                          />
                          <Typography
                            component="div"
                            sx={{ color: "#4F4F4F" }}
                            variant="body1"
                          >
                            Bangalore
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
                            sx={{ color: "#323232" }}
                          />
                          <Typography
                            component="div"
                            sx={{ color: "#4F4F4F" }}
                            variant="body1"
                          >
                            7 years
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
                            sx={{ color: "#323232" }}
                          />
                          <Typography
                            component="div"
                            sx={{ color: "#4F4F4F" }}
                            variant="body1"
                          >
                           10 Lakhs and 50 Thousand
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>
                          <Box sx={{
                            width: "max-content",
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "#E0E0E0",
                            gap: 1,
                            px: 2,
                            py: 0,
                            borderRadius: 1.5,
                          }}>
                            <AccessTimeOutlinedIcon
                              fontSize="small"
                              sx={{ color: "#828282" }}
                            />
                            <Typography
                              component="div"
                              sx={{ color: "#828282" }}
                              variant="body1"
                            >
                              
                              20 days ago
                          
                            </Typography>
                          </Box>
  
                        </Box>
                        <Box>
                          
                        </Box>
                      </Box>
                    </Box>
                  
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
      </Box>
      </>
    );
  };
  
  export default FeaturedHospital;
  