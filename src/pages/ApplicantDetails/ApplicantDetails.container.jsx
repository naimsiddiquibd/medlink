import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ApplicantDetailsView from "./ApplicantDetails.view";
import { ApplicantBio, Education, Experience, KeySkills, Accomplishments, PersonalDetails, Resume } from "./components";
import AddTags from "./components/AddTags";
import BreadCrumbsView from "./components/BreadCrumbs/BreadCrumbs.view";
import HRComment from "./components/HRComment/HRComment.view";
import { useLocation } from "react-router-dom";

export default function ApplicantDetails(props) {
    const { jaID, vacancyID } = useParams();
    const location = useLocation();
    const vacancyTitle = location.state?.jobTitle;
    console.log(location?.state?.userID);
    const userID = location.state?.userID;

    return (
        <Box>
            <BreadCrumbsView jaID={jaID} data={location} linkOfJob={location.state?.link} />
            <Box
                sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3, mb: 8 }}
            >
                <AddTags jaID={jaID} vacancyTitle={vacancyTitle} />
                <HRComment jaID={jaID} vacancyID={vacancyID} />
                <ApplicantDetailsView jaID={jaID} />
                <ApplicantBio userID={userID} />
                <KeySkills  userID={userID} />
                <Education userID={userID} />
                <Experience userID={userID} />
                <Accomplishments userID={userID} />
                <PersonalDetails userID={userID} />
                <Resume jaID={jaID} />
            </Box>
        </Box>
    );
}
