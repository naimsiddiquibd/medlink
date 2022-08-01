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
  statusbutton: {
    color: "white",
    "&:hover": {
      color: "black",
    },
  },
  pagination: {
    [theme.breakpoints.down("sm")]: {
      minWidth: "550px",
    },
  },
});

function IconLabelButtons() {
  return (
    <Stack direction="row">
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

function createData(
  productdetails,
  transactionid,
  date,
  status,
  amount,
  invoice
) {
  return { productdetails, transactionid, date, status, amount, invoice };
}
let rows = [
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Active",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Active",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Active",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Active",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
];

export default function SubscriptionStatus() {
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
    <Container maxWidth="xl" sx={{ mb: 8 }}>
      <Box style={{ marginTop: "15px", marginBottom: "20px" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ marginTop: "4%" }}
          style={{ marginBottom: "30px" }}
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/jobs-and-responses">
            {"Profile"}
          </Link>
          <Typography color="text.secondary">Subscription Status </Typography>
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
            Subscription Status
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
              <TableCell align="center" style={{ width: "70px" }}>
                <Checkbox />
              </TableCell>
              <TableCell
                style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
              >
                Product Details
              </TableCell>
              <TableCell
                align="left"
                style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
              >
                Transaction ID
              </TableCell>
              <TableCell
                align="left"
                style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
              >
                Date
              </TableCell>
              <TableCell
                align="left"
                style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
              >
                Amount
              </TableCell>
              <TableCell
                align="left"
                style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
              >
                Status
              </TableCell>
              <TableCell
                align="left"
                style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
              >
                Invoice
              </TableCell>
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
                    align="center"
                    style={{ padding: "0px", margin: "0px", width: "70px" }}
                  >
                    <Checkbox />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.productdetails}
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.transactionid}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.amount}/-
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row.status === "Active" ? (
                      <Button
                        style={{
                          backgroundColor: "#828282",
                          borderRadius: "24px",
                          padding: "4px 18px 4px 18px",
                        }}
                      >
                        <p className={classes.statusbutton}>{row.status}</p>
                      </Button>
                    ) : (
                      <Button
                        style={{
                          backgroundColor: "#BDBDBD",
                          borderRadius: "24px",
                          padding: "4px 18px 4px 18px",
                        }}
                      >
                        <p className={classes.statusbutton}>{row.status}</p>
                      </Button>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    <Typography underline="always" color="text.secondary">
                      <Link href="#" color="inherit">
                        {"Download"}
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
