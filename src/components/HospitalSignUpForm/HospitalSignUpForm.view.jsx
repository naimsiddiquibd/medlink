import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate, useParams } from "react-router-dom";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./HospitalSignUpForm.css";
import useAuth from "../../hooks/useAuth";
import { gqlquery } from "../../api/hospitalIndex";

var __ss = null;

const SignupGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#80828282",
    textAlign: "center",
    paddingBlock: "5rem",
}));

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });
var __currentUserEmail = "";
var poolData = {
    UserPoolId: "ap-south-1_Kzq9AAneD",
    ClientId: "7s0nq4fuhmi2b95ddtl8f5ipg3",
};

const HospitalSignUpForm = (props) => {
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
    const [emailByLink, setEmaiBylLink] = useState([]);
    const [emailCode, setEmailCode] = useState("");
    const { getUserProfile } = useAuth();
    const { loginCode } = useParams();

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleConfirmationCode = (prop) => (event) => {
        setConfirmEmailCode({ ...confirmEmailCode, [prop]: event.target.value });
    };

    useEffect(() => {
        const QUERY_ADDSIGNUPUSER = {
            query: `query MyQuery {
                getSignupUser (loginCode : "${loginCode}") {
                    accessJobPosting
                    accessResumeDB
                    email
                    hospitalID
                    huID
                   }
                }`
        };
        gqlquery(QUERY_ADDSIGNUPUSER, null)
            .then((res) => res.json())
            .then((datas) => setEmaiBylLink(datas?.data?.getSignupUser))
        // .finally((e) => setIsLoading(false));
    }, [])

    const handleSubmit = async (e) => {
        if (emailByLink?.email) {
            __currentUserEmail = emailByLink?.email;
        } else {
            __currentUserEmail = values.email;
            setEmailCode(__currentUserEmail);
        }

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
            if (res?.CodeDeliveryDetails?.AttributeName === "email") {
                setRecievedCode(res?.CodeDeliveryDetails?.Destination)
            }
        } catch (err) {
            setError(err.message);
            console.log(err);
        }

        setValues({
            password: "",
            confirmpassword: "",
        });

        setError("");
    };

    const handleConfirmEmailSubmit = async (e) => {
        try {
            if (emailByLink?.email) {
                __currentUserEmail = emailByLink?.email;
                handleChange("email");
            } else {
                __currentUserEmail = emailCode;
                handleChange("email");
            }

            console.log("empty", values.email);
            var signUpParams = {
                ClientId: poolData.ClientId,
                UserPoolId: poolData.UserPoolId,
                Username: __currentUserEmail,
                ConfirmationCode: confirmEmailCode.code,
            };
            console.log(signUpParams);
            const res = await provider.confirmSignUp(signUpParams);
            console.log("confirm email submit", res)
            if (res?.$metadata?.requestId) {
                return navigate("/hospital-login");
            }
        } catch (err) {
            console.log(err)
            if (err.message.includes("Invalid JSON")) {
                return navigate("/hospital-login");
            }
            return setError(err.message);
        }
        setError("");
    };

    const handleLogIn = async (e) => {
        console.log(values.email, values.password);
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
            sessionStorage.setItem("accessToken", access_token);
            console.log("from inside login button", access_token);
        } catch (error) {
            setError(error.message);
            setLoader(false);
        }

        if (access_token) {
            getUserProfile();
            return navigate("/hospital-basic-details");
        }
    };

    return (
        <SignupGrid item xs className="doctor-signup">
            {recievedCode ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        borderRadius: "6px",
                        marginTop: "1.5rem",
                        padding: "0.5rem 1rem",
                    }}
                >
                    <FormControl sx={{ mr: 0 }} variant="standard">
                        <FormHelperText>Email Confirmation Code </FormHelperText>
                        <Input
                            sx={{
                                mb: 1,
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                backgroundColor: "var(--clr-white)",
                            }}
                            disableUnderline
                            id="outlined-adornment-password"
                            type="number"
                            // value={values.confirmcode}
                            onChange={handleConfirmationCode("code")}
                            placeholder="Confirmation Code"
                            style={{ borderBottom: "none" }}
                            endAdornment={
                                <InputAdornment position="end" style={{ outline: "none" }}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    ></IconButton>
                                </InputAdornment>
                            }
                            label="Search User"
                        />
                    </FormControl>
                    {error && (
                        <Typography
                            sx={{
                                color: "red",
                                textAlign: "left",
                                mt: -2,
                                mb: 2,
                                width: "318px",
                            }}
                        >
                            {error}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={handleConfirmEmailSubmit}
                        sx={{ padding: "0.5rem 0.5rem", margin: "0rem" }}
                    >
                        Confirm Email
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{ fontSize: "24px", fontWeight: "600", color: "#333333" }}
                    >
                        {props.pageType === "HospitalSignUp" && "Hospital Sign Up"}
                        {props.pageType === "HospitalLogIn" && "Hospital Log In"}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            borderRadius: "6px",
                            marginTop: "1.5rem",
                            padding: "0.5rem 1rem",
                            width: "350px",
                        }}
                    >

                        {props.pageType === "Create New Password" || emailByLink?.email ?
                            <FormControl sx={{ mr: 0 }} variant="standard">
                                <FormHelperText>Email ID</FormHelperText>
                                <Input
                                    sx={{
                                        mb: 1,
                                        px: 2,
                                        py: 1,
                                        borderRadius: 1,
                                        backgroundColor: "var(--clr-white)",
                                    }}
                                    disableUnderline
                                    id="outlined-adornment-password"
                                    type="email"
                                    value={emailByLink?.email}
                                    disabled
                                    onChange={handleChange("email")}
                                    placeholder="Email"
                                    style={{ borderBottom: "none" }}
                                    label="Your Email"
                                />
                            </FormControl>
                            :
                            <FormControl sx={{ mr: 0 }} variant="standard">
                                <FormHelperText>Email ID</FormHelperText>
                                <Input
                                    sx={{
                                        mb: 1,
                                        px: 2,
                                        py: 1,
                                        borderRadius: 1,
                                        backgroundColor: "var(--clr-white)",
                                    }}
                                    disableUnderline
                                    id="outlined-adornment-password"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange("email")}
                                    placeholder="Email"
                                    style={{ borderBottom: "none" }}
                                    label="Your Email"
                                />
                            </FormControl>
                        }

                        {props.pageType === "Forgot Password" || (
                            <FormControl sx={{ mr: 0 }} variant="standard">
                                <FormHelperText>
                                    {props.pageType === "Create New Password"
                                        ? "New Password"
                                        : "Password"}
                                </FormHelperText>
                                <Input
                                    sx={{
                                        mb: 1,
                                        px: 2,
                                        py: 1,
                                        borderRadius: 1,
                                        backgroundColor: "var(--clr-white)",
                                    }}
                                    disableUnderline
                                    id="outlined-adornment-password"
                                    value={values.password}
                                    onChange={handleChange("password")}
                                    placeholder="Password"
                                    style={{ borderBottom: "none" }}
                                    label="Search User"
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
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {props.pageType === "HospitalLogIn" && (
                                    <Typography
                                        sx={{
                                            textAlign: "right",
                                            fontWeight: 500,
                                            color: "#4F4F4F",
                                            textDecoration: "underline",
                                            mb: 2,
                                        }}
                                        component={Link}
                                        to="/forgot-password"
                                    >
                                        Forgot Password
                                    </Typography>
                                )}
                            </FormControl>
                        )}
                        {forgotPassword && (
                            <FormControl sx={{ mr: 0 }} variant="standard">
                                <FormHelperText>Code</FormHelperText>
                                <Input
                                    sx={{
                                        mb: 1,
                                        px: 2,
                                        py: 1,
                                        borderRadius: 1,
                                        backgroundColor: "var(--clr-white)",
                                    }}
                                    disableUnderline
                                    id="outlined-adornment-password"
                                    type="number"
                                    value={values.password}
                                    onChange={handleChange("password")}
                                    placeholder="Enter Code"
                                    style={{ borderBottom: "none" }}
                                    label="Code"
                                />
                                <Typography
                                    sx={{
                                        textAlign: "right",
                                        fontWeight: 500,
                                        color: "#4F4F4F",
                                        textDecoration: "underline",
                                        mb: 2,
                                    }}
                                    onClick={() => setForgotPassword("")}
                                    component={Link}
                                    to="/forgot-password"
                                >
                                    Resend Code
                                </Typography>
                            </FormControl>
                        )}
                        {props.pageType === "HospitalLogIn" ||
                            props.pageType === "Forgot Password" || (
                                <FormControl sx={{ mr: 0 }} variant="standard">
                                    <FormHelperText>Confirm Password</FormHelperText>
                                    <Input
                                        sx={{
                                            mb: 1,
                                            px: 2,
                                            py: 1,
                                            borderRadius: 1,
                                            backgroundColor: "var(--clr-white)",
                                        }}
                                        disableUnderline
                                        id="outlined-adornment-password"
                                        value={values.confirmpassword}
                                        onChange={handleChange("confirmpassword")}
                                        placeholder="Confirm password"
                                        style={{ borderBottom: "none" }}
                                        label="Search User"
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
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            )}
                        {error && (
                            <Typography
                                sx={{ color: "red", textAlign: "left", mt: -2, mb: 2 }}
                            >
                                {error}
                            </Typography>
                        )}
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
                        {props.pageType === "HospitalLogIn" && (
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={handleLogIn}
                                sx={{ padding: "0.5rem 0.5rem", margin: "0rem" }}
                            >
                                {loader ? (
                                    <CircularProgress sx={{ height: 0 }} color="inherit" />
                                ) : (
                                    "Log In"
                                )}
                            </Button>
                        )}
                        {props.pageType === "HospitalSignUp" && (
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={handleSubmit}
                                sx={{ padding: "0.5rem 0.5rem", margin: "0rem" }}
                            >
                                Sign Up
                            </Button>
                        )}

                        {props.pageType === "Forgot Password" && forgotPassword === "" && (
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={() => setForgotPassword("true")}
                                sx={{ padding: "0.5rem 0.5rem", margin: "0rem" }}
                            >
                                Get Code
                            </Button>
                        )}
                        {forgotPassword === "true" && (
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={() => setForgotPassword("setPassword")}
                                sx={{ padding: "0.5rem 0.5rem", margin: "0rem" }}
                                component={Link}
                                to="/create-new-password"
                            >
                                Submit
                            </Button>
                        )}
                        {props.pageType === "Create New Password" && (
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={() => setForgotPassword("")}
                                sx={{ padding: "0.5rem 0.5rem", margin: "0rem" }}
                                component={Link}
                                to="/login"
                            >
                                Reset Password
                            </Button>
                        )}
                    </Box>

                    {props.pageType === "HospitalSignUp" && (
                        <Typography
                            variant="p"
                            component="p"
                            sx={{ color: "#333333", marginBlock: "4rem" }}
                        >
                            Already have an Account?
                            <Typography
                                variant="p"
                                component={Link}
                                to="/hospital-login"
                                sx={{ fontWeight: 700, textDecoration: "underline", ml: 0.5 }}
                            >
                                Sign In
                            </Typography>
                        </Typography>
                    )}

                    {props.pageType === "HospitalLogIn" && (
                        <Typography
                            variant="p"
                            component="p"
                            sx={{ color: "#333333", marginBlock: "4rem" }}
                        >
                            Don't have an account?
                            <Typography
                                variant="p"
                                component={Link}
                                to="/hospital-signup"
                                sx={{ fontWeight: 700, textDecoration: "underline", ml: 0.5 }}
                            >
                                Sign Up
                            </Typography>
                        </Typography>
                    )}
                </Box>
            )}
        </SignupGrid>
    );
};

export default HospitalSignUpForm;
