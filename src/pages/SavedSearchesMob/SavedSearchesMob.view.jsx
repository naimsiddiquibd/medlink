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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const theme = createTheme();
const useStyles = makeStyles({});

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

export default function SavedSearchesMob() {
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
    <Box sx={{ mb: 8 }}>
      <Box
        sx={{
          backgroundColor: "#E0E0E0",
          //   padding: "12px 0 12px 17px",
          py: 2,
          pl: 2,
          pr: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <ChevronLeftIcon style={{ height: "35px", width: "35px" }} />
            <Typography
              style={{
                lineHeight: "24px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Saved Searches
            </Typography>
          </Box>
        </Box>
        <Box>
          <FilterAltTwoToneIcon style={{ color: "#323232" }} />
        </Box>
      </Box>
      <Box sx={{ height: 48 }}></Box>

      <TableContainer component={Paper}>
        <TableContainer
          component={Paper}
          style={{ padding: "0px 16px 0px 16px" }}
        >
          <Table aria-label="simple table">
            <TableBody sx={{}}>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row.name}
                    style={{
                      backgroundColor: "#F2F2F2",
                      boxShadow: "0px 6px 12px 0px #B3B3B359",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 1.3,
                        pb: 0.4,
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#4F4F4F",
                        }}
                      >
                        {row.name}
                      </Typography>
                      <Box style={{ marginRight: "-10px" }}>
                        <LongMenu style={{ marginRight: "-10px" }} />
                      </Box>
                    </Box>
                    <Box sx={{ px: 1.3, pb: 0.4 }}>
                      {/* row 1 */}
                      <Box
                        sx={{
                          display: "grid",
                          columnGap: 3,
                          rowGap: 1,
                          gridTemplateColumns: "repeat(2, 1fr)",
                          mb: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              marginBottom: "6px",
                              color: "#828282",
                            }}
                          >
                            Saved By
                          </Typography>

                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              fontWeight: 500,
                            }}
                          >
                            {row.savedby}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              marginBottom: "6px",
                              color: "#828282",
                            }}
                          >
                            Date
                          </Typography>

                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              fontWeight: 500,
                            }}
                          >
                            {row.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {/* white space  */}
                    <Box
                      style={{ height: "10px", backgroundColor: "white" }}
                    ></Box>
                  </TableRow>
                ))}
            </TableBody>
            <TablePagination
              style={{
                backgroundColor: "#F2F2F2",
                width: "100%",
                marginTop: "-2px",
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </TableContainer>
    </Box>
  );
}
