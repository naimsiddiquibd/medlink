import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";

export default function BreadCrumbsView(props) {
    const [getProfileByApplicant, setGetProfileByApplicant] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // For defaut value
        const QUERY_GETPROFILEBYAPPLICANT = {
            query: `query MyQuery {
                getProfileByApplicant(jaID : "${props.jaID}") { 
                    name  
                   }
                }`
        };
        gqlquery(QUERY_GETPROFILEBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => setGetProfileByApplicant(data?.data?.getProfileByApplicant))
            .finally((e) => setIsLoading(false));
    }, []);
     

    return (
        <Container maxWidth="lg" sx={{ mx: "auto" }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                sx={{ marginTop: "1%" }}
            >
                <Link underline="hover" color="inherit" href="/hospital-dashboard">
                    Home
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/manage-jobs-and-responses"
                >
                    {"Manage Jobs & Responses"}
                </Link>
                <Link underline="hover" color="inherit" href={props?.linkOfJob}>
                    {props?.data?.state?.jobTitle}
                </Link>
                <Typography color="text.primary">
                    {getProfileByApplicant?.name}'s Details
                </Typography>
            </Breadcrumbs>
        </Container>
    );
}
