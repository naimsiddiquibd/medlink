import {
  Container,
  Checkbox,
  Box,
  IconButton,
  Breadcrumbs,
  Typography,
  Link,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@material-ui/core";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import { createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import sortimage from "../../assets/Vector.png";
import Stack from "@mui/material/Stack";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";

const theme = createTheme();
const useStyles = makeStyles({
  table: {
    minWidth: "550px",
  },
  manageuser: {
    color: "#333333",
    fontSize: "24px",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  searchuser: {
    width: "235px",
    backgroundColor: "#E0E0E0",
    border: "none",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
    },
  },
  adduserbutton: {
    backgroundColor: "#4F4F4F",
    color: "white",
  },
  actionbutton: {
    color: "black",
  },
  tablebodyrow: {
    backgroundColor: "#F2F2F2",
    height: "70px !important",
  },

  tabledata: {
    height: "60px",
    color: "red",
  },
  pagination: {
    [theme.breakpoints.down("sm")]: {
      minWidth: "550px",
    },
  },
});

const options = ["None", "Atria", "Callisto"];

const ITEM_HEIGHT = 48;

function IconLabelButtons() {
  return (
    <Stack direction="row">
      <Button
        style={{
          backgroundColor: "#E0E0E0",
          padding: "0 15px 0 15px",
        }}
        startIcon={<FilterAltTwoToneIcon style={{ color: "#323232" }} />}
      >
        <p style={{ color: "black" }}>Filter </p>
      </Button>
    </Stack>
  );
}

function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

function createData(name, savedby, date) {
  return { name, savedby, date };
}
let rows = [
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
];

export default function SavedSearches() {
  const classes = useStyles();
  const [users, setUsers] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <Typography color="text.secondary"> Saved Searches </Typography>
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
              mb: 6,
            }}
          >
            Saved Searches
          </Typography>
          <IconLabelButtons />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#E0E0E0",
                color: "black",
              }}
            >
              <TableCell style={{ width: "60px" }}>
                <Checkbox />
              </TableCell>
              <TableCell
                style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
              >
                Title
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                Saved By
              </TableCell>

              <TableCell align="center" style={{ fontWeight: 600 }}>
                Date
                <img
                  style={{
                    marginLeft: "10px",
                    height: "15px",
                    width: "13px",
                  }}
                  src={sortimage}
                  alt=""
                />
              </TableCell>
              <TableCell align="center" style={{ width: "60px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.name}
                  className={classes.tablebodyrow}
                  style={{ padding: "0px", margin: "0px" }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "70px" }}
                  >
                    <Checkbox />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.savedby}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ padding: "0px", margin: "0px", width: "60px" }}
                  >
                    <LongMenu />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* <Divider sx={{ m: 0 }} /> */}
        <TablePagination
          className={classes.pagination}
          style={{ backgroundColor: "#F2F2F2", width: "inherit" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}
