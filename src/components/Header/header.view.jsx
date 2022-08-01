import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, Navigate, useNavigate } from "react-router-dom";
import profileImg from "../../assets/profile.png";
import useAuth from "../../hooks/useAuth";
import header_logo from "../../assets/images/logo_medlink.png";

const navigations = [
  {
    label: "Jobs",
    path: "/",
  },
  {
    label: "Doctors",
    path: "/doctors",
  },
  {
    label: "Hospitals",
    path: "/hospitals",
  },
  {
    label: "Services",
    path: "/services",
  },
];

const mobileNavigations = [
  ...navigations,
  { label: "Hospital Login", path: "/hospital-login" },
];

const DrawerComponent = ({ openDrawer, setOpenDrawer }) => {
  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List sx={{ marginTop: "4rem" }}>
          {mobileNavigations.map((nav) => (
            <ListItem
              key={nav.label}
              onClick={() => setOpenDrawer(false)}
              component={Link}
              to={nav.path}
            >
              <ListItemText sx={{ padding: "0rem 2rem" }}>
                {nav.label}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const mobileView = useMediaQuery("(max-width:900px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, getUserProfile, logOut } = useAuth();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleLogOut = async (event) => {
    logOut();
    setAnchorEl(null);
    sessionStorage.clear();
    navigate("/login");
  }


  //TODO: 1. CHECK IF ACCESS TOKEN IS EXIST, IF IT DOESN'T REDIRECT TO LOGIN PAGE
  // 2. CALL GETUSER AND CHECK USERNAME . IF USERNAME DOESN'T EXIST REDIRECT TO LOGIN PAGE , IF ANY ERROR OCCURS REDIRECT TO LOGIN PAGE

  // Get user
  useEffect(() => {
    getUserProfile();
  }, []);


  let loggedUserName = user?.name;
 
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#ffffff", color: "var(--clr-gray-1)" }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBlock: "0.5rem",
        }}
      >
        <img style={{ width: "10rem", height: "auto" }} src={header_logo} alt="header_logo" />
        <List
          sx={
            mobileView
              ? { display: "none" }
              : {
                display: "flex",
                alignItems: "center",
                paddingBlock: 0,
                marginRight: "15rem",
              }
          }
        >
          {navigations?.map((nav) => (
            <ListItem key={nav?.label} component={Link} to={nav?.path}>
              <Typography component="subtitle2" sx={{ color: "#395987", fontWeight: "600" }}>{nav.label}</Typography>
            </ListItem>
          ))}
        </List>
        <Box sx={mobileView ? { display: "none" } : { display: "flex" }}>
          {loggedUserName ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton>
                <AccessAlarmIcon fontSize="medium" />
              </IconButton>
              <Box sx={{ position: "relative", margin: "auto" }}>
                <IconButton>
                  <NotificationsIcon sx={{ color: "#C7D3E3" }} fontSize="medium" />
                </IconButton>
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    position: "absolute",
                    top: 18,
                    right: 5,
                    transform: "translate(-50%, -50%)",
                    fontSize: "8px",
                    color: "#EB5757",
                  }}
                  className="strength-value"
                >
                  <CircleIcon fontSize="inherit" />
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                  src={profileImg}
                />
                <Typography variant="body1" sx={{ color: "Hi Manoj" }}>
                  Hi {loggedUserName}
                </Typography>
                <IconButton onClick={handleClick}>
                  <ArrowDropDownIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box sx={{ position: "relative", margin: "auto" }}>
                <IconButton>
                  <NotificationsIcon sx={{ color: "#C7D3E3" }} fontSize="medium" />
                </IconButton>
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    position: "absolute",
                    top: 18,
                    right: 4,
                    transform: "translate(-50%, -50%)",
                    fontSize: "9px",
                    color: "#EB5757",
                  }}
                  className="strength-value"
                >
                  <CircleIcon fontSize="inherit" />
                </Typography>
              </Box>
              <Button
                sx={{ px: 2, color: "#5A98F2", fontSize: "0.9rem", fontWeight: 600 }}
                variant="text"
                component={Link}
                to="/hospital-login"
              >
                Hospital Login
              </Button>
              <Button
                sx={{ px: 6, py: 1.2, color: "#5A98F2", borderRadius: 16, fontWeight: 600 }}
                variant="contained"
                component={Link}
                to="/login"
                className="hospital-login-btn"
              >
                Login/Register
              </Button>
            </Box>
          )}
          <Menu
            sx={{ marginTop: "15px" }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              component={Link}
              to="/account-settings"
              onClick={handleClose}
            >
              Account Setting
            </MenuItem>
            <MenuItem component={Link} to="/profile" onClick={handleClose}>
              Edit Profile
            </MenuItem>
            <MenuItem component={Link} to="/saved-jobs" onClick={handleClose}>
              Saved Jobs
            </MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </Box>
        <DrawerComponent
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
        <IconButton
          onClick={() => setOpenDrawer(!openDrawer)}
          sx={mobileView ? { display: "block" } : { display: "none" }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Container>
    </AppBar>
  );
};

export default Header;

