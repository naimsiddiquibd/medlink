import React, { useEffect, useState } from "react";
import ProfileView from "./profile.view";
import { Box } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { profileData, tabsData } from "./defaultData";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const Profile = (props) => {
  const [userName, setUserName] = useState("");
  const access_token = sessionStorage.getItem("accessToken");
  //TODO: 1. CHECK IF ACCESS TOKEN IS EXIST, IF IT DOESN'T REDIRECT TO LOGIN PAGE
  // 2. CALL GETUSER AND CHECK USERNAME . IF USERNAME DOESN'T EXIST REDIRECT TO LOGIN PAGE , IF ANY ERROR OCCURS REDIRECT TO LOGIN PAGE

  // console.log(userName, "before");
  useEffect(() => {
    if (!userName) {
      getUserName();
    }
  }, []);

  const getUserName = async () => {
    const res = await provider.getUser({ AccessToken: access_token });
    setUserName(res.Username); 
  }; 

  return (
    <Box>
      {access_token || userName ? (
        <ProfileView profileData={profileData} tabsData={tabsData} />
      ) : (
        <Navigate to="/login" />
      )}
    </Box>
  );
};

export default Profile;
