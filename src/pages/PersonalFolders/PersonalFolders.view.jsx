import {
  Container,
  Checkbox,
  Box,
  Breadcrumbs,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  Input,
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
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import Modal from "@mui/material/Modal";
import { gqlquery, QUERY_GETHRFOLDER } from "../../api/hospitalIndex";
import { useParams, Link } from "react-router-dom";

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
  // border: "2px solid gray",
  boxShadow: 1,
  p: 4,
  borderRadius: "5px",
};

function createData(foldername, numberOfProfiles, date) {
  return { foldername, numberOfProfiles, date };
}
let rows = [
  createData("Folder Name 1", "1", "26 - Jan - 2022"),
  createData("Folder Name 2", "1", "26 - Jan - 2022"),
  createData("Folder Name 3", "1", "26 - Jan - 2022"),
  createData("Folder Name 4", "1", "26 - Jan - 2022"),
  createData("Folder Name 5", "1", "26 - Jan - 2022"),
];

export default function PersonalFolders() {
  const classes = useStyles();
  const [users, setUsers] = useState(rows);
  const [allFolders, setAllFolders] = useState([]);
  const [folderWiseProfileCount, setFolderWiseProfileCount] = useState([])
  const [updateList, setUpdateList] = useState(false);
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const [openRenameFolder, setOpenRenameFolder] = useState(false);
  const [createFolderInput, setCreateFolderInput] = useState("");
  const { id } = useParams();

  const handleChange = (e) => {
    setCreateFolderInput(e.target.value);
  };

  const handleOpenCreateFolder = () => setOpenCreateFolder(true);
  const handlCloseCreateFolder = () => {
    setOpenCreateFolder(false)
    setCreateFolderInput("");
  };
  const handleOpenRenameFolder = (arg) => {
    setCreateFolderInput("");
    setOpenRenameFolder(true);
    setItem(arg);
    setCreateFolderInput(arg?.name);

  };
  const handleCloseRenameFolder = () => {
    setOpenRenameFolder(false);
    setCreateFolderInput("");
  }

  useEffect(() => {
    gqlquery(QUERY_GETHRFOLDER, null)
      .then((res) => res.json())
      .then((data) => {
        setAllFolders(data?.data?.getFolders);
        setFolderWiseProfileCount(data?.data?.getFolderWiseProfilesCount)
      })
    // .finally((e) =>  console.log("getFolders outer one", allFolders));
  }, [updateList])

  var folderWithProifle = allFolders?.map((profile) => {
    var haveEqualId = (user) => user.folderID === profile.folderID
    var userWithEqualId = folderWiseProfileCount.find(haveEqualId)
    return Object.assign({}, profile, userWithEqualId);
  })
  console.log(folderWithProifle)

  const handleCreateFolder = (e) => {
    if (createFolderInput === "" || !createFolderInput.replace(/\s/g, '').length) {
      return console.log("please give input");
    }

    const QUERY_ADDHRFOLDER = {
      query: `mutation MyMutation { 
        addHRFolder ( name: "${createFolderInput}") {
                folderID
                name
                userName
              }
            }`,
      variables: null,
      operationName: "MyMutation",
    };
    gqlquery(QUERY_ADDHRFOLDER, null)
      .then((res) => res.json())
      .then((data) => setUpdateList(pre => !pre))
      .finally((e) => setCreateFolderInput(""));

    setCreateFolderInput("");
    setOpenCreateFolder(false);
  };

  const handleRenameFolder = () => {

    const QUERY_RENAMEHRFOLDER = {
      query: `mutation MyMutation { 
          renameFolder ( name: "${createFolderInput}", folderID: "${item.folderID}") {
                folderID
                name
                profileCount
                userName
              }
            }`,
      variables: null,
      operationName: "MyMutation",
    };
    gqlquery(QUERY_RENAMEHRFOLDER, null)
      .then((res) => res.json())
      .then((data) => setUpdateList(pre => !pre))
      .finally((e) => setCreateFolderInput(""));

    setCreateFolderInput("");
    setOpenRenameFolder(false);
  }

  const handleDeleteFolder = (id) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      const QUERY_GETAPPLICANTBYID = {
        query: `mutation MyMutation  {
          deleteFolder(folderID: "${id}") {
              folderID
              name
              profileCount
              userName
            }
          }`
      };
      gqlquery(QUERY_GETAPPLICANTBYID, null)
        .then((res) => res.json())
        .then((data) => setUpdateList(pre => !pre))
    }
  }

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
          <Link underline="hover" color="inherit" to="/hospital-dashboard">
            Home
          </Link>
          <Link underline="hover" color="inherit" to="/jobs-and-responses">
            {"Resume Database"}
          </Link>
          <Typography color="text.secondary"> Personal Folders </Typography>
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
            Personal Folders
          </Typography>

          <Stack direction="row" spacing={2}>
            <div>
              <Button
                variant="contained"
                onClick={handleOpenCreateFolder}
                style={{ borderRadius: "8px" }}
              >
                Create
              </Button>
              <Modal
                open={openCreateFolder}
                onClose={handlCloseCreateFolder}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <FormControl
                    sx={{ mr: 2, width: "330px" }}
                    variant="standard"
                  >
                    <Input
                      sx={{
                        px: 1,
                        py: 0.4,
                        width: "100%",
                        backgroundColor: "#E0E0E0",
                        border: "none",
                        borderRadius: "10px",
                        borderBottom: "none",
                      }}
                      disableUnderline
                      id="outlined-adornment-password"
                      type="text"
                      // value={values.password}
                      onChange={handleChange}
                      placeholder="Create folder..."
                      label="Search User"
                    />
                  </FormControl>

                  <Button
                    variant="contained"
                    style={{ borderRadius: "8px" }}
                    onClick={handleCreateFolder}
                  >
                    Create
                  </Button>
                </Box>
              </Modal>
            </div>
            <Button
              style={{
                backgroundColor: "#E0E0E0",
                padding: "0 15px 0 15px",
                borderRadius: "8px",
              }}
              startIcon={<FilterAltTwoToneIcon style={{ color: "#323232" }} />}
            >
              <p style={{ color: "black" }}>Filter </p>
            </Button>
          </Stack>
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
                Number Of Profiles
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                Created By
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 600 }}>
                ------ Folder Actions ------
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {folderWithProifle
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
                    <Link to={`/profile-list-folder/${row?.folderID}`} state={{ folderName: row?.name }} color="inherit"> {row?.name} </Link>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row?.profiles}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    {row?.userName}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                  >
                    <Typography underline="always" color="text.secondary">
                      <Link to="#" color="inherit" onClick={() => handleOpenRenameFolder(row)}>
                        {"Rename"}
                      </Link>

                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <Link to="#" color="inherit" onClick={() => handleDeleteFolder(row.folderID)}>
                        {"Delete"}
                      </Link>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Modal
          open={openRenameFolder}
          onClose={handleCloseRenameFolder}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl
              sx={{ mr: 2, width: "330px" }}
              variant="standard"
            >
              <Input
                sx={{
                  px: 1,
                  py: 0.4,
                  width: "100%",
                  backgroundColor: "#E0E0E0",
                  border: "none",
                  borderRadius: "10px",
                  borderBottom: "none",
                }}
                disableUnderline
                id="outlined-adornment-password"
                type="text"
                defaultValue={item?.name}
                onChange={handleChange}
                placeholder="Rename Folder"
              />
            </FormControl>

            <Button
              variant="contained"
              style={{ borderRadius: "8px" }}
              onClick={handleRenameFolder}
            >
              Update
            </Button>
          </Box>
        </Modal>

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
