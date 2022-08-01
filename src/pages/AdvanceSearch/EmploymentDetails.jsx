import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { gqlquery, QUERY_DEPARTMENTS, QUERY_DESIGNMASTER, QUERY_HOSPITALMASTER, QUERY_NOTICEMASTER } from "../../api/hospitalIndex";

// Custom style for Select dropdown
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 180,
    // maxWidth: "90%"
  },
}));
const EmploymentDetails = (props) => {
  const [openEmploymentDetails, setOpenEmploymentDetails] = useState(true);
  const [masterDepartment, setMasterDepartment] = useState([]);
  const [allDesignation, setAllDesignation] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [noticePeriods, setNoticePeriods] = useState([]);
  const [values, setValues] = useState({
    department: "",
    industry: "",
    includeEmployer: "",
    excludeEmployer: "",
    designation: "",
    noticePeriod: ""
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleEmploymentDetails = () => {
    setOpenEmploymentDetails(!openEmploymentDetails);
  };

  useEffect(() => {
    gqlquery(QUERY_DEPARTMENTS, null)
      .then((res) => res.json())
      .then((datas) => setMasterDepartment(datas?.data?.getDepartments));

    gqlquery(QUERY_DESIGNMASTER, null)
      .then((res) => res.json())
      .then((datas) => setAllDesignation(datas.data?.getDesignationMaster));

    gqlquery(QUERY_HOSPITALMASTER, null)
      .then((res) => res.json())
      .then((datas) => setAllHospitals(datas.data?.getHospitalMaster));

    gqlquery(QUERY_NOTICEMASTER, null)
      .then((res) => res.json())
      .then((datas) => setNoticePeriods(datas.data?.getNoticePeriodMasters));
  }, []);

  useEffect(() => {
    props?.getEmploymentData(values);
  }, [values]);

  return (
    <Grid
      container
      sx={{
        marginBottom: "3rem",
        //   marginLeft: "2%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Employment Details Grid  */}
      <Grid
        item
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          alignItems: "left",
          backgroundColor: "#F2F2F2",
          textAlign: "left",
          paddingBlock: "2rem",
          borderRadius: "10px",
          marginBottom: "-25px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "3%",
            marginRight: "3%",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "-30px",
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#333333",
              }}
            >
              Empoyment Details
            </Typography>
            {openEmploymentDetails ? (
              <ExpandLess
                onClick={handleEmploymentDetails}
                style={{ height: "35px", width: "40px" }}
              />
            ) : (
              <ExpandMore
                onClick={handleEmploymentDetails}
                style={{ height: "35px", width: "40px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Collapse in={openEmploymentDetails} timeout="auto" unmountOnExit>
        <Grid
          item
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
            backgroundColor: "#F2F2F2",
            textAlign: "left",
            paddingBlock: "2rem",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={4}>
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Functional Area
                </Typography>
                <Select
                  value={values.department}
                  onChange={handleChange("department")}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  {
                    masterDepartment?.map((department) =>
                      <MenuItem value={department.departmentID}>{department.name}
                      </MenuItem>
                    )}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "4%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Industry
                </Typography>
                <TextField
                  variant="outlined"
                  name="location"
                  type="text"
                  placeholder="Text"
                  value={values.industy}
                  onChange={handleChange("industry")}
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Employer
                </Typography>
                <Select
                  value={values.includeEmployer}
                  onChange={handleChange("includeEmployer")}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  {
                    allHospitals?.map((employer) =>
                      <MenuItem value={employer?.hmID}>{employer.name}
                      </MenuItem>
                    )}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "4%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Exclude Employer
                </Typography>
                <Select
                  value={values.excludeEmployer}
                  onChange={handleChange("excludeEmployer")}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  {
                    allHospitals?.map((employer) =>
                      <MenuItem value={employer?.hmID}>{employer.name}
                      </MenuItem>
                    )}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Designation
                </Typography>
                <Select
                  value={values.designation}
                  onChange={handleChange("designation")}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  {
                    allDesignation?.map((designation) =>
                      <MenuItem value={designation?.dmID}>{designation.name}
                      </MenuItem>
                    )}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={5.4}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 4%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Notice Period
                </Typography>
                <Select
                  value={values.noticePeriod}
                  onChange={handleChange("noticePeriod")}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  {
                    noticePeriods?.map((notice) =>
                      <MenuItem value={notice?.npID}>{notice?.notice}
                      </MenuItem>
                    )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Collapse >
    </Grid >
  );
};

export default EmploymentDetails;
