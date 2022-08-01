import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import AddCardIcon from '@mui/icons-material/AddCard';
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";


const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const fromTime = ["12 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM", "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"];
const toTime = ["12 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM", "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"];

const ApplicantBio = (props) => {
    const [availableTime, setAvailableTime] = useState([]);
    const [applicantsBio, setApplicantsBio] = useState([]);
    const [getProfileByApplicant, setGetProfileByApplicant] = useState([]);
    const [getExperiencedList, setGetExperiencedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [educationDetails, setEducationDetails] = useState([]);
    const [userEmail, setUserEmail] = useState("");

    const access_token = sessionStorage.getItem("accessToken");

    const getUserEmail = async () => {
        const res = await provider.getUser({ AccessToken: access_token });
        setUserEmail(res?.UserAttributes[2]?.Value);
    };

    useEffect(() => {
        if (!userEmail) {
            getUserEmail();
        }
    }, []);

    useEffect(() => {
        const QUERY_GETEDUCATIONLISTBYAPPLICANT = {
            query: `query MyQuery {
                getEducationListByApplicant(userID : "${props.userID}") {
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
        gqlquery(QUERY_GETEDUCATIONLISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => setEducationDetails(datas.data?.getEducationListByApplicant))
            .finally((e) => setIsLoading(false));
    }, []);

    useEffect(() => {
        const QUERY_GETEXPERIENCELISTBYAPPLICANT = {
            query: `query MyQuery {
                getExperienceListByApplicant(userID : "${props.userID}") {
                    currentlyWorking 
                    hospital
                    hospitalID 
                    notice
                    noticePeriodID
                   }
                }`
        };
        gqlquery(QUERY_GETEXPERIENCELISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => setGetExperiencedList(datas.data.getExperienceListByApplicant))
            .finally((e) => setIsLoading(false));
    }, []);
    const expData = getExperiencedList.filter((experience) => experience.currentlyWorking !== false);

    useEffect(() => {
        // For defaut value
        const QUERY_GETCANDIDATEAVAILABILITYBYAPPLICANT = {
            query: `query MyQuery {
                getCandidateAvailabilityByApplicant(userID : "${props.userID}") {
                    availID
                    day
                    fromTime
                    toTime
                   }
                }`
        };
        gqlquery(QUERY_GETCANDIDATEAVAILABILITYBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => setAvailableTime(data?.data.getCandidateAvailabilityByApplicant))
            .finally((e) => setIsLoading(false));
    }, []);

    useEffect(() => {
        // For defaut value
        const QUERY_GETCAREERPROFILEBYAPPLICANT = {
            query: `query MyQuery {
                getCareerProfileByApplicant(userID : "${props.userID}") {
                    cpID
                    departmentID
                    desiredEmploymentType
                    departmentName
                    desiredJobType
                    desiredShift
                    expectedSalaryStart
                    expectedSalaryEnd
                    industry
                    jobRole
                    preferredWorkLocation
                    roleCategory
                   }
                }`
        };
        gqlquery(QUERY_GETCAREERPROFILEBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => setApplicantsBio(data?.data?.getCareerProfileByApplicant))
            .finally((e) => setIsLoading(false));
    }, []);

    useEffect(() => {
        // For defaut value
        const QUERY_GETPROFILEBYAPPLICANT = {
            query: `query MyQuery {
                getProfileByApplicant(userID : "${props.userID}") {
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
                }`
        };
        gqlquery(QUERY_GETPROFILEBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => setGetProfileByApplicant(data?.data.getProfileByApplicant))
            .finally((e) => setIsLoading(false));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mx: "auto" }}>
            <Card sx={{ bgcolor: "#F2F2F2", p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Box>
                            <img src="/circle-icon.png" height="200px" width="200px" alt="circle-avater" />
                        </Box>
                        <Box>
                            <Typography sx={{ color: "gray", mb: 2 }} >
                                Avaialable Time
                            </Typography>
                            {
                                availableTime.map((time) => (
                                    <Typography variant="body2" gutterBottom key={time.availID} sx={{ mb: 1 }}>
                                        {time?.day} {" "} {fromTime[time?.fromTime]} {"-"} {toTime[time?.toTime]}
                                    </Typography>
                                ))
                            }

                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                            <Typography
                                sx={{ pl: 4, pr: 1, fontWeight: "bold", fontSize: "30px", }}
                            >
                                {getProfileByApplicant?.name}
                            </Typography>
                            {getProfileByApplicant?.activelySearching && <Typography
                                sx={{ backgroundColor: "#6FCF97", px: 3, py: 0.7, borderRadius: "24px", fontSize: "14px", color: "white", fontWeight: 500 }}
                            >
                                Acitvely Searching
                            </Typography>}
                        </Box>

                        <Box sx={{ display: "flex", gap: 3, pl: 4, pr: 1, mb: 4 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyCotent: "center" }}>
                                <Typography variant="body2" gutterBottom>
                                    <PhoneAndroidIcon
                                        color=" "
                                        fontSize="medium"
                                    />
                                </Typography>
                                <Typography variant="body2" gutterBottom sx={{ fontSize: 18, color: "#333333" }}>
                                    &nbsp; {getProfileByApplicant?.phone}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyCotent: "center" }}>
                                <Typography variant="body2" gutterBottom>
                                    <MailOutlineIcon
                                        color=" "
                                        fontSize="medium"
                                    />
                                </Typography>
                                <Typography variant="body2" gutterBottom sx={{ fontSize: 18, color: "#333333" }}>
                                    &nbsp; {userEmail}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyCotent: "center" }}>
                                <Typography variant="body2" gutterBottom>
                                    <LocationOnIcon
                                        color=" "
                                        fontSize="medium"
                                    />
                                </Typography>
                                <Typography variant="body2" gutterBottom sx={{ fontSize: 18, color: "#333333" }}>
                                    &nbsp; {getProfileByApplicant?.city}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyCotent: "center" }}>
                                <Typography variant="body2" gutterBottom>
                                    <WorkIcon
                                        color=" "
                                        fontSize="medium"
                                    />
                                </Typography>
                                <Typography variant="body2" gutterBottom sx={{ fontSize: 18, color: "#333333" }}>
                                    &nbsp; {getProfileByApplicant?.exp} Years
                                    {/* {getProfileByApplicant?.expMonths}  */}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyCotent: "center" }}>
                                <Typography variant="body2" gutterBottom>
                                    <AddCardIcon
                                        color=" "
                                        fontSize="medium"
                                    />
                                </Typography>
                                <Typography variant="body2" gutterBottom sx={{ fontSize: 18, color: "#333333" }}>
                                    &nbsp; {(applicantsBio?.expectedSalaryStart)} - {(applicantsBio?.expectedSalaryEnd)} Lakhs
                                    {/* {getProfileByApplicant?.salaryThousands} Thousands */}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 3, }}>
                            <Grid item xs={5} sx={{ pl: 4, pr: 1, display: "flex", flexDirection: "column", gap: 2 }} >
                                <Box>
                                    <Typography sx={{ color: "#6F7482", fontWeight: 500, }}>
                                        Current
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: "17px", }}>
                                        {expData[0]?.hospital}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "#6F7482", fontWeight: 500, }}>
                                        Education
                                    </Typography>
                                    {
                                        educationDetails?.map((edu) => (
                                            <Typography sx={{ fontWeight: 500, fontSize: "17px", mb: 0.5 }}>
                                                {edu?.courseName}
                                            </Typography>
                                        ))
                                    }

                                </Box>
                                <Box>
                                    <Typography sx={{ color: "#6F7482", fontWeight: 500, }}>
                                        Preffered Location
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: "17px", }}>
                                        {applicantsBio?.preferredWorkLocation}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "#6F7482", fontWeight: 500, }}>
                                        Notice Period
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: "17px", }}>
                                        {expData[0]?.notice}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={7} sx={{}}>
                                <Typography variant="body1" gutterBottom sx={{ fontSize: "24px", fontWeight: 500 }}>
                                    Resume Headline
                                </Typography>
                                <Typography sx={{ color: "GrayText", pr: 3 }}>
                                    {/* <ReactReadMoreReadLess
                                        charLimit={200}
                                        readMoreText={"Read more"}
                                        readLessText={"Read less"}
                                        readMoreClassName="read-more-less--more"
                                        readLessClassName="read-more-less--less"  
                                        
                                    > */}

                                    {/* </ReactReadMoreReadLess> */}
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>

                </Grid>
            </Card>
        </Container>
    );
};

export default ApplicantBio;
