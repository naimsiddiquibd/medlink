import styled from "@emotion/styled";
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Grid, IconButton, Input, InputAdornment, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { gqlquery, QUERY_GETCAREERPROFILEPERCENTAGE, QUERY_GETEDUCATIONLIST, QUERY_GETEXPERIENCE, QUERY_GETMEMBERSHIPS, QUERY_GETPERSONALDETAILS, QUERY_GETSKILLSLIST, QUERY_LISTPROFILES } from "../../api";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import homeBanner from "../../assets/images/doctors_home_banner.png";
import profileImg from "../../assets/profile.png";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const SearchButton = styled(Button)(() => ({
    border: "none !important"
}));

const UserInfoBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
}));

const profileData = {
    image: profileImg,
    name: "Manoj Kumar",
    specilization: "Cardiologist",
    location: "Bangalore",
    experience: 7,
    salary: "10 Lakhs and 50 Thousand",
    number: "+91 9009090909",
    email: "manoj@gmail.com",
    search: "Actively searching",
    strength: 90,
};


const ProfileHome = () => {
    const tabletView = useMediaQuery("(max-width:900px)");
    const mobileView = useMediaQuery("(max-width:600px)");

    const [topFourJobs, SetTopFourJobs] = useState([])

    const navigate = useNavigate();

    const [values, setValues] = useState({
        jobTitle: "",
        location: "",
    })
    const [profile, setProfile] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [profileStrength, setProfileStrength] = useState(0);
    const [controlStrength, setControlSrength] = useState({
        education: 0,
        personalDetails: 0,
        careerProfile: 0,
        membership: 0,
        experience: 0,
        skillsList: 0,
    })
    // const [state, setState] = useState(false);

    const access_token = sessionStorage.getItem("accessToken");

    const getUserEmail = async () => {
        const res = await provider.getUser({ AccessToken: access_token });
        setUserEmail(res?.UserAttributes[2].Value);
    };

    useEffect(() => {
        if (!userEmail) {
            getUserEmail();
        }
    }, []);

    useEffect(() => {
        gqlquery(QUERY_LISTPROFILES, null)
            .then((res) => res.json())
            .then((datas) => setProfile(datas?.data?.getProfile));
    }, [])

    useEffect(() => {
        gqlquery(QUERY_GETEDUCATIONLIST, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.getEducationList[0]?.courseName && controlStrength?.education === 0) {
                    setControlSrength({ education: 1 })
                    setTimeout(setProfileStrength((prevData) => prevData + 20), 10000);
                }
            });

        gqlquery(QUERY_GETSKILLSLIST, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.getSkillsList[0]?.name && controlStrength?.skillsList === 0) {
                    setControlSrength({ skillsList: 1 })
                    setTimeout(setProfileStrength((prevData) => prevData + 10), 10000);
                }
            });

        gqlquery(QUERY_GETEXPERIENCE, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.getExperienceList[0]?.hospital && controlStrength?.experience === 0) {
                    setControlSrength({ experience: 1 })
                    setTimeout(setProfileStrength((prevData) => prevData + 20), 10000);
                }
            });

        gqlquery(QUERY_GETCAREERPROFILEPERCENTAGE, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.getCareerProfile?.departmentName && controlStrength?.careerProfile === 0) {
                    setControlSrength({ careerProfile: 1 })
                    setTimeout(setProfileStrength((prevData) => prevData + 10), 10000);
                }
            });

        gqlquery(QUERY_GETPERSONALDETAILS, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.getPersonalDetails?.gender && controlStrength?.personalDetails === 0) {
                    setControlSrength({ personalDetails: 1 })
                    setTimeout(setProfileStrength((prevData) => prevData + 10), 10000);
                }
            });

        gqlquery(QUERY_GETMEMBERSHIPS, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.getMemberships[0]?.organization && controlStrength?.membership === 0) {
                    setControlSrength({ membership: 1 })
                    setTimeout(setProfileStrength((prevData) => prevData + 10), 10000);
                }
            });
    }, []);


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleJobsSearch = () => {
        const handleNavigate = () => {
            navigate("/job-search-list", { state: values });
        };
        setTimeout(handleNavigate, 1000);
    }

    useEffect(() => {
        const QUERY_SEARCHTOPFOURJOBS = {
            query: `query MyQuery {
                        searchTop4Jobs {
                        description
                        employmentType
                        experience
                        jobTitle
                        lastDateToApply
                        location
                        maximumSalary
                        minimumSalary
                        postedOn
                        primarySpecialization
                        qualification
                        vacancyID
                        secondarySpecialization
                        vacancyType
                        }
                        }
                      `,
            variables: null,
            operationName: "MyMutation",
        };

        gqlquery(QUERY_SEARCHTOPFOURJOBS, null)
            .then((res) => res.json())
            .then((data) => SetTopFourJobs(data?.data?.searchTop4Jobs))

    }, [])


    const newTopFourJobs = topFourJobs?.map((searchResult) => {
        const date_diff_indays = function () {
            const dt1 = new Date(searchResult?.postedOn);
            const dt2 = new Date();
            const days = Math.floor(
                (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
                    Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
                (1000 * 60 * 60 * 24)
            );
            const month = Math.floor(days / 30)
            const day = days % 30
            if (days >= 30) {

                return {
                    month,
                    day
                }
            }
            return {
                days
            }
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
            employmentType: searchResult?.employmentType,
            lastDateToApply: searchResult?.lastDateToApply,
            vacancyID: searchResult?.vacancyID,
            vacancyType: searchResult?.vacancyType

        }
    })


    return (
        <Box>
            <Box style={{ backgroundImage: `url(${homeBanner})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }} sx={{ bgcolor: "#E0E0E0", height: "240px" }} >
                <Box maxWidth="md" sx={{ mx: "auto" }}>
                    <Input
                        sx={{ mt: " 50px", borderRadius: 16, padding: "12px 14px 12px 40px  !important", py: "2 !important", }}
                        disableUnderline
                        fullWidth
                        name="jobTitle"
                        onChange={handleChange("jobTitle")}
                        placeholder="Enter Keyword"
                        endAdornment={
                            <InputAdornment position="end" style={{ outline: "none" }}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <SearchButton onClick={handleJobsSearch} color="primary" variant="contained" edge="end" size="large" sx={{ color: "white", borderRadius: 16, px: 4, py: 0.7 }}>
                                        Search
                                    </SearchButton>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>
            </Box>
            <Box maxWidth="md" sx={{ mx: "auto", mt: -10 }}
            >
                <Card
                    sx={{
                        margin: "auto",
                        borderRadius: 2,
                        boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            gap: "1.5rem",
                            flexDirection: `${mobileView ? "column" : "row"}`,
                        }}
                    >
                        <Box sx={{ position: "relative", mx: "auto" }}>
                            <Avatar
                                sx={{
                                    width: "60px",
                                    height: "60px",
                                    margin: `${tabletView ? "1rem auto" : "0 1rem"}`,
                                    mt: 1,
                                }}
                                src={profileData?.image}
                            />
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    top: 63,
                                    right: 3,
                                    transform: "translate(-50%, -50%)",
                                    bgcolor: "#FFFFFF",
                                    p: 0.15,
                                }}
                            >
                                <CameraEnhanceIcon fontSize="small" sx={{ color: "var(--clr-blue-primary)" }} />
                            </IconButton>
                        </Box>
                        <Grid container>
                            <Grid item xs={12} md={10}>
                                <Box sx={{ textAlign: `${mobileView ? "center" : "left"}` }}>
                                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: "var(--clr-gray-1)" }}>
                                        {profile?.name}
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
                                        <Typography variant="p" component="p">
                                            {profile?.specialization}
                                        </Typography>
                                        <IconButton sx={{ p: 0.5 }}>
                                            <EditIcon fontSize="small" sx={{ color: "var(--clr-blue-primary)" }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Grid container sx={{ marginTop: "1.5rem", color: "var(--clr-gray-1)", fontSize: "1rem" }}>
                                    <Grid item xs={12} md={6}>
                                        <UserInfoBox>
                                            <FmdGoodOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                                            {profile?.city}
                                        </UserInfoBox>
                                        <UserInfoBox>
                                            <WorkOutlineOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                                            {profile?.exp} years
                                        </UserInfoBox>
                                        <UserInfoBox>
                                            <AccountBalanceWalletOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                                            {(profile?.salary / 100000).toFixed(0)} Lakh
                                        </UserInfoBox>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <UserInfoBox>
                                            <PhoneIphoneIcon sx={{ color: "var(--clr-white-icon)" }} />
                                            {profile?.phone}
                                        </UserInfoBox>
                                        <UserInfoBox>
                                            <EmailOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                                            {userEmail}
                                        </UserInfoBox>
                                        <UserInfoBox>
                                            <AssignmentIndOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                                            {profile?.activelySearching ? "Actively searching" : "Not Actively searching"}
                                        </UserInfoBox>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Box sx={{ position: "relative", margin: "auto" }}>
                                    <CircularProgress
                                        variant="determinate"
                                        value={90}
                                        thickness={5}
                                        sx={{
                                            width: "120px !important",
                                            height: "120px !important",
                                            transform: "rotate(0deg) !important",
                                            color: "var(--clr-green-3)",
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
                                        {profileStrength}%
                                    </Typography>

                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: 13,
                                                lineHeight: "16px",
                                                fontWeight: 600,
                                                color: "var(--clr-gray-3)",
                                                mt: 2,
                                            }}
                                        >
                                            Profile Strength
                                        </Typography>
                                        <Button
                                            sx={{ borderRadius: 16, fontSize: "0.8rem", mt: 2 }}
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => navigate("/profile")}
                                        >
                                            Update Profile
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
            <Box maxWidth="md" sx={{ mx: "auto", mt: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{ fontSize: "24px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>
                    Recommended Jobs
                </Typography>
                <Grid container spacing={5} >
                    {newTopFourJobs?.map((searchResult) =>
                        <Grid key={searchResult?.vacancyID} item xs={12} md={6} >
                            <Box
                                key={searchResult?.id}
                                sx={{
                                    bgcolor: "var(--clr-white)",
                                    borderRadius: 1,
                                    p: 5,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: "#333333",
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        m: 0
                                    }}
                                >
                                    {searchResult?.jobTitle}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        color: "var(--clr-gray-3)",
                                        fontWeight: "600",
                                    }}
                                >
                                    {/* {searchResult.hospitalName} */}
                                    Hospital / Consultant name Here
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 3,
                                    }}
                                >
                                    <ChromeReaderModeOutlinedIcon fontSize="small" sx={{ color: "var(--clr-white-icon)" }} />
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
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <FmdGoodOutlinedIcon fontSize="small" sx={{ color: "var(--clr-white-icon)" }} />
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
                                        gap: 2,
                                    }}
                                >
                                    <WorkOutlineOutlinedIcon
                                        fontSize="small"
                                        sx={{ color: "var(--clr-white-icon)" }}
                                    />
                                    <Typography
                                        component="div"
                                        sx={{ color: "#4F4F4F" }}
                                        variant="body1"
                                    >
                                        {searchResult?.experience} {searchResult.experience === 1 ? "Year" : "Years"}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <AccountBalanceWalletOutlinedIcon
                                        fontSize="small"
                                        sx={{ color: "var(--clr-white-icon)" }}
                                    />
                                    <Typography
                                        component="div"
                                        sx={{ color: "#4F4F4F" }}
                                        variant="body1"
                                    >
                                        {searchResult?.maximumSalary} {"INR"}
                                    </Typography>
                                </Box> 
                                <Box
                                    sx={{
                                        width: "max-content",
                                        display: "flex",
                                        alignItems: "center",
                                        bgcolor: "var(--clr-white-bg)",
                                        gap: 1,
                                        px: 1.5,
                                        py: 0.3,
                                        borderRadius: 16,
                                        mt: 1
                                    }}
                                >
                                    <HistoryOutlinedIcon
                                        fontSize="small"
                                        sx={{ color: "var(--clr-blue-footer)" }}
                                    />
                                    <Typography
                                        component="div"
                                        sx={{ color: "var(--clr-blue-footer)" }}
                                        variant="body1"
                                    >
                                        {
                                            searchResult?.date_diff_indays().month ? (
                                                <>
                                                    {searchResult.date_diff_indays().month} {searchResult.date_diff_indays().month === 1 ? "month" : "months"} {" "}
                                                    {
                                                        searchResult.date_diff_indays().day ? (
                                                            <>
                                                                {searchResult.date_diff_indays().day} {searchResult.date_diff_indays().day === 1 ? "day" : "days"} {"ago"}
                                                            </>
                                                        ) :
                                                            (
                                                                <> {"ago"}
                                                                </>
                                                            )
                                                    }
                                                </>
                                            ) :
                                                (
                                                    <>
                                                        {searchResult?.date_diff_indays().days} {searchResult.date_diff_indays().days === 1 ? "day" : "days"}    {"ago"}
                                                    </>
                                                )
                                        }
                                        {/* {searchResult.postedOn} */}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <Box maxWidth="md" sx={{ mx: "auto", my: 5 }}>
                <Typography
                    variant="p"
                    component="p"
                    sx={{
                        fontSize: 13,
                        lineHeight: "16px",
                        fontWeight: 600,
                        color: "var(--clr-gray-3)",
                        marginTop: "0.5rem",
                        textAlign: "end"
                    }}
                >
                    <Button
                        sx={{ borderRadius: 16, py: 1.2, px: 3, fontWeight: 600 }}
                        variant="outlined"
                        color="primary"
                    >
                        View All
                    </Button>
                </Typography>
            </Box>
        </Box>
    );
};

export default ProfileHome;
