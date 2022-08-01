import {
  Container,
  FormHelperText,
  Box,
  Breadcrumbs,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  Input,
  Link,
  TextField,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import codesignimage from "../../../assets/codesign.svg";
import React from "react";

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
}));

const CreateSMS = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" sx={{ mb: 8 }}>
      <Box style={{ marginTop: "15px", marginBottom: "20px" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          style={{ marginBottom: "30px", marginTop: "15px" }}
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/jobs-and-responses">
            {"Resume Database"}
          </Link>
          <Link underline="hover" color="inherit" href="/sms-templates">
            {"SMS Templates"}
          </Link>
          <Typography color="text.secondary"> Create SMS Templates </Typography>
        </Breadcrumbs>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "24px",
              fontWeight: "500",
              color: "#333333",
              mb: 0,
            }}
          >
            Create SMS Templates
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#F2F2F2", pt: 1.5, pb: 4 }}>
        <Box>
          <FormControl sx={{ mr: 2, mx: 3 }} variant="outlined">
            <FormHelperText sx={{ ml: 0, fontSize: 12 }}>
              SMS Template Title
            </FormHelperText>
            <Input
              sx={{
                px: 1,
                py: 1,
                width: "300px",
                backgroundColor: "white",
                border: "2px solid #E0E0E0",
                borderRadius: "10px",
                borderBottom: "none",
              }}
              disableUnderline
              id="outlined-adornment-password"
              type="text"
              // value={values.password}
              // onChange={handleChange("password")}
              placeholder="Create folder..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {/* {values.searchUser} */}
                    {/* <SearchIcon /> */}
                  </IconButton>
                </InputAdornment>
              }
              label="Search User"
            />
          </FormControl>
        </Box>

        <hr
          color="#BDBDBD"
          height="10px"
          width="100%"
          style={{ marginTop: "14px", marginBottom: "25px" }}
        />

        <Box sx={{ bgcolor: "white", mx: 3, width: "70%" }}>
          <Button style={{ margin: "8px 0 0px 8px" }}>
            <Typography
              sx={{
                bgcolor: "#E0E0E0",
                color: "black",
                py: 0.6,
                px: 2,
                borderRadius: "8px",
              }}
            >
              <img src={codesignimage} alt="" /> Insert Shortcode
            </Typography>
          </Button>
          <hr
            color="#BDBDBD"
            height="10px"
            width="100%"
            style={{ marginTop: "6px", marginBottom: "0px" }}
          />
          <Box sx={{ width: "100%", bgcolor: "white" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              id="phoneNumber"
              disableUnderline={false}
              // label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              autoFocus
              rows={8}
              classes={{ notchedOutline: classes.input }}
              // onChange={handlePhoneNumberChange}
              className={classes.textField}
              placeholder="Phone Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <AccountCircle /> */}
                  </InputAdornment>
                ),
                classes: { notchedOutline: classes.noBorder },
              }}
            />
          </Box>

          {/* <FormControl
            sx={{ mr: 2, width: "100%", minHeight: "150px" }}
            variant="standard"
            multiline
          >
            <Input
              variant="outlined"
              multiline
              sx={{
                px: 1,
                py: 0.4,
                backgroundColor: "white",
                border: "none",
                borderRadius: "3px",
                borderBottom: "none",
              }}
              disableUnderline
              id="outlined-adornment-password"
              type="text"
              // value={values.password}
              // onChange={handleChange("password")}
              placeholder="Create folder..."
              label="Search User"
            />
          </FormControl> */}
        </Box>
        <Box sx={{ bgcolor: "#F2F2F2", mx: 3, mt: 8, width: "70%" }}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}
          >
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Save Template</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateSMS;
