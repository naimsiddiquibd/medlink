import {
  Container,
  Checkbox,
  Box,
  Breadcrumbs,
  Typography,
  Link,
} from "@mui/material";
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
import Stack from "@mui/material/Stack";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import { useNavigate } from "react-router-dom";

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

function IconLabelButtons() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-email");
  };
  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={handleClick}
        variant="contained"
        style={{ borderRadius: "8px", fontSize: "16px", fontWeight: 500 }}
      >
        Create
      </Button>
      <Button
        style={{
          backgroundColor: "#E0E0E0",
          padding: "0 15px 0 15px",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "14px",
        }}
        startIcon={<FilterAltTwoToneIcon style={{ color: "#323232" }} />}
      >
        <p style={{ color: "black" }}>Filter </p>
      </Button>
    </Stack>
  );
}

function createData(emailtemplates, lastupdatedby, date) {
  return { emailtemplates, lastupdatedby, date };
}
let rows = [
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
];

export default function EmailTemplates() {
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
          <Typography color="text.secondary"> Email Templates </Typography>
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
            Email
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
                Folder Name
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                Last Updated By
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                Date
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                --------- Folder Actions ---------
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.emailtemplates}
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
                    {row.emailtemplates}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.lastupdatedby}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    <Typography underline="always" color="text.secondary">
                      <Link href="#" color="inherit">
                        {"View/Edit"}
                      </Link>
                      &nbsp; &nbsp; &nbsp;
                      <Link href="#" color="inherit">
                        {"Delete"}
                      </Link>
                    </Typography>
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
