import * as React from "react";
import { useState } from "react";
import {
  Grid,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <FormControlLabel
          value="anyusualification"
          control={<Radio />}
          label="Any UG Qualification"
          checked
          color="black"
        />
        <FormControlLabel
          value="specificugqualification"
          control={<Radio />}
          label="Specific UG Qualification"
        />
        <FormControlLabel
          value="nougualification"
          control={<Radio />}
          label="No UG Qualification"
        />
      </RadioGroup>
    </FormControl>
  );
}

const EducationDetails = () => {
  const [openEdcationalDetails, setOpenEdcationalDetails] = useState(true);
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    experience: "",
    lastDateToApply: new Date(),
    description: "",
    salaryRange: [0, 40000],
    filterKeyword: "",
    filterLocation: "",
    filterExperienceFrom: "",
    filterExperienceTo: "",
    filterSalaryRange: [0, 40000],
  });

  const handleEdcationalDetails = () => {
    setOpenEdcationalDetails(!openEdcationalDetails);
  };

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
    console.log(form);
  };
  return (
    <Grid
      container
      sx={{
        marginBottom: "3rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
              Educational Details
            </Typography>
            {openEdcationalDetails ? (
              <ExpandLess
                onClick={handleEdcationalDetails}
                style={{ height: "35px", width: "40px" }}
              />
            ) : (
              <ExpandMore
                onClick={handleEdcationalDetails}
                style={{ height: "35px", width: "40px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Collapse in={openEdcationalDetails} timeout="auto" unmountOnExit>
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
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
                textAlign: "left",
              }}
            >
              <FormControl sx={{}} variant="standard">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "baseline",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "13px",
                      color: "gray",
                    }}
                    checked
                  />
                  <span style={{ color: "#6F7482" }}>UG Qualification </span>
                </Box>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
                textAlign: "left",
              }}
            >
              <FormControl sx={{}} variant="standard">
                <RowRadioButtonsGroup />
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
                  Institute Name
                </Typography>
                <TextField
                  variant="outlined"
                  name="jobTitle"
                  type="text"
                  placeholder="Text"
                  value={form.jobTitle}
                  onChange={formValueChange}
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
                marginLeft: "4%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Education Type
                </Typography>
                <TextField
                  variant="outlined"
                  name="location"
                  type="text"
                  placeholder="Text"
                  value={form.location}
                  onChange={formValueChange}
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
                margin: "0 0 0 3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Graduation (From)
                </Typography>
                <Select
                  value={form.qualification}
                  onChange={formValueChange}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  <MenuItem value={"MBBS"}>MBBS</MenuItem>
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
                  Graduation (To)
                </Typography>
                <Select
                  value={form.qualification}
                  onChange={formValueChange}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  <MenuItem value={"MBBS"}>MBBS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
                textAlign: "left",
              }}
            >
              <FormControl sx={{}} variant="standard">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "baseline",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "13px",
                    }}
                  />
                  PG Qualification
                </Box>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default EducationDetails;
