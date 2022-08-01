import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import {
  gqlquery,
  QUERY_GETJOBPOSTINGPLANS,
  QUERY_GETRESUMEDBPLANS,
} from "../../api/hospitalIndex";

const PricingPlans = () => {
  const [amonut, setAmount] = useState(1);
  const [jobPostingPlans, setJobPostingPlans] = useState([]);
  const [resumeDBPlans, setResumeDBPlans] = useState([]);
  const [value, setValue] = React.useState("1");

  useEffect(() => {
    gqlquery(QUERY_GETJOBPOSTINGPLANS, null)
      .then((res) => res.json())
      .then((data) => setJobPostingPlans(data?.data?.getJobPostPlans));
  }, []);

  useEffect(() => {
    gqlquery(QUERY_GETRESUMEDBPLANS, null)
      .then((res) => res.json())
      .then((data) => setResumeDBPlans(data?.data?.getResumeDBPlans));
  }, []);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const newJobPostingPlans = jobPostingPlans?.map((jobPostingPlan) => {
    let feature = jobPostingPlan.features;
    let newFeature = feature.split(",");
    let terms = JSON.parse(jobPostingPlan.terms);

    return {
      newFeature,
      terms,
      features: jobPostingPlan.features,
      name: jobPostingPlan.name,
      price: jobPostingPlan.price,
      recommended: jobPostingPlan.recommended,
      spID: jobPostingPlan.spID,
      subtext: jobPostingPlan.subtext,
      validity: jobPostingPlan.validity,
    };
  });


  const newResumeDBPlans = resumeDBPlans?.map((resumeDBPlan) => {
    let feature = resumeDBPlan.features;
    let newFeature = feature.split(",");
    let terms = JSON.parse(resumeDBPlan.terms);

    return {
      newFeature,
      features: resumeDBPlan.features,
      name: resumeDBPlan.name,
      price: resumeDBPlan.price,
      recommended: resumeDBPlan.recommended,
      spID: resumeDBPlan.spID,
      subtext: resumeDBPlan.subtext,
      validity: resumeDBPlan.validity,
      terms,
    };
  });

  return (
    <Container sx={{ mb: 5, p: 3 }}>
      <Box maxWidth="lg">
        <Typography variant="body2" gutterBottom sx={{ color: "#395987" }}>
          Home &#62; Profile &#62; Plans
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mt: 3,
            mb: "0.825rem",
            fontWeight: "600",
            color: "#395987",
          }}
          gutterBottom
          component="div"
        >
          Pricing Plans
        </Typography>
      </Box>

      <Box maxWidth="md" sx={{ mx: "auto", my: 2 }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TabList
                onChange={handleChangeTabs}
                aria-label="lab API tabs example"
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: "#F2B45A",
                  },
                }}
              >
                <Tab label="Job Posting" value="1" />
                <Tab label="Resume Database" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Box maxWidth="md" sx={{ mx: "auto", my: 2 }}>
                <Grid container justifyContent="space-between" spacing={6}>
                  {newJobPostingPlans?.map((plan) => (
                    <Grid key={plan?.name} item xs={4}>
                      <Card sx={{ border: plan.focusd }}>
                        <Box
                          sx={{
                            textAlign: "center",
                            mt: 4,
                            mb: 0,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {plan?.recommended === true ? (
                              <>
                                <Typography
                                  variant="caption"
                                  gutterBottom
                                  sx={{
                                    bgcolor: "#F2B45A",
                                    color: "#FFFFFF",
                                    fontWeight: "600",
                                    fontSize: "10px",
                                    borderRadius: "2px",
                                    width: "97px",
                                    height: "18px",
                                    mx: "auto",
                                  }}
                                >
                                  Recommended
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography></Typography>
                              </>
                            )}
                            <Typography
                              sx={{
                                fontWeight: "600",
                                mt: 1,
                                color: "#395987",
                              }}
                              variant="subtitle2"
                              component="div"
                            >
                              {plan?.name}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "flex-end",
                              gap: 2,
                            }}
                          >
                            <Typography
                              variant="h4"
                              component="div"
                              gutterBottom
                              sx={{
                                fontWeight: "700",
                                color: "#395987",
                              }}
                            >
                              {plan?.price} INR
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                color: "#8F8A8A",
                              }}
                            >
                              {plan?.subtext}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>
                              Valid for {plan?.validity} days
                            </Typography>
                          </Box>

                          <Box sx={{ mb: 3 }}>
                            <List>
                              {plan.newFeature.map((description) => (
                                <ListItem
                                  sx={{
                                    fontSize: "14px",
                                    color: "#8F8A8A",
                                    lineClamp: "20px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "start",
                                      JustifyContent: "center",
                                    }}
                                  >
                                    <CheckBoxOutlinedIcon
                                      fontSize="small"
                                      color="success"
                                    />
                                    &nbsp;&nbsp;
                                    <Typography sx={{ color: "#8F8A8A" }}>
                                      {" "}
                                      {description}
                                    </Typography>
                                  </Box>
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              px: 3,
                              py: 1,
                              border: "2px dashed #828282",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <Typography
                              sx={{ color: "#8F8A8A" }}
                              variant="body1"
                              component="div"
                            >
                              Quantity
                            </Typography>
                            <Box>
                              <FormControl
                                fullWidth
                                sx={{
                                  minWidth: 70,
                                  backgroundColor: "#E4EEF5",
                                }}
                              >
                                <Select
                                  value={amonut}
                                  onChange={handleChange}
                                  size="small"
                                  displayEmpty
                                  sx={{ color: "#395987" }}
                                >
                                  <MenuItem value="" disabled>
                                    Select
                                  </MenuItem>
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                  <MenuItem value={11}>11</MenuItem>
                                  <MenuItem value={12}>12</MenuItem>
                                  <MenuItem value={13}>13</MenuItem>
                                  <MenuItem value={14}>14</MenuItem>
                                  <MenuItem value={15}>15</MenuItem>
                                  <MenuItem value={16}>16</MenuItem>
                                  <MenuItem value={17}>17</MenuItem>
                                  <MenuItem value={18}>18</MenuItem>
                                  <MenuItem value={19}>19</MenuItem>
                                  <MenuItem value={20}>20</MenuItem>
                                  <MenuItem value={21}>21</MenuItem>
                                  <MenuItem value={22}>22</MenuItem>
                                  <MenuItem value={23}>23</MenuItem>
                                  <MenuItem value={24}>24</MenuItem>
                                  <MenuItem value={25}>25</MenuItem>
                                  <MenuItem value={26}>26</MenuItem>
                                  <MenuItem value={27}>27</MenuItem>
                                  <MenuItem value={28}>28</MenuItem>
                                  <MenuItem value={29}>29</MenuItem>
                                  <MenuItem value={30}>30</MenuItem>
                                  <MenuItem value={31}>31</MenuItem>
                                  <MenuItem value={32}>32</MenuItem>
                                  <MenuItem value={33}>33</MenuItem>
                                  <MenuItem value={34}>34</MenuItem>
                                  <MenuItem value={35}>35</MenuItem>
                                  <MenuItem value={36}>36</MenuItem>
                                  <MenuItem value={37}>37</MenuItem>
                                  <MenuItem value={38}>38</MenuItem>
                                  <MenuItem value={39}>39</MenuItem>
                                  <MenuItem value={40}>40</MenuItem>
                                  <MenuItem value={41}>41</MenuItem>
                                  <MenuItem value={42}>42</MenuItem>
                                  <MenuItem value={43}>43</MenuItem>
                                  <MenuItem value={44}>44</MenuItem>
                                  <MenuItem value={45}>45</MenuItem>
                                  <MenuItem value={46}>46</MenuItem>
                                  <MenuItem value={47}>47</MenuItem>
                                  <MenuItem value={48}>48</MenuItem>
                                  <MenuItem value={49}>49</MenuItem>
                                  <MenuItem value={50}>50</MenuItem>
                                  <MenuItem value={51}>51</MenuItem>
                                  <MenuItem value={52}>52</MenuItem>
                                  <MenuItem value={53}>53</MenuItem>
                                  <MenuItem value={54}>54</MenuItem>
                                  <MenuItem value={55}>55</MenuItem>
                                  <MenuItem value={56}>56</MenuItem>
                                  <MenuItem value={57}>57</MenuItem>
                                  <MenuItem value={58}>58</MenuItem>
                                  <MenuItem value={59}>59</MenuItem>
                                  <MenuItem value={60}>60</MenuItem>
                                  <MenuItem value={61}>61</MenuItem>
                                  <MenuItem value={62}>62</MenuItem>
                                  <MenuItem value={63}>63</MenuItem>
                                  <MenuItem value={64}>64</MenuItem>
                                  <MenuItem value={65}>65</MenuItem>
                                  <MenuItem value={66}>66</MenuItem>
                                  <MenuItem value={67}>67</MenuItem>
                                  <MenuItem value={68}>68</MenuItem>
                                  <MenuItem value={69}>69</MenuItem>
                                  <MenuItem value={70}>70</MenuItem>
                                  <MenuItem value={71}>71</MenuItem>
                                  <MenuItem value={72}>72</MenuItem>
                                  <MenuItem value={73}>73</MenuItem>
                                  <MenuItem value={74}>74</MenuItem>
                                  <MenuItem value={75}>75</MenuItem>
                                  <MenuItem value={76}>76</MenuItem>
                                  <MenuItem value={77}>77</MenuItem>
                                  <MenuItem value={78}>78</MenuItem>
                                  <MenuItem value={79}>79</MenuItem>
                                  <MenuItem value={80}>80</MenuItem>
                                  <MenuItem value={81}>81</MenuItem>
                                  <MenuItem value={82}>82</MenuItem>
                                  <MenuItem value={83}>83</MenuItem>
                                  <MenuItem value={84}>84</MenuItem>
                                  <MenuItem value={85}>85</MenuItem>
                                  <MenuItem value={86}>86</MenuItem>
                                  <MenuItem value={87}>87</MenuItem>
                                  <MenuItem value={88}>88</MenuItem>
                                  <MenuItem value={89}>89</MenuItem>
                                  <MenuItem value={90}>90</MenuItem>
                                  <MenuItem value={91}>91</MenuItem>
                                  <MenuItem value={92}>2</MenuItem>
                                  <MenuItem value={93}>93</MenuItem>
                                  <MenuItem value={94}>94</MenuItem>
                                  <MenuItem value={95}>95</MenuItem>
                                  <MenuItem value={96}>96</MenuItem>
                                  <MenuItem value={97}>97</MenuItem>
                                  <MenuItem value={98}>98</MenuItem>
                                  <MenuItem value={99}>99</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>
                          <Box sx={{ px: 3 }}>
                            <Typography
                              variant="subtitle2"
                              component="div"
                              sx={{
                                color: "#4F4F4F",
                                fontWeight: "600",
                                fontSize: "10px",
                                my: 2,
                                textAlign: "left",
                              }}
                            >
                              Flat 10% OFF | Buy 5 Job Postings or more
                            </Typography>
                            <Box sx={{ px: 3 }}>
                              <Button
                                size="small"
                                sx={{
                                  mb: 3,
                                  mx: "auto",
                                  rounded: 3,
                                  fontWeight: "600px",
                                  borderRadius: "20px",
                                }}
                                fullWidth
                                variant="contained"
                              >
                                Buy Now
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ px: 1 }}>
                  <List
                    sx={{
                      color: "#828282",
                      lineHeight: "24px",
                    }}
                  >
                    {newJobPostingPlans[0]?.terms?.map((feature) => (
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "flex-start",
                          gap: 3,
                          py: 0,
                        }}
                        key={feature}
                      >
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ fontWeight: "600", fontSize: "5px" }}
                        >
                          <CircleIcon fontSize="5px" />
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            fontWeight: "600",
                            fontSize: "10px",
                            lineHeight: "24px",
                            color: "#828282",
                          }}
                        >
                          {feature}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value="2">
              <Box maxWidth="md" sx={{ mx: "auto", my: 2 }}>
                <Grid container justifyContent="space-between" spacing={6}>
                  {newResumeDBPlans?.map((plan) => (
                    <Grid key={plan?.name} item xs={4}>
                      <Card sx={{ border: plan.focusd }}>
                        <Box
                          sx={{
                            textAlign: "center",
                            mt: 4,
                            mb: 0,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {plan?.recommended === true ? (
                              <>
                                <Typography
                                  variant="caption"
                                  gutterBottom
                                  sx={{
                                    bgcolor: "#F2B45A",
                                    color: "#FFFFFF",
                                    fontWeight: "600",
                                    fontSize: "10px",
                                    borderRadius: "2px",
                                    width: "97px",
                                    height: "18px",
                                    mx: "auto",
                                  }}
                                >
                                  Recommended
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography></Typography>
                              </>
                            )}
                            <Typography
                              sx={{
                                fontWeight: "600",
                                mt: 1,
                                color: "#395987",
                              }}
                              variant="subtitle2"
                              component="div"
                            >
                              {plan?.name}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "flex-end",
                              gap: 2,
                            }}
                          >
                            <Typography
                              variant="h4"
                              component="div"
                              gutterBottom
                              sx={{
                                fontWeight: "700",
                                color: "#395987",
                              }}
                            >
                              {plan?.price} INR
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ color: "#8F8A8A" }}>
                              {plan?.subtext}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>
                              Valid for {plan?.validity} days
                            </Typography>
                          </Box>

                          <Box sx={{ mb: 3, mt: 1, mx: 2 }}>
                            <List>
                              {plan.newFeature.map((description) => (
                                <ListItem
                                  sx={{
                                    fontSize: "14px",
                                    color: "#8F8A8A",
                                    lineClamp: "20px",
                                  }}
                                >
                                  <CheckBoxOutlinedIcon
                                    fontSize="small"
                                    color="success"
                                  />
                                  &nbsp;&nbsp;
                                  {description}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              px: 3,
                              py: 1,
                              border: "2px dashed #828282",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <Typography
                              sx={{ color: "#8F8A8A" }}
                              variant="body1"
                              component="div"
                            >
                              Quantity
                            </Typography>
                            <Box>
                              <FormControl
                                fullWidth
                                sx={{
                                  minWidth: 70,
                                  backgroundColor: "#E4EEF5",
                                }}
                              >
                                <Select
                                  value={amonut}
                                  onChange={handleChange}
                                  size="small"
                                  displayEmpty
                                  sx={{ color: "#395987" }}
                                >
                                  <MenuItem value="" disabled>
                                    Select
                                  </MenuItem>
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                  <MenuItem value={11}>11</MenuItem>
                                  <MenuItem value={12}>12</MenuItem>
                                  <MenuItem value={13}>13</MenuItem>
                                  <MenuItem value={14}>14</MenuItem>
                                  <MenuItem value={15}>15</MenuItem>
                                  <MenuItem value={16}>16</MenuItem>
                                  <MenuItem value={17}>17</MenuItem>
                                  <MenuItem value={18}>18</MenuItem>
                                  <MenuItem value={19}>19</MenuItem>
                                  <MenuItem value={20}>20</MenuItem>
                                  <MenuItem value={21}>21</MenuItem>
                                  <MenuItem value={22}>22</MenuItem>
                                  <MenuItem value={23}>23</MenuItem>
                                  <MenuItem value={24}>24</MenuItem>
                                  <MenuItem value={25}>25</MenuItem>
                                  <MenuItem value={26}>26</MenuItem>
                                  <MenuItem value={27}>27</MenuItem>
                                  <MenuItem value={28}>28</MenuItem>
                                  <MenuItem value={29}>29</MenuItem>
                                  <MenuItem value={30}>30</MenuItem>
                                  <MenuItem value={31}>31</MenuItem>
                                  <MenuItem value={32}>32</MenuItem>
                                  <MenuItem value={33}>33</MenuItem>
                                  <MenuItem value={34}>34</MenuItem>
                                  <MenuItem value={35}>35</MenuItem>
                                  <MenuItem value={36}>36</MenuItem>
                                  <MenuItem value={37}>37</MenuItem>
                                  <MenuItem value={38}>38</MenuItem>
                                  <MenuItem value={39}>39</MenuItem>
                                  <MenuItem value={40}>40</MenuItem>
                                  <MenuItem value={41}>41</MenuItem>
                                  <MenuItem value={42}>42</MenuItem>
                                  <MenuItem value={43}>43</MenuItem>
                                  <MenuItem value={44}>44</MenuItem>
                                  <MenuItem value={45}>45</MenuItem>
                                  <MenuItem value={46}>46</MenuItem>
                                  <MenuItem value={47}>47</MenuItem>
                                  <MenuItem value={48}>48</MenuItem>
                                  <MenuItem value={49}>49</MenuItem>
                                  <MenuItem value={50}>50</MenuItem>
                                  <MenuItem value={51}>51</MenuItem>
                                  <MenuItem value={52}>52</MenuItem>
                                  <MenuItem value={53}>53</MenuItem>
                                  <MenuItem value={54}>54</MenuItem>
                                  <MenuItem value={55}>55</MenuItem>
                                  <MenuItem value={56}>56</MenuItem>
                                  <MenuItem value={57}>57</MenuItem>
                                  <MenuItem value={58}>58</MenuItem>
                                  <MenuItem value={59}>59</MenuItem>
                                  <MenuItem value={60}>60</MenuItem>
                                  <MenuItem value={61}>61</MenuItem>
                                  <MenuItem value={62}>62</MenuItem>
                                  <MenuItem value={63}>63</MenuItem>
                                  <MenuItem value={64}>64</MenuItem>
                                  <MenuItem value={65}>65</MenuItem>
                                  <MenuItem value={66}>66</MenuItem>
                                  <MenuItem value={67}>67</MenuItem>
                                  <MenuItem value={68}>68</MenuItem>
                                  <MenuItem value={69}>69</MenuItem>
                                  <MenuItem value={70}>70</MenuItem>
                                  <MenuItem value={71}>71</MenuItem>
                                  <MenuItem value={72}>72</MenuItem>
                                  <MenuItem value={73}>73</MenuItem>
                                  <MenuItem value={74}>74</MenuItem>
                                  <MenuItem value={75}>75</MenuItem>
                                  <MenuItem value={76}>76</MenuItem>
                                  <MenuItem value={77}>77</MenuItem>
                                  <MenuItem value={78}>78</MenuItem>
                                  <MenuItem value={79}>79</MenuItem>
                                  <MenuItem value={80}>80</MenuItem>
                                  <MenuItem value={81}>81</MenuItem>
                                  <MenuItem value={82}>82</MenuItem>
                                  <MenuItem value={83}>83</MenuItem>
                                  <MenuItem value={84}>84</MenuItem>
                                  <MenuItem value={85}>85</MenuItem>
                                  <MenuItem value={86}>86</MenuItem>
                                  <MenuItem value={87}>87</MenuItem>
                                  <MenuItem value={88}>88</MenuItem>
                                  <MenuItem value={89}>89</MenuItem>
                                  <MenuItem value={90}>90</MenuItem>
                                  <MenuItem value={91}>91</MenuItem>
                                  <MenuItem value={92}>2</MenuItem>
                                  <MenuItem value={93}>93</MenuItem>
                                  <MenuItem value={94}>94</MenuItem>
                                  <MenuItem value={95}>95</MenuItem>
                                  <MenuItem value={96}>96</MenuItem>
                                  <MenuItem value={97}>97</MenuItem>
                                  <MenuItem value={98}>98</MenuItem>
                                  <MenuItem value={99}>99</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>
                          <Box sx={{ px: 3 }}>
                            <Typography
                              variant="subtitle2"
                              component="div"
                              sx={{
                                color: "#4F4F4F",
                                fontWeight: "600",
                                fontSize: "10px",
                                my: 2,
                                textAlign: "left",
                              }}
                            >
                              Flat 10% OFF | Buy 5 Job Postings or more
                            </Typography>
                            <Box sx={{ px: 3 }}>
                              <Button
                                size="small"
                                sx={{
                                  mb: 3,
                                  mx: "auto",
                                  rounded: 3,
                                  fontWeight: "600px",
                                  borderRadius: "20px",
                                }}
                                fullWidth
                                variant="contained"
                              >
                                Buy Now
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ px: 1 }}>
                  <List
                    sx={{
                      color: "#828282",
                      lineHeight: "24px",
                    }}
                  >
                    {newResumeDBPlans[0]?.terms?.map((feature) => (
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "flex-start",
                          gap: 3,
                          py: 0,
                        }}
                        key={feature}
                      >
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ fontWeight: "600", fontSize: "5px" }}
                        >
                          <CircleIcon fontSize="5px" />
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            fontWeight: "600",
                            fontSize: "10px",
                            lineHeight: "24px",
                          }}
                        >
                          {feature}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  );
};

export default PricingPlans;
