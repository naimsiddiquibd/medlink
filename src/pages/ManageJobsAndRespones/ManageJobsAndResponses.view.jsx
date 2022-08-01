import {
  Container,
  Checkbox,
  Box,
  IconButton,
  Breadcrumbs,
  Typography,
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
import React, { useEffect, useState } from "react";
import { gqlquery, QUERY_VACANCIES } from "../../api/hospitalIndex.js";
import { Link } from "react-router-dom";

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

const options = ["Edit", "Close Job", "Send Email"];

const ITEM_HEIGHT = 48;

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

export default function ManageJobAndResponses() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    gqlquery(QUERY_VACANCIES, null)
      .then((res) => res.json())
      .then((datas) => setVacancies(datas?.data?.getVacancies));
  }, []);

  console.log(vacancies);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const newVacancies = vacancies?.map((vacancie) => {
    const date = new Date(vacancie?.postedOn)
    const newDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).split(' ').join('-');
    return {
      postedOn: newDate,
      jobTitle: vacancie?.jobTitle,
      vacancyType: vacancie?.vacancyType,
      responses: vacancie?.responses,
      vacancyID: vacancie?.vacancyID
    }
  })

  return (
    <Container maxWidth="md" sx={{ mb: 8 }}>
      <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ marginTop: "4%" }}
          style={{ marginBottom: "30px" }}
        >
          <Link underline="hover" color="inherit" to="/hospital-dashboard">
            Home
          </Link>
          <Link underline="hover" color="inherit" to="/manage-jobs-and-responses">
            {"Manage Jobs & Responses"}
          </Link>
        </Breadcrumbs>
        <Typography
          variant="p"
          sx={{ fontSize: "24px", fontWeight: "500", color: "#333333", mb: 6 }}
        >
          Manage Jobs & Responses
        </Typography>
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
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell
                style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
              >
                Job Title
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                Job Type
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                Posted BY
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                Posted Date
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                <Button
                  className={classes.actionbutton}
                  variant=""
                  style={{ padding: "5px 10px 5px 10px" }}
                >
                  Responses
                </Button>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newVacancies
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((vacancie, index) =>
                <TableRow
                  key={vacancie?.jobTitle}
                  className={classes?.tablebodyrow}
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
                    <Link to={`/job-title/${vacancie?.vacancyID}`} state={{ jobTitle: vacancie.jobTitle }}> {vacancie.jobTitle}</Link>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {vacancie?.vacancyType}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#C4C4C4",
                        borderRadius: "24px",
                      }}
                    >
                      <p style={{ color: "black" }}>You</p>
                    </Button>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {vacancie?.postedOn}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {vacancie?.responses}
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{ padding: "0px", margin: "0px" }}
                  >
                    <LongMenu />
                  </TableCell>
                </TableRow>
              )}

          </TableBody>
        </Table>
        {/* <Divider sx={{ m: 0 }} /> */}
        <TablePagination
          className={classes.pagination}
          style={{ backgroundColor: "#F2F2F2", width: "inherit" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={vacancies?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}
