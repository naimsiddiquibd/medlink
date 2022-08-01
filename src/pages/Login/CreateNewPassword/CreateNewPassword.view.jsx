import { Box, Grid } from "@mui/material";
import { SignupForm, Welcome } from "../../../components";

const CreateNewPassword = () => {
  const banner_text = "Welcome";
  return (
    <Box maxWidth="xl" sx={{ backgroundColor: "#F0F6FE", mx: "auto", padding: "1rem 4rem 3rem" }}>
      <Grid
        container
        spacing={8}
        justifyContent="space-between"
      >
        <Grid item xs={4}><SignupForm pageType="Create New Password" /></Grid>
        <Grid item xs={8}><Welcome text={banner_text} /></Grid>
      </Grid>
    </Box>
  );
};

export default CreateNewPassword;
