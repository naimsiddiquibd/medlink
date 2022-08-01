import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SignupForm.css";
import useAuth from "../../hooks/useAuth";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// var __ss = null;

const SignupGrid = styled(Grid)(() => ({
  backgroundColor: "var(--clr-white)",
  boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
  borderRadius: "6px",
  padding: "20px 39px 40px"
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });
var __currentUserEmail = "";
var poolData = {
  UserPoolId: "ap-south-1_qCVmk3Gr1",
  ClientId: "4mb15m3s257i8lh7d7ts15irtt",
};

const SignupForm = (props) => {
  const navigate = useNavigate(false);
  const [loader, setLoader] = useState();
  const [error, setError] = useState("");
  const [strongPassword, setStrongPassword] = useState("");
  const [weakPassword, setWeakPassword] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [recievedCode, setRecievedCode] = useState(null);
  const [confirmEmailCode, setConfirmEmailCode] = useState({});
  const [forgotPassword, setForgotPassword] = useState("");
  const { getUserProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
    console.log("check", values);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // console.log(forgotPassword);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleConfirmationCode = (prop) => (event) => {
    setConfirmEmailCode({ ...confirmEmailCode, [prop]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleNavigateRegister = () => {
    navigate("/login");
  }

  const handleNavigateLogin = () => {
    navigate("/signup2");
  }

  const handleSubmit = async (e) => {
    __currentUserEmail = values.email;
    setError("");
    setStrongPassword("");
    setWeakPassword("");
    let finalpassword;
    if (
      values.email === "" &&
      values.password === "" &&
      values.confirmpassword === ""
    ) {
      return setError("Email and password is mandatory!");
    }

    if (values.password == values.confirmpassword) {
      finalpassword = values.password;
    } else {
      setError("Password didn't match.");
      return;
    }

    let regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (regex.test(finalpassword)) {
      setStrongPassword("Your password is strong");
    } else {
      setWeakPassword("Your password is not strong enough");
      return;
    }

    var signUpParams = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: poolData.ClientId,
      UserPoolId: poolData.UserPoolId,
      Username: __currentUserEmail,
      Password: values.password,
    };

    try {
      const res = await provider.signUp(signUpParams);
      console.log("this is sign up response", res);
      setRecievedCode(res);
    } catch (err) {
      setError(err.message);
      setOpen(true);
      console.log(err);
    }

    const res = await provider.signUp(signUpParams);
    console.log("this is sign up response", res);
    setRecievedCode(res);
    setValues({
      email: "",
      password: "",
      confirmpassword: "",
    });
    setError("");
  };

  const handleConfirmEmailSubmit = async (e) => {
    try {
      __currentUserEmail = values.email;
      var signUpParams = {
        ClientId: poolData.ClientId,
        UserPoolId: poolData.UserPoolId,
        Username: __currentUserEmail,
        ConfirmationCode: confirmEmailCode.code,
      };
      console.log(signUpParams);
      const res = await provider.confirmSignUp(signUpParams);
      console.log(
        "this is confirm sign up response",
        res,
        res?.$metadata?.requestId
      );
      setError("");
      if (res?.$metadata?.requestId) {
        setRegisterSuccess(true);
        setOpen(true);
        setTimeout(handleNavigateRegister, 3000)
      }
    } catch (err) {
      setOpen(true);
      return setError(err.message);
    }
  };

  const handleLogIn = async (e) => {
    console.log(image.png, values.password);
    setError("");
    if (values.email === "" && values.password === "") {
      return setError("Email and password is mandatory!");
    }
    var logInParams = {
      ClientId: poolData.ClientId,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: values.email,
        PASSWORD: values.password,
      },
    };

    setLoader(true);

    try {
      const res = await provider.initiateAuth(logInParams);
      var access_token = res["AuthenticationResult"]["AccessToken"];
      var idToken = res["AuthenticationResult"]["IdToken"];
      var refreshToken = res["AuthenticationResult"]["RefreshToken"];
      sessionStorage.setItem("accessToken", access_token);
      sessionStorage.setItem("idToken", idToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      setLoginSuccess(true);
      setOpen(true);
    } catch (error) {
      setOpen(true);
      setError(error.message);
      setLoader(false);
    }

    if (access_token) {
      getUserProfile();
      setTimeout(handleNavigateLogin, 1500);
    }
  };

  return (
    <SignupGrid item className="doctor-signup">
      {recievedCode ? (
        <Box
          sx={{
            height: "550px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            pt: 8,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: "24px", fontWeight: "600", color: "var(--clr-blue-footer)", textAlign: "center", mb: 3 }}
          >
            Verify Email
          </Typography>
          <Box>
            <InputLabel sx={{ py: 0.5 }}>
              Email Confirmation Code
            </InputLabel>
            <Input
              sx={{
                borderRadius: 1,
              }}
              disableUnderline
              fullWidth
              onChange={handleConfirmationCode("code")}
              placeholder="Confirmation Code"
              type="number"
              endAdornment={
                <InputAdornment position="end" style={{ outline: "none" }}>
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  ></IconButton>
                </InputAdornment>
              }
            />
            {error && (
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  {error}
                </Alert>

              </Snackbar>
            )}
          </Box>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={handleConfirmEmailSubmit}
            sx={{ p: 1, borderRadius: 16 }}
          >
            Confirm Email
          </Button>

        </Box>
      ) : (
        <Box sx={{
          height: "550px",
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          justifyContent: "space-between"

        }}>
          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: "24px", fontWeight: "600", color: "var(--clr-blue-footer)", textAlign: "center" }}
            >
              {props.pageType}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                borderRadius: "6px",
                marginTop: "1.5rem",
              }}
            >
              {props.pageType === "Create New Password" || (
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>Email ID</InputLabel>
                  <Input
                    sx={{
                      borderRadius: 1,
                    }}
                    disableUnderline
                    type="email"
                    // value={values.email}
                    onChange={handleChange("email")}
                    placeholder="Enter Your Email ID"
                    fullWidth
                  />
                </Box>
              )}

              {props.pageType === "Forgot Password" || (
                <Box>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      {props.pageType === "Create New Password"
                        ? "New Password"
                        : "Password"}
                    </InputLabel>
                    <Input
                      sx={{
                        borderRadius: 1,
                      }}
                      disableUnderline
                      fullWidth
                      value={values.password}
                      onChange={handleChange("password")}
                      placeholder={props.pageType === "Create New Password"
                        ? "Create Password"
                        : "Enter Password"}
                      type={values.showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff sx={{ color: "var(--clr-blue-footer)" }} />
                            ) : (
                              <Visibility sx={{ color: "var(--clr-blue-footer)" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Box>

                  {props.pageType === "Login" && (
                    <Box sx={{ textAlign: "right", textDecoration: "underline", my: 1, }}>
                      <Typography
                        sx={{
                          color: "var(--clr-blue-footer)",
                          fontWeight: 600
                        }}
                        variant="subtitle2"
                        component={Link}
                        to="/forgot-password"
                      >
                        Forgot Password?
                      </Typography>
                    </Box>
                  )}
                </Box>

              )}
              {forgotPassword && (
                <Box>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>Code</InputLabel>
                    <Input
                      sx={{
                        borderRadius: 1,
                      }}
                      disableUnderline
                      fullWidth
                      type="number"
                      value={values.password}
                      onChange={handleChange("password")}
                      placeholder="Enter Code"
                    />
                  </Box>
                  <Box sx={{ textAlign: "right", textDecoration: "underline", my: 1, }}>
                    <Typography
                      sx={{
                        color: "var(--clr-blue-footer)",
                        fontWeight: 600
                      }}
                      variant="subtitle2"
                      component={Link}
                      to="/forgot-password"
                      onClick={() => setForgotPassword("")}
                    >
                      Resend Code
                    </Typography>
                  </Box>
                </Box>
              )}
              {props.pageType === "Login" ||
                props.pageType === "Forgot Password" || (
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Confirm Password
                    </InputLabel>
                    <Input
                      sx={{
                        borderRadius: 1,
                      }}
                      disableUnderline
                      fullWidth
                      value={values.confirmpassword}
                      onChange={handleChange("confirmpassword")}
                      placeholder="Confirm password"

                      type={values.showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff sx={{ color: "var(--clr-blue-footer)" }} />
                            ) : (
                              <Visibility sx={{ color: "var(--clr-blue-footer)" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Box>
                )}
              {error && (
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                  </Alert>
                </Snackbar>
              )}
              {/* <Typography
                sx={{ color: "red", textAlign: "left", mt: -2, mb: 2 }}
              >
                {error}
              </Typography> */}

              {strongPassword && (
                <Typography
                  sx={{ color: "green", textAlign: "left", mt: -2, mb: 2 }}
                >
                  {strongPassword}
                </Typography>
              )}
              {weakPassword && (
                <Typography
                  sx={{ color: "red", textAlign: "left", mt: -2, mb: 2 }}
                >
                  {weakPassword}
                </Typography>
              )}
              {props.pageType === "Login" && (
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleLogIn}
                  sx={{ p: 1, my: 2, borderRadius: 16 }}
                >
                  {loader ? (
                    <CircularProgress sx={{ height: 0 }} color="inherit" />
                  ) : (
                    "Log In"
                  )}
                </Button>
              )}
              {props.pageType === "Register" && (
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                  sx={{ p: 1, my: 3, borderRadius: 16 }}
                >
                  Sign Up
                </Button>
              )}

              {props.pageType === "Forgot Password" && forgotPassword === "" && (
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => setForgotPassword("true")}
                  sx={{ p: 1, my: 3, borderRadius: 16 }}
                >
                  Get Code
                </Button>
              )}
              {forgotPassword === "true" && (
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => setForgotPassword("setPassword")}
                  component={Link}
                  to="/create-new-password"
                  sx={{ p: 1, my: 2, borderRadius: 16 }}
                >
                  Submit
                </Button>
              )}
              {props.pageType === "Create New Password" && (
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => setForgotPassword("")}
                  sx={{ p: 1, my: 3, borderRadius: 16 }}
                  component={Link}
                  to="/login"
                >
                  Reset Password
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", }} >
            {props.pageType === "Register" && (
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: "#333333", fontSize: "1rem" }}
                >
                  Already have an Account?
                </Typography>
                <Button
                  variant="text"
                  component={Link}
                  to="/login"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >Sign In</Button>
              </Box>
            )}
            {props.pageType === "Login" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: "#333333", fontSize: "1rem" }}
                >
                  Don't have an account?
                </Typography>
                <Button
                  variant="text"
                  component={Link}
                  to="/signup"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
            {props.pageType === "Forgot Password" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: "#333333", fontSize: "1rem" }}
                >
                  Don't have an account?
                </Typography>
                <Button
                  variant="text"
                  component={Link}
                  to="/signup"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
            {props.pageType === "Create New Password" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: "#333333", fontSize: "1rem" }}
                >
                  Don't have an account?
                </Typography>
                <Button
                  variant="text"
                  component={Link}
                  to="/signup"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
      {registerSuccess && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Congratulation! Your account has been created.
          </Alert>

        </Snackbar>
      )}
      {loginSuccess && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Congratulation! Login is successful.
          </Alert>
        </Snackbar>
      )}
    </SignupGrid>
  );
};

export default SignupForm;
