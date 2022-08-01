import {
  Container,
  Checkbox,
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  Input,
  Grid,
  FormHelperText,
  TextField,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
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
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { gqlquery, QUERY_GETHOSPITAL, QUERY_GETHOSPITALUSERS, QUERY_GETMYPROFILE } from "../../../../../api/hospitalIndex.js";
// import { update } from "draft-js/lib/DefaultDraftBlockRenderMap";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: "4px solid red",
  boxShadow: 1,
  p: 4,
};

export default function UserList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [errInput, setErrInput] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [hospitalData, setHospitalData] = useState([]);
  const [accessToPostJob, setAccessToPostJob] = useState([]);
  const [form, setForm] = useState({
    'name': '',
    'email': '',
    'accessJobPosting': null,
    'accessResumeDatabase': null
  });
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    searchUser: false,
  });

  const { accessJobPosting, accessResumeDatabase } = form;


  const handleNavigate = () => {
    navigate("/hospital-dashboard");
  };

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
  }

  const handleChangeCheckbox = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked
    });
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    gqlquery(QUERY_GETHOSPITAL, null)
      .then((res) => res.json())
      .then((datas) => {
        setHospitalData(datas?.data?.getHospital);
      });

    gqlquery(QUERY_GETMYPROFILE, null)
      .then((res) => res.json())
      .then((datas) => {
        setAccessToPostJob(datas?.data?.getMyProfile);
        if (datas?.data?.getMyProfile?.accessJobPosting === false) {
          setOpen(true);
          setTimeout(handleNavigate, 4000)
        }
      });
  }, []);

  const hanldeOpenAddModal = () => setOpenAddModal(true);
  const hanldeCloseAddModal = () => setOpenAddModal(false);
  const handleOpenUpdateModal = (id, arg) => {
    setUpdateUser(arg);
    form.name = arg.name;
    form.accessJobPosting = arg.accessJobPosting;
    form.accessResumeDatabase = arg.accessResumeDB;
    setOpenUpdateModal(true);
  }
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  useEffect(() => {
    gqlquery(QUERY_GETHOSPITALUSERS, null)
      .then((res) => res.json())
      .then((datas) => setGetUsers(datas?.data?.getHospitalUsers));
  }, [updateList]);
  
  const handleCreateUser = (e) => {
    if (form.email === "" || form.name === "") {
      return setErrInput("please give input");
    }

    const QUERY_POSTNEWUSER = {
      query: `mutation MyMutation {
           addHospitalUser (
                 accessJobPosting: ${Boolean(form.accessJobPosting)},
                 accessResumeDB: ${Boolean(form.accessResumeDatabase)},
                 email: "${form.email}",
                 name: "${form.name}"
                ) {
                     accessJobPosting
                     accessResumeDB
                     adminUser
                     email
                     hospitalID
                     huID
                     status
                     name
                  }
              }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTNEWUSER, null)
      .then((res) => res.json())
      .then((datas) => {
        setUpdateList(!updateList); 
      })
      .finally((e) => console.log("adding new user to database"));

    form.email = "";
    form.name = "";
    form.accessJobPosting = false;
    form.accessResumeDatabase = false;
    setErrInput("");
    setOpenAddModal(false);
  };

  const handleUpdateUser = huID => {
    const QUERY_UPDATEUSER = {
      query: `mutation MyMutation {
           updateHospitalUser (
                    email: "${form.email}",
                    name: "${form.name}",
                    huID: ${Number(updateUser.huID)},
                    accessJobPosting: ${Boolean(form.accessJobPosting)},
                    accessResumeDB: ${Boolean(form.accessResumeDatabase)}
                    ) { 
                      accessJobPosting
                      accessResumeDB
                      adminUser
                      email
                      hospitalID
                      huID
                      name
                    }
                }
                  `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_UPDATEUSER, null)
      .then((res) => res.json())
      .then((datas) => {
        setUpdateList(!updateList); 
      })
      .finally((e) => console.log("adding new user to database"));

    form.email = "";
    form.name = "";
    form.accessJobPosting = false;
    form.accessResumeDatabase = false;
    setErrInput("");
    setOpenUpdateModal(false);
  }

  const hanldeDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_DELETEUSER = {
        query: `mutation MyMutation {
             deleteHospitalUser (huID: ${id}) {
              accessJobPosting
              accessResumeDB
              adminUser
              email
              hospitalID
              huID
              name
              }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_DELETEUSER, null)
        .then((res) => res.json())
        .then((datas) => setUpdateList(!updateList))
        .finally((e) =>
          console.log("Deleting hospital user from database")
        );
    } else {
      console.log("You don't want to delete this!");
    }

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Container maxWidth="md" sx={{ mb: 8 }}>
      {
        accessToPostJob?.accessJobPosting ?
          (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 4,
                  mb: 2,
                }}
                style={{ marginBottom: "30px" }}
              >
                <div>
                  <p className={classes.manageuser}>Manage user</p>
                </div>
                <div
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Stack direction="row" spacing={2}>
                      <FormControl sx={{ mr: 2 }} variant="standard">
                        <Input
                          className={classes.searchuser}
                          sx={{ px: 1, py: 0.3 }}
                          disableUnderline
                          id="outlined-adornment-password"
                          type="text"
                          value={values.password}
                          onChange={handleChange("password")}
                          placeholder="Search"
                          style={{ borderBottom: "none" }}
                          endAdornment={
                            <InputAdornment position="end" style={{ outline: "none" }}>
                              <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                              >
                                {values.searchUser}
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Search User"
                        />
                      </FormControl>
                      <div>
                        <Button
                          variant="contained"
                          onClick={hanldeOpenAddModal}
                          style={{ borderRadius: "8px" }}
                        >
                          Create
                        </Button>
                        <Modal
                          open={openAddModal}
                          onClose={hanldeCloseAddModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Box sx={{ display: "flex", flexDirection: "column", }}>
                              <Typography style={{ fontWeight: "bold", fontSize: "25px", marginBottom: "-12px", color: "gray" }}>Add User</Typography>
                              <Grid item direction={"column"} xs={12} md={12} sx={{ mt: 2 }}>
                                <FormControl fullWidth>
                                  <TextField
                                    variant="outlined"
                                    rows={1}
                                    fullWidth
                                    name="email"
                                    type="email"
                                    placeholder="   User email"
                                    error={form.email === "" && errInput}
                                    value={form.email}
                                    onChange={formValueChange}
                                    sx={{ backgroundColor: "#ffffff", py: 1, }}
                                  />
                                  {form.email === "" && (
                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                      {errInput}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item direction={"column"} xs={12} md={12} sx={{ mb: 2 }}>
                                <FormControl fullWidth>
                                  <TextField
                                    variant="outlined"
                                    rows={1}
                                    fullWidth
                                    name="name"
                                    type="text"
                                    placeholder="   User name"
                                    error={form.name === "" && errInput}
                                    value={form.name}
                                    onChange={formValueChange}
                                    sx={{ backgroundColor: "#ffffff", py: 1, }}
                                  />
                                  {form.name === "" && (
                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                      {errInput}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: "", alignItems: "", gap: 2 }}>
                                <Typography sx={{
                                  fontSize: "16px", color: "#333333",
                                  margin: "0 auto", width: "322px",
                                  display: "flex", flexDirection: "row",
                                  gap: 0, alignItems: 'flex-start',
                                  justifyContent: '', mb: 2,
                                }} >
                                  <Checkbox
                                    name="accessJobPosting" checked={accessJobPosting} color="default" onChange={(e) => handleChangeCheckbox(e)}
                                  />
                                  &nbsp;
                                  <b style={{ fontWeight: 400 }}>Access to Job Posting  </b>
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "#333333", fontSize: "16px",
                                    margin: "0 auto", textJustify: "inner-word",
                                    width: "322px", display: "flex",
                                    flexDirection: "row", gap: 0,
                                    alignItems: 'flex-start', justifyContent: '',
                                  }}
                                >
                                  <Checkbox
                                    name="accessResumeDatabase" checked={accessResumeDatabase} color="default" onChange={(e) => handleChangeCheckbox(e)}
                                  />
                                  &nbsp;
                                  <b style={{ fontWeight: 400 }}>
                                    Access to Resume Database
                                  </b>
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                direction={"column"}
                                xs={12}
                                md={12}
                                justifyContent="flex-end"
                                sx={{ display: "grid" }}
                              >
                                <CardContent>
                                  <CardActions className="resume-actions">
                                    <Button
                                      variant="contained"
                                      className="save-btn"
                                      onClick={handleCreateUser}
                                    >
                                      Save
                                    </Button>
                                  </CardActions>
                                </CardContent>
                              </Grid>
                            </Box>
                          </Box>
                        </Modal>
                      </div>
                    </Stack>
                  </div>
                </div>
              </Box>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#E0E0E0" }}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell style={{ padding: "0px", margin: "0px" }}>
                        Sub Users
                      </TableCell>
                      <TableCell align="center">Name </TableCell>
                      <TableCell align="center">Signed In </TableCell>
                      <TableCell align="center">Job Posting </TableCell>
                      <TableCell align="center">Resume Database </TableCell>
                      <TableCell align="center">
                        <Button
                          className={classes.actionbutton}
                          variant=""
                          style={{
                            backgroundColor: "#BDBDBD",
                            padding: "5px 10px 5px 10px",
                          }}
                        >
                          Action
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getUsers
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map((row, index) => (
                        <TableRow
                          key={row.email}
                          className={classes.tablebodyrow}
                          style={{ padding: "0px", margin: "0px" }}
                        >
                          <TableCell component="th" scope="row">
                            <Checkbox />
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ padding: "0px", margin: "0px" }}
                          >
                            {row.email}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ padding: "0px", margin: "0px" }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            style={{ padding: "0px", margin: "0px" }}
                          >
                            {row.status === "Active" && (
                              <CheckCircleOutlineRoundedIcon
                                style={{ backgroundColor: "#BDBDBD" }}
                                sx={{ borderRadius: "50%" }}
                                variant="contained"
                              />
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ padding: "0px", margin: "0px" }}
                          >
                            {row.accessJobPosting && (
                              <CheckCircleOutlineRoundedIcon
                                style={{ backgroundColor: "#BDBDBD" }}
                                sx={{ borderRadius: "50%" }}
                                variant="contained"
                              />
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ padding: "0px", margin: "0px" }}
                          >
                            {row.accessResumeDB && (
                              <CheckCircleOutlineRoundedIcon
                                style={{ backgroundColor: "#BDBDBD" }}
                                sx={{ borderRadius: "50%" }}
                                variant="contained"
                              />
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ padding: "7px", margin: "0px", display: "flex", flexDirection: "row", justifyContent: "center" }}
                          >
                            <div>
                              <Button
                                onClick={() => handleOpenUpdateModal(row.huID, row)}
                                style={{ borderRadius: "8px" }}
                              >
                                <Edit
                                  style={{
                                    fontSize: "30px",
                                    margin: "10px 10px 10px 10px",
                                    color: "#323232",
                                  }}
                                />
                              </Button>
                              <Modal
                                open={openUpdateModal}
                                onClose={handleCloseUpdateModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <Box sx={{ display: "flex", flexDirection: "column", }}>
                                    <Typography style={{ fontWeight: "bold", fontSize: "25px", marginBottom: "-12px", color: "gray" }}>Update User</Typography>
                                    <Grid item direction={"column"} xs={12} md={12} sx={{ mt: 2 }}>
                                      <FormControl fullWidth>
                                        <TextField
                                          variant="outlined"
                                          rows={1}
                                          fullWidth
                                          name="email"
                                          type="email"
                                          placeholder={`${" "} ${updateUser?.email}`}
                                          // error={form.email === "" && errInput}
                                          value={form?.email}
                                          disabled
                                          onChange={formValueChange}
                                          sx={{ backgroundColor: "#ffffff", py: 1, }}
                                        />
                                        {form.email === "" && (
                                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                                            {errInput}
                                          </FormHelperText>
                                        )}
                                      </FormControl>
                                    </Grid>
                                    <Grid item direction={"column"} xs={12} md={12} sx={{ mb: 2 }}>
                                      <FormControl fullWidth>
                                        <TextField
                                          variant="outlined"
                                          rows={1}
                                          fullWidth
                                          name="name"
                                          type="text"
                                          placeholder={updateUser?.name === "" ? `${" "} User name` : `${" "} ${updateUser.name}`}
                                          // error={form.name === "" && errInput}
                                          defaultValue={updateUser?.name}
                                          onChange={formValueChange}
                                          sx={{ backgroundColor: "#ffffff", py: 1, }}
                                        />
                                        {form.name === "" && (
                                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                                            {errInput}
                                          </FormHelperText>
                                        )}
                                      </FormControl>
                                    </Grid>
                                    <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: "", alignItems: "", gap: 2 }}>
                                      <Typography sx={{
                                        fontSize: "16px", color: "#333333",
                                        margin: "0 auto", width: "322px",
                                        display: "flex", flexDirection: "row",
                                        gap: 0, alignItems: 'flex-start',
                                        justifyContent: '', mb: 2,
                                      }} >
                                        <Checkbox
                                          name="accessJobPosting" defaultChecked={updateUser.accessJobPosting} color="default" onChange={(e) => handleChangeCheckbox(e)}
                                        />
                                        &nbsp;
                                        <b style={{ fontWeight: 400 }}>Access to Job Posting  </b>
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: "#333333", fontSize: "16px",
                                          margin: "0 auto", textJustify: "inner-word",
                                          width: "322px", display: "flex",
                                          flexDirection: "row", gap: 0,
                                          alignItems: 'flex-start', justifyContent: '',
                                        }}
                                      >
                                        <Checkbox
                                          name="accessResumeDatabase" defaultChecked={updateUser.accessResumeDB} color="default" onChange={(e) => handleChangeCheckbox(e)}
                                        />
                                        &nbsp;
                                        <b style={{ fontWeight: 400 }}>
                                          Access to Resume Database
                                        </b>
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      direction={"column"}
                                      xs={12}
                                      md={12}
                                      justifyContent="flex-end"
                                      sx={{ display: "grid" }}
                                    >
                                      <CardContent>
                                        <CardActions className="resume-actions">
                                          <Button
                                            variant="contained"
                                            className="save-btn"
                                            onClick={() => handleUpdateUser(row.huID)}
                                          >
                                            Update
                                          </Button>
                                        </CardActions>
                                      </CardContent>
                                    </Grid>
                                  </Box>
                                </Box>
                              </Modal>
                            </div>
                            <Button
                              aria-label="edit"
                              onClick={() => hanldeDeleteUser(row.huID)}
                            >
                              <DeleteOutlineIcon style={{ color: "#323232" }} />
                            </Button>
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
                  count={getUsers?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Box>
          ) : (
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                This user does not have sufficient privileges for this page. Please contact your administrator.
              </Alert>
            </Snackbar>
          )
      }
    </Container>
  );
}
