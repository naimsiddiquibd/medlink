import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { gqlquery, QUERY_LISTSKILLS, QUERY_SAVED_SKILL } from "../../../../api/index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Specializations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [addSkill, setAddSkill] = useState(false);
  const [delSkill, setDelSkill] = useState(false);
  // Suggested value
  const [skills, setSkills] = useState([]);
  const suggestValue = skills?.map((option) => {
    return {
      label: option?.name,
      value: option?.skillID,
    };
  });

  // default value
  const [savedSkills, setSavedSkills] = useState([]);
  const defaultValue = savedSkills.map((option) => {
    return {
      label: option?.name,
      value: option?.skillID,
    };
  });

  const [selected, setSelected] = useState([]);
  const animatedComponents = makeAnimated();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    // For All Skill suggetion
    gqlquery(QUERY_LISTSKILLS, null)
      .then((res) => res.json())
      .then((data) => setSkills(data?.data?.getSkillMaster))
      .finally((e) => console.log("All Skills Feching complete"));

    // For defaut value
    gqlquery(QUERY_SAVED_SKILL, null)
      .then((res) => res.json())
      .then((data) => setSavedSkills(data?.data.getSkillsList))
      .finally((e) => setIsLoading(false));
  }, []);

  const handleChange = (event) => {
    setSelected(event);
    console.log("This is event", event);
    console.log("This is selected", selected);
    if (event > selected) {
      let newValue;
      event.filter((option) => {
        if (!selected.includes(option)) {
          newValue = option;
        }
      });

      if (newValue.value) {
        const QUERY_SKILLS = {
          query: `mutation MyMutation {
            addSkills(skillID: ${newValue?.value}) {
                  sID
                  skillID
                }
              }
            `,
          variables: null,
          operationName: "MyMutation",
        };
        gqlquery(QUERY_SKILLS, null)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            try {
              if (data?.data?.addSkills) {
                setAddSkill(true);
                setOpen(true);
              }
            }
            catch (err) {
              setError(err);
            }

          })
          .finally((e) => console.log("Added to Database"));
      }
    }
    if (selected > event) {
      let notExist;
      selected.filter((option) => {
        if (!event.includes(option)) {
          notExist = option;
        }
      });
      if (notExist) {
        const QUERY_DELETE_SKILLS = {
          query: `mutation MyMutation {
            deleteSkill(skillID: ${notExist.value}) {
            sID
            skillID
            }
            }
            `,
          variables: null,
          operationName: "MyMutation",
        };
        gqlquery(QUERY_DELETE_SKILLS, null)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            try {
              if (data?.data?.deleteSkill) {
                setDelSkill(true);
                setOpen(true);
              }
            }
            catch (err) {
              setError(err);
            }

          })
          .finally((e) => console.log("Option delete complete"));
      }
    }
  };

  if (isLoading) {
    return (
      <Grid container sx={{ marginBlock: "1rem" }}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              height: "100%",
              backgroundColor: "var(--clr-gray-6) !important",
              p: 2,
              boxShadow: 1,
            }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{
                fontSize: 24,
                fontWeight: 700,
                mb: 1,
              }}
            >
              Add your Skills
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress color="inherit" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container sx={{ marginBlock: "1rem" }}>
        {addSkill && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            New skills added.
          </Alert>
        </Snackbar>}
        {
          delSkill && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              One skill removed.
            </Alert>
          </Snackbar>
        }
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              height: "100%",
              backgroundColor: "var(--clr-gray-6) !important",
              p: 2,
              boxShadow: 1,
            }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{
                fontSize: 24,
                fontWeight: 700,
                mb: 1,
              }}
            >
              Add your Skills
            </Typography>

            <Select
              defaultValue={defaultValue}
              isMulti
              name="colors"
              options={suggestValue}
              classNamePrefix="select"
              components={animatedComponents}
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>
    );
  }
};

export default Specializations;
