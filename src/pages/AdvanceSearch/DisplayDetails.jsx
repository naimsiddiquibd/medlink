import * as React from "react";
import { useState } from "react";
import { Grid, FormControl, Typography, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";

function CheckboxesGroup() {
  const [state, setState] = useState({
    verifiedmobilenumber: false,
    verifiedemailid: false,
    attachedresume: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { verifiedmobilenumber, verifiedemailid, attachedresume } = state;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <FormControlLabel
            style={{ marginRight: "40px", color: "#6F7482" }}
            control={
              <Checkbox
                checked={verifiedmobilenumber}
                onChange={handleChange}
                name="verifiedmobilenumber"
                sx={{ bgColor: "gray" }}
              />
            }
            label="Verified Mobile Number"
          />
          <FormControlLabel
            style={{ marginRight: "40px", color: "#6F7482" }}
            control={
              <Checkbox
                checked={verifiedemailid}
                onChange={handleChange}
                name="verifiedemailid"
              />
            }
            label="Verified Email ID"
          />
          <FormControlLabel
            style={{ color: "#6F7482" }}
            control={
              <Checkbox
                checked={attachedresume}
                onChange={handleChange}
                name="attachedresume"
              />
            }
            label="Attached Resume"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}

const DisplayDetails = () => {
  const [openDisplayDetails, setopenDisplayDetails] = useState(true);
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

  const handleDisplayDetails = () => {
    setopenDisplayDetails(!openDisplayDetails);
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
        marginBottom: "4rem",
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
              Display Details
            </Typography>
            {openDisplayDetails ? (
              <ExpandLess
                onClick={handleDisplayDetails}
                style={{ height: "35px", width: "40px" }}
              />
            ) : (
              <ExpandMore
                onClick={handleDisplayDetails}
                style={{ height: "35px", width: "40px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Collapse in={openDisplayDetails} timeout="auto" unmountOnExit>
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
              xs={11}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
              }}
            >
              <FormControl fullWidth>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Show
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="allcandidates"
                    control={<Radio />}
                    label="All Candidates"
                  />
                  <FormControlLabel
                    value="newtegistration"
                    control={<Radio />}
                    label="New Registration"
                    sx={{ ml: 6 }}
                  />
                  <FormControlLabel
                    value="modifiedcandidates"
                    control={<Radio />}
                    label="Modified Candidates"
                    sx={{ ml: 6 }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
              }}
            >
              <FormControl fullWidth>
                <CheckboxesGroup />
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
                  Job Types
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
                  Employment Type
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
              xs={11}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 0 0 3%",
                textAlign: "left",
              }}
            >
              <FormControl
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                }}
                variant="standard"
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "baseline",
                    alignItems: "center",
                    marginRight: "20px",
                    color: "#6F7482",
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
                  Search only premium resumes
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "baseline",
                    alignItems: "center",
                    marginLeft: "62px",
                    color: "#6F7482",
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
                  Search candidates can be contracted
                </Box>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default DisplayDetails;
