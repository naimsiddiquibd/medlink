import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import welcomeBanner from "../../assets/images/SignUp_illustration.png"

const theme = createTheme();
const useStyles = makeStyles({
  welcomesection: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
});

const WelcomeGrid = styled(Grid)(() => ({
  display: "grid",
  placeItems: "center",
  position: "relative",
  textAlign: "center",
  "&::before": {
    content: '""',
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
    opacity: 0.7,
  },
}));

const Welcome = (props) => {
  const classes = useStyles();

  return (
    <WelcomeGrid item xs={12} className={classes.welcomesection}>
      <Box sx={{ mx: "auto" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: "24px", fontWeight: "600", color: "var(--clr-blue-footer)", my:2.5 }}
        >
          {props.text}
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{ color: "var(--clr-gray-2)", fontSize: "16px", lineHeight: "24px", mb: 3 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
          quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
          temporibus animi, sint perspiciatis facilis architecto magnam
          perferendis, excepturi nemo.
        </Typography>
        <Box sx={{mb: 0, px: 15}}>
          <img style={{width: "100%"}} src={welcomeBanner} alt="Welcome_Banner" />
        </Box>
      </Box>
    </WelcomeGrid>
  );
};

export default Welcome;
