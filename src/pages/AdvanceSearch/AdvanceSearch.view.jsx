import { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import AdvSearch from "./AdvSearch";
import EmploymentDetails from "./EmploymentDetails";
import EducationDetails from "./EducationDetails";
import AdditionalDetails from "./AddtionalDetails";
import DisplayDetails from "./DisplayDetails";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { gqlquery } from "../../api/hospitalIndex";
import { useNavigate } from "react-router-dom"

function createData(queries) {
  return { queries };
}
let searched = [
  createData("Search Keyword 1"),
  createData("Search Keyword 2"),
  createData("Search Keyword 3"),
  createData("Search Keyword 4"),
  createData("Search Keyword 5"),
  createData("Search Keyword 6"),
  createData("Search Keyword 7"),
  createData("Search Keyword 8"),
  createData("Search Keyword 9"),
  createData("Search Keyword 10"),
  createData("Search Keyword 11"),
];

const AdvanceSearch = () => {
  const navigate = useNavigate();
  const [searches, setSearches] = useState(searched);
  const [item, setItem] = useState(1);
  const [age, setAge] = useState('');
  const [getAdvanceSearch, setGetAdvanceSearch] = useState([]);
  const [getEmploymentData, setGetEmploymentData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const selectStyle = {
    control: (base) => ({
      ...base,
      boxShadow: "none"
    })
  };

  const handleGetAdvanceSearch = (advSearchData) => {
    setGetAdvanceSearch({ advSearchData: advSearchData })
  }

  const handleGetEmploymentData = (employmentData) => {
    setGetEmploymentData({ employmentData: employmentData })
  }

  const handleSearch = (event) => {
    const QUERY_SEARCHRESUME = {
      query: `query MyQuery {
          searchResume(
              anyKeywords: "${getAdvanceSearch?.advSearchData?.keyword1.join(",")}",
              allKeywords: "${getAdvanceSearch?.advSearchData?.keyword2.join(",")}",
              employmentType: "${getAdvanceSearch?.advSearchData?.inputValues?.employmentType}",
              experienceFrom: ${Number(getAdvanceSearch?.advSearchData?.inputValues?.experienceFrom)},
              experienceTo: ${Number(getAdvanceSearch?.advSearchData?.inputValues?.experienceTo)},
              functionAreaID: ${Number(getEmploymentData?.employmentData?.department)},
              industry: "${getEmploymentData?.employmentData?.industry}",
              preferredLocation: "${getAdvanceSearch?.advSearchData?.cityName}",
              salaryRangeEnd: ${Number(getAdvanceSearch?.advSearchData?.inputValues?.salaryRange?.[1])},
              salaryRangeStart: ${Number(getAdvanceSearch?.advSearchData?.inputValues?.salaryRange?.[0])}
              ) {
                 activelySearching
                 city
                 exp
                 name
                 phone
                 phoneVerified
                 salary
                 specialization
                 userID
                }
              }`
    };
    gqlquery(QUERY_SEARCHRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        setSearchResult(datas?.data?.searchResume);
        const handleNavigate = () => { 
          navigate("/search-resume-result", { state: { searchResume: datas?.data?.searchResume } });
        };
        setTimeout(handleNavigate, 2000);
      });
  }
 

  console.log(searchResult);

  return (
    <Container maxWidth="lg">
      {/* Advance Search  */}
      <AdvSearch getAdvanceSearch={handleGetAdvanceSearch} />

      {/* Empoyment Details  */}
      <EmploymentDetails getEmploymentData={handleGetEmploymentData} />

      {/* Educational Details  */}
      <EducationDetails />

      {/* Additional Details  */}
      <AdditionalDetails />

      {/* Display Details  */}
      <DisplayDetails />

      {/* clear and clear button  */}
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "-20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
          <Typography
            color="text.secondary"
            style={{
              fontWeight: "600",
              fontSize: "18px",
              width: "150px"
            }}
          >
            Active in
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button
            size="large"
            variant="outlined"
            style={{ marginRight: "30px", borderRadius: "12px" }}
          >
            Clear
          </Button>
          <Button
            onClick={handleSearch}
            size="large"
            variant="standard"
            style={{
              borderRadius: "12px",
              backgroundColor: "#333333",
              color: "white",
              padding: "10px 24px 10px 24px",
            }}
          >
            Search
          </Button>
        </Box>
      </Grid>

      {/* Recent searches  */}
      <Grid style={{ margin: "60px 0 76px 0" }}>
        <Typography
          style={{ marginBottom: "30px", fontWeight: "600", fontSize: "18px" }}
        >
          Recent Searches
        </Typography>
        <Box
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          gap={2}
        >
          {searches.map((search) => (
            <Typography underline="always" color="text.secondary">
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                {search.queries}
              </Link>
            </Typography>
          ))}
        </Box>
      </Grid>
    </Container>
  );
};

export default AdvanceSearch;
