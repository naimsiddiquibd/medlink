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
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { gqlquery } from "../../api/hospitalIndex.js";
import { Link, useParams, useLocation } from "react-router-dom";

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

const options = ["Edit", "Rename", "Delete"];

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

export default function ProfileListFolder() {
    const classes = useStyles();
    const [applicantsList, setApplicantsList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { id } = useParams();
    const [profileList, setProfileList] = useState([]);
    const location = useLocation();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const QUERY_GETAPPLICANTSLISTBYJOB = {
            query: `query MyQuery {
                listProfilesByFolder (folderID: "${id}") {
                        folderID
                        fpID
                        jaID
                        name                     
                    }
                }`,
            variables: null,
            operationName: "MyMutation",
        };

        gqlquery(QUERY_GETAPPLICANTSLISTBYJOB, null)
            .then((res) => res.json())
            .then((data) => setProfileList(data?.data?.listProfilesByFolder));
    }, []);

    console.log(location);

    return (
        <Container maxWidth="md" sx={{ mb: 8 }}>
            <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ marginTop: "4%" }}
                    style={{ marginBottom: "30px" }}
                >
                    <Link underline="hover" color="inherit" to="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" to="/jobs-and-responses">
                        {"Jobs & Responses"}
                    </Link>
                    <Link underline="hover" color="inherit" to="/personal-folders">
                        {"Personal Folders"}
                    </Link>
                    <Typography color="text.secondary"> {location?.state?.folderName} Profile List</Typography>
                </Breadcrumbs>
                <Typography
                    variant="p"
                    sx={{ fontSize: "24px", fontWeight: "600", color: "#333333", mb: 6 }}
                    style={{
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "24px",
                        color: "#333333",
                        marginBottom: "20px",
                    }}
                >
                    {location?.state?.folderName} Profile List
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
                                Name
                            </TableCell>
                            <TableCell align="left" style={{ fontWeight: 600 }}>
                                Added
                            </TableCell>


                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {profileList
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row, index) => (
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
                                        <Link to={`/applicants-detail/${row?.jaID}/1`} > {row?.name} </Link>
                                    </TableCell>
                                    {/* <TableCell
                                        align="left"
                                        style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                                    >
                                        <Button
                                            style={{
                                                backgroundColor: "#C4C4C4",
                                                borderRadius: "24px",
                                            }}
                                        >
                                            <p style={{ color: "black" }}>{"New"}</p>
                                        </Button>
                                    </TableCell> */}
                                    <TableCell
                                        align="left"
                                        style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                                    >
                                        {row.appliedAt}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        style={{ padding: "0px", margin: "0px" }}
                                    >
                                        <LongMenu />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    className={classes.pagination}
                    style={{ backgroundColor: "#F2F2F2", width: "inherit" }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={applicantsList?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Container>
    )
}
