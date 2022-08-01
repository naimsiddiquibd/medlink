import {
  Box,
  Card,
  Container,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import CircularProgress from "@mui/material/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";


// MUI custom styles
const useStyles = makeStyles({
  headerCell: {
    color: "#333333",
    fontSize: "12px",
    fontWeight: 600,
    textAlign: "left",
    margin: 0,
    padding: "8px 0 15px",
    border: "none",
  },

  bodyCell: {
    color: "#828282",
    fontSize: "12px",
    fontWeight: 400,
    textAlign: "left",
    margin: 0,
    padding: "8px 0",
    border: "none",
  },
});

const PersonalDetails = (props) => {
  const { headerCell, bodyCell } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [personalDetails, setPersonalDetails] = useState({});
  const [languagesKnown, setLanguagesKnown] = useState([]);

  useEffect(() => {
    const QUERY_GETPERSONALDETAILSBYAPPLICANT = {
      query: `query MyQuery {
        getPersonalDetailsByApplicant(userID : "${props.userID}") {
              address
              dateofBirth
              differentlyAbled
              gender
              homeTown
              maritalStatus
              pdID
             }
          }`
    };
    gqlquery(QUERY_GETPERSONALDETAILSBYAPPLICANT, null)
      .then((res) => res.json())
      .then((data) => setPersonalDetails(data?.data?.getPersonalDetailsByApplicant))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const QUERY_GETLANGUAGESKNOWNBYAPPLICANT = {
      query: `query MyQuery {
          getLanguagesKnownByApplicant(userID : "${props.userID}") {
                language
                lknID
                read
                proficiency
                speak
                write
              }
            }`
    };
    gqlquery(QUERY_GETLANGUAGESKNOWNBYAPPLICANT, null)
      .then((res) => res.json())
      .then((data) => setLanguagesKnown(data?.data?.getLanguagesKnownByApplicant));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mx: "auto" }}>
      <Card sx={{ bgcolor: "#F2F2F2", px: 3, pt: 2, pb: 2 }}>
        <Typography
          variant="h5"
          sx={{ color: "#333333", fontWeight: "bold", pb: 3 }}
          gutterBottom
          component="div"
        >
          Personal Details
        </Typography>
        <Box
          sx={{
            px: 1,
            pb: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ width: "20vw" }}
            >
              Gander
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ width: "75vw", color: "#4F4F4F" }}
            >
              {personalDetails?.gender}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ width: "20vw" }}
            >
              Home Town
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ width: "75vw", color: "#4F4F4F" }}
            >
              {personalDetails?.homeTown}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ width: "20vw" }}
            >
              Marital Status
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ width: "75vw", color: "#4F4F4F" }}
            >
              {personalDetails?.maritalStatus}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ width: "20vw" }}
            >
              Differently Abled
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              component="div"
              sx={{ width: "75vw", color: "#4F4F4F" }}
            >
              {personalDetails?.differentlyAbled ? "YES" : "NO"}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "#333333",
              fontWeight: "600",
              pb: 1,
            }}
            component="div"
            gutterBottom
          >
            Languages Known
          </Typography>
          <Box sx={{ width: "70%" }}>
            <Table className="table">
              <TableHead
                sx={{
                  mx: 0,
                  px: 0,
                  borderBottom: 0,
                }}
              >
                <TableCell colSpan={2} className={headerCell}>
                  Languages
                </TableCell>
                <TableCell className={headerCell}>Profeciency</TableCell>
                <TableCell className={headerCell}>Read</TableCell>
                <TableCell className={headerCell}>Write</TableCell>
                <TableCell className={headerCell}>Speak</TableCell>
              </TableHead>
              {
                isLoading ? <Box sx={{ textAlign: "center" }}>
                  <CircularProgress color="inherit" />
                </Box> : <TableBody>
                  {languagesKnown?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        mx: 0,
                        px: 0,
                        color: "#828282",
                      }}
                    >
                      <TableCell colSpan={2} className={bodyCell}>
                        {row.language}
                      </TableCell>
                      <TableCell className={bodyCell}>
                        {row.proficiency}
                      </TableCell>
                      <TableCell className={bodyCell}>{row?.read ? "YES" : "NO"}</TableCell>
                      <TableCell className={bodyCell}>{row?.speak ? "YES" : "NO"}</TableCell>
                      <TableCell className={bodyCell}>{row?.write ? "YES" : "NO"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              }

            </Table>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default PersonalDetails;
