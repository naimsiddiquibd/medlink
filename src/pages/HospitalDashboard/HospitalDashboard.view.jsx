import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { gqlquery, QUERY_GETHOSPITAL, QUERY_GETMYPROFILE } from "../../api/hospitalIndex";
import scletonImg from "../../assets/square_img.png";

export default function HospitalDashboardView() {
  const [hospitalData, setHospitalData] = useState([]);
  const [accessJobPosting, setAccessJobPosting] = useState([]);

  const profileStringth = 90;
  var items = [
    {
      imageURL: "/001.png",
    },
    {
      imageURL: "/002.png",
    },
    {
      imageURL: "/003.png",
    },
  ];


  useEffect(() => {
    gqlquery(QUERY_GETHOSPITAL, null)
      .then((res) => res.json())
      .then((datas) => {
        setHospitalData(datas?.data?.getHospital);
        console.log("successfull", datas);
      });

    gqlquery(QUERY_GETMYPROFILE, null)
      .then((res) => res.json())
      .then((datas) => {
        setAccessJobPosting(datas?.data?.getMyProfile);
        console.log("successfull 2", datas);
      });

  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "60%",
          display: "flex",
          justifyContent: "center",
          marginTop: "2%",
        }}
      >
        <TextField
          name="keywordCTC"
          placeholder="Enter Keyword/CTC"
          sx={{
            backgroundColor: "#f2f2f2",
            size: "large",
            borderRadius: "7px",
            zIndex: "1",
            "& .MuiInputBase-input": { height: 31 },
            width: "80%",
            border: "none !important",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  color="primary"
                  edge="end"
                  size="large"
                  sx={{
                    backgroundColor: "#333333 !important",
                    color: "white !important",
                    borderRadius: "5px",
                    width: 110,
                  }}
                >
                  <b>Search</b>
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ width: "90%", marginTop: "2%" /*  height: "55vh" */ }}>
        <Carousel sx={{ height: "300px" }}>
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </Box>
      <Box sx={{ width: "90%", mx: "auto", mb: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={2.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f2f2f2",
                borderRadius: 1,
                px: 2.5,
                py: 2,
                gap: 2.5,
                mt: 14,
              }}
            >
              <Link to="/advance-search">
                <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "bold" }}>
                  Search Resumes
                </Typography>
              </Link>

              {
                accessJobPosting?.accessJobPosting ? <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "bold" }}>
                  {accessJobPosting?.accessJobPosting ? <Link to="/create-vacancies"> Post Hot Vacancy </Link> : "Post Hot Vacancy"}
                </Typography> : <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "regular" }}>
                  Post Hot Vacancy
                </Typography>
              }

              {accessJobPosting?.accessJobPosting ? <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "bold" }}>
                {accessJobPosting?.accessJobPosting ? <Link to="/post-job">  Post a Job </Link> : "Post a Job"}
              </Typography> : <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "regular" }}>
                Post a Job
              </Typography>}

              <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "bold" }}>
                Product Setting
              </Typography>
              {accessJobPosting?.adminUser && <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "bold" }}>
                <Link to="/userslist"> Manage Sub-users </Link>
              </Typography>}
              <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "bold" }}>
                Subscription Status
              </Typography>
              <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "bold" }}>
                Usage Status
              </Typography>
              <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "bold" }}>
                Company Profile
              </Typography>
              <Typography sx={{ fontSize: "18px", color: "#333333", fontWeight: "bold" }}>
                Change Password
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7} sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                borderRadious: "10px",
                marginTop: "-100px",
                marginBottom: "40px",
                zIndex: "3",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "#F2F2F2",
                  borderRadius: 2,
                  px: 4,
                  py: 2.5,
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  specing={1}
                >
                  <Grid item xs={5}>
                    <img
                      style={{ margin: "10px" }}
                      height="54px"
                      width="54px"
                      src={scletonImg}
                      alt="image_template"
                    />
                    <Typography variant="h6" sx={{ color: "#333333" }}>
                      {hospitalData?.name}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#1A1A1A" }}>
                      Lorem ipsum dolor sit amet, adi.
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{}}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        borderRadius: 1,
                        bgcolor: "#E0E0E0",
                        px: 2.5,
                        pt: 1,
                        pb: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#333333" }}>
                        Pending Actions
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#4F4F4F" }}>
                        Loerm Ipsum fortey.
                      </Typography>
                      <Box sx={{ textAlign: "right" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            bgcolor: "#FFFFFF",
                            color: "#BDBDBD",
                            borderRadius: 1,
                          }}
                        >
                          View All
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={3} sx={{ pl: 3 }}>
                    <Box sx={{ position: "relative", margin: "auto" }}>
                      <CircularProgress
                        variant="determinate"
                        value={90}
                        thickness={5}
                        sx={{
                          width: "120px !important",
                          height: "120px !important",
                          transform: "rotate(0deg) !important",
                          color: "var(--clr-gray-3)",
                        }}
                      />
                      <Typography
                        component="span"
                        variant="h4"
                        sx={{
                          fontWeight: 600,
                          position: "absolute",
                          top: 60,
                          left: 60,
                          transform: "translate(-50%, -50%)",
                        }}
                        className="strength-value"
                      >
                        {profileStringth}%
                      </Typography>
                      <Typography
                        variant="caption"
                        component="p"
                        sx={{
                          fontSize: 13,
                          lineHeight: "16px",
                          fontWeight: 600,
                          color: "var(--clr-gray-3)",
                          textAlign: "center",
                          marginTop: "0.5rem",
                        }}
                      >
                        Profile Strength
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Box>
            <Box>
              <Card sx={{ backgroundColor: "#f2f2f2", borderRadius: "10px" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <Typography sx={{ fontSize: "24px" }}>
                      <b>Job Posting</b>
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#1A1A1A" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam non mi ac felis faucibus aliquam eu tincidunt neque.
                      Mauris dapibus facilisis ex, sed imperdiet odio posuere
                      id.
                    </Typography>
                    <Box>
                      <Link to="/manage-jobs-and-responses">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            bgcolor: "#FFFFFF",
                            color: "#BDBDBD",
                            borderRadius: 1,
                          }}
                        >
                          View Job Posting
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ marginTop: "3%" }}>
              <Card sx={{ backgroundColor: "#f2f2f2", borderRadius: "10px" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <Typography sx={{ fontSize: "24px" }}>
                      <b>Resume Database</b>
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#1A1A1A" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam non mi ac felis faucibus aliquam eu tincidunt neque.
                      Mauris dapibus facilisis ex, sed imperdiet odio posuere
                      id. Donec at lobortis massa. Vestibulum odio dui, pretium
                      in aliquam eget, venenatis a lacus.
                    </Typography>
                    <Box>
                      <Link to="/advance-search">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            bgcolor: "#FFFFFF",
                            color: "#BDBDBD",
                            borderRadius: 1,
                          }}
                        >
                          Know more
                        </Button>
                      </Link>

                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ marginTop: "3%" }}>
              <Card sx={{ backgroundColor: "#f2f2f2", borderRadius: "10px" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <Typography sx={{ fontSize: "24px" }}>
                      <b>Advertisement</b>
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#1A1A1A" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam non mi ac felis faucibus aliquam eu tincidunt neque.
                      Mauris dapibus facilisis ex, sed imperdiet odio posuere
                      id. Donec at lobortis massa. Vestibulum odio dui, pretium
                      in aliquam eget, venenatis a lacus.
                    </Typography>
                    <Box>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          bgcolor: "#FFFFFF",
                          color: "#BDBDBD",
                          borderRadius: 1,
                        }}
                      >
                        Know more
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={2.5}>
            <p>&nbsp;</p>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

function Item(props) {
  return (
    <Paper>
      <div
        style={{
          backgroundImage: `url(${props.item.imageURL})`,
          backgroundSize: "100% 100%",
          height: "300px",
        }}
      ></div>
    </Paper>
  );
}
