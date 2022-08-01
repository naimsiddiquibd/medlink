import * as React from "react";
import { useState } from "react";
import { 
  Grid,
  FormControl,
  Typography, 
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
import FormLabel from "@mui/material/FormLabel"; 

const AddtionalDetails = () => {
  const [openAdditionalDetails, setopenAdditionalDetails] = useState(true);
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

  const handleAdditionalDetails = () => {
    setopenAdditionalDetails(!openAdditionalDetails);
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
              Additional Details
            </Typography>
            {openAdditionalDetails ? (
              <ExpandLess
                onClick={handleAdditionalDetails}
                style={{ height: "35px", width: "40px" }}
              />
            ) : (
              <ExpandMore
                onClick={handleAdditionalDetails}
                style={{ height: "35px", width: "40px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Collapse in={openAdditionalDetails} timeout="auto" unmountOnExit>
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
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="both"
                    control={<Radio />}
                    label="Both"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    sx={{ ml: 6 }}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    sx={{ ml: 6 }}
                  />
                </RadioGroup>
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
                  Age
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
                  Age
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
                margin: "0 0 0 3%",
              }}
            >
              <FormControl fullWidth>
                <Typography variant="p" sx={{ textAlign: "left" }}>
                  Work Status For
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
                  Work Permit For
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
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default AddtionalDetails;
