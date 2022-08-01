import {
  Container,
  FormHelperText,
  Box,
  Breadcrumbs,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  Input,
  Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import codesignimage from "../../../assets/codesign.svg";
// import React, { Component } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw, Modifier } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
// import { useState } from "react";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import PropTypes from "prop-types";

function InsertShortCode() {
  return (
    <Button style={{ backgroundColor: "white", margin: "-5px 0 0px 0px" }}>
      <Typography
        sx={{
          bgcolor: "#E0E0E0",
          color: "black",
          py: 0.6,
          px: 2,
          borderRadius: "8px",
        }}
      >
        <img src={codesignimage} alt="" /> Insert Shortcode
      </Typography>
    </Button>
  );
}

// class CustomOption extends Component {
//   static propTypes = {
//     onChange: PropTypes.func,
//     editorState: PropTypes.object,
//   };

//   addStar = () => {
//     const { editorState, onChange } = this.props;
//     const contentState = Modifier.replaceText(
//       editorState.getCurrentContent(),
//       editorState.getSelection(),
//       "⭐",
//       editorState.getCurrentInlineStyle()
//     );
//     onChange(EditorState.push(editorState, contentState, "insert-characters"));
//   };

//   render() {
//     return <div onClick={this.addStar}>⭐</div>;
//   }
// }

// const EditorCustomToolbarOption = () => (
//   <Editor
//     style={{ height: "500px" }}
//     sx={{ height: "500px" }}
//     wrapperClassName="demo-wrapper"
//     editorClassName="demo-editor"
//     editorStyle={{ minHeight: "300px" }}
//     placeholder={"   Compose here..."}
//     toolbarCustomButtons={([<CustomOption />], [<InsertShortCode />])}
//   />
// );

// const DrafJs = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
//   return (
//     <div style={{ minHeight: "350px" }}>
//       <Editor
//         editorState={editorState}
//         toolbarClassName="toolbarClassName"
//         wrapperClassName="wrapperClassName"
//         editorClassName="editorClassName"
//         onEditorStateChange={setEditorState}
//         style={{ minHeight: "350px" }}
//       />
//     </div>
//   );
// };

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
}));

const CreateEmail = () => {
  const classes = useStyles();
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
          <Link underline="hover" color="inherit" href="/email-templates">
            {"Email Templates"}
          </Link>
          <Typography color="text.secondary">Create Email Templates</Typography>
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
              mb: 0,
            }}
          >
            Email Template Title
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#F2F2F2", pt: 1.5, pb: 4 }}>
        <Box>
          <FormControl sx={{ px: 3, width: "100%" }} variant="outlined">
            <FormHelperText sx={{ ml: 0, fontSize: 12 }}>
              Create Email Templates
            </FormHelperText>
            <Input
              sx={{
                px: 1,
                py: 1,
                backgroundColor: "white",
                border: "2px solid #E0E0E0",
                borderRadius: "10px",
                borderBottom: "none",
              }}
              disableUnderline
              id="outlined-adornment-password"
              type="text"
              // value={values.password}
              // onChange={handleChange("password")}
              placeholder="Create folder..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {/* {values.searchUser} */}
                    {/* <SearchIcon /> */}
                  </IconButton>
                </InputAdornment>
              }
              label="Search User"
            />
          </FormControl>
        </Box>

        <hr
          color="#BDBDBD"
          height="10px"
          width="100%"
          style={{ marginTop: "14px", marginBottom: "10px" }}
        />

        <Box sx={{ bgcolor: "#F2F2F2", px: 3, width: "100%" }}>
          <Box sx={{ width: "100%", bgcolor: "white", borderRadius: "10px" }}>
            {/* <EditorCustomToolbarOption /> */}
          </Box>
        </Box>
        <Box sx={{ bgcolor: "#F2F2F2", px: 3, mt: 4, width: "100%" }}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}
          >
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Save Template</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateEmail;
