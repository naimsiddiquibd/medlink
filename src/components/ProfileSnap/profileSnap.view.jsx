import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  gqlquery,
  QUERY_LISTPROFILES,
  QUERY_GETSKILLSLIST,
  QUERY_GETEDUCATIONLIST,
  QUERY_GETEXPERIENCE,
  QUERY_GETMEMBERSHIPS,
  QUERY_GETPERSONALDETAILS,
  QUERY_GETCAREERPROFILEPERCENTAGE,
} from "../../api";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const UserInfoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "1rem",
}));

const ProfileSnap = (props) => {
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
  });
  const tabletView = useMediaQuery("(max-width:900px)");
  const mobileView = useMediaQuery("(max-width:600px)");

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
  }, []);

  useEffect(() => {
    gqlquery(QUERY_GETEDUCATIONLIST, null)
      .then((res) => res.json())
      .then((datas) => {
        if (
          datas?.data?.getEducationList[0]?.courseName &&
          controlStrength?.education === 0
        ) {
          setControlSrength({ education: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 20),
            10000
          );
        }
      });

    gqlquery(QUERY_GETSKILLSLIST, null)
      .then((res) => res.json())
      .then((datas) => {
        if (
          datas?.data?.getSkillsList[0]?.name &&
          controlStrength?.skillsList === 0
        ) {
          setControlSrength({ skillsList: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }
      });

    gqlquery(QUERY_GETEXPERIENCE, null)
      .then((res) => res.json())
      .then((datas) => {
        if (
          datas?.data?.getExperienceList[0]?.hospital &&
          controlStrength?.experience === 0
        ) {
          setControlSrength({ experience: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 20),
            10000
          );
        }
      });

    gqlquery(QUERY_GETCAREERPROFILEPERCENTAGE, null)
      .then((res) => res.json())
      .then((datas) => {
        if (
          datas?.data?.getCareerProfile?.departmentName &&
          controlStrength?.careerProfile === 0
        ) {
          setControlSrength({ careerProfile: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }
      });

    gqlquery(QUERY_GETPERSONALDETAILS, null)
      .then((res) => res.json())
      .then((datas) => {
        if (
          datas?.data?.getPersonalDetails?.gender &&
          controlStrength?.personalDetails === 0
        ) {
          setControlSrength({ personalDetails: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }
      });

    gqlquery(QUERY_GETMEMBERSHIPS, null)
      .then((res) => res.json())
      .then((datas) => {
        if (
          datas?.data?.getMemberships[0]?.organization &&
          controlStrength?.membership === 0
        ) {
          setControlSrength({ membership: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }
      });
  }, []);

  return (
    <Card
      sx={{
        margin: "auto",
        borderRadius: "12px",
        mb: 5,
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
            src={props?.profileData?.image}
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
            <CameraEnhanceIcon fontSize="small" sx={{ color: "#828282" }} />
          </IconButton>
        </Box>

        <Grid container>
          <Grid item xs={12} md={10}>
            <Box sx={{ textAlign: `${mobileView ? "center" : "left"}` }}>
              <Typography variant="h5" component="h2">
                {profile?.name}
              </Typography>
              <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Typography variant="p" component="p">
                  {profile?.specialization}
                </Typography>
                <IconButton sx={{ p: 0.5 }}>
                  <EditIcon fontSize="small" sx={{ color: "#828282" }} />
                </IconButton>
              </Box>
            </Box>
            <Grid container sx={{ marginTop: "1.5rem" }}>
              <Grid item xs={12} md={6}>
                <UserInfoBox>
                  <LocationOnTwoToneIcon sx={{ color: "#323232" }} />
                  {profile?.city}
                </UserInfoBox>
                <UserInfoBox>
                  <WorkTwoToneIcon sx={{ color: "#323232" }} />
                  {profile?.exp} years
                </UserInfoBox>
                <UserInfoBox>
                  <AccountBalanceWalletTwoToneIcon sx={{ color: "#323232" }} />
                  {(profile?.salary / 100000).toFixed(0)} Lakh
                </UserInfoBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <UserInfoBox>
                  <EmailTwoToneIcon sx={{ color: "#323232" }} />
                  {userEmail}
                </UserInfoBox>
                <UserInfoBox>
                  <PhoneIphoneTwoToneIcon sx={{ color: "#323232" }} />
                  {profile?.phone}
                </UserInfoBox>
                <UserInfoBox>
                  <AssignmentIndIcon sx={{ color: "#323232" }} />
                  Actively searching{" "}
                  <Typography
                    component="span"
                    style={{
                      color: "#27AE60",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    {profile?.activelySearching ? "YES" : "NO"}
                  </Typography>
                </UserInfoBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ position: "relative", mx: "auto" }}>
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
                {profileStrength}%
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{
                  fontSize: 13,
                  lineHeight: "16px",
                  fontWeight: 600,
                  color: "var(--clr-gray-3)",
                  marginTop: "0.5rem",
                  paddingLeft: "15px",
                }}
              >
                Profile Strength
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileSnap;

ProfileSnap.prototype = {
  profileData: {
    image: PropTypes.any,
    name: PropTypes.string,
    specilization: PropTypes.string,
    location: PropTypes.string,
    experience: PropTypes.number,
    salary: PropTypes.string,
    number: PropTypes.string,
    email: PropTypes.string,
    strength: PropTypes.number,
  },
};
