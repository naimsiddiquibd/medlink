import { Box, Card, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import { gqlquery } from "../../../../api/hospitalIndex";
import CreatableSelect from 'react-select/creatable';
// import { ColourOption, colourOptions } from './docs/data'; 

const statusOptions = [
    { value: 'Available', label: 'Available' },
    { value: 'Busy', label: 'Busy' },
    { value: 'No Response', label: 'No Response' },
];

const interestStatusOptions = [
    { value: 'Interested', label: 'Interested' },
    { value: 'Not Interested', label: 'Not Interested' },
    { value: 'Got Job', label: 'Got Job' },
];

const callStatusOptions = [
    { value: 'Call Later', label: 'Call Later' },
    { value: 'Call Tomorrow', label: 'Call Tomorrow' },
    { value: 'Call Next Week', label: 'Call Next Week' },
];

const customStyles = {
    control: base => ({
        ...base,
        // width: 200
    }),

};

const AddTags = (props) => {
    const [applicantByID, setApplicantByID] = useState([]);
    const [updateResult, setUpdateResult] = useState(false);

    const handleChangeStatus = (newValue, actionMeta) => {
        if (newValue.value !== "") {
            console.log("before applicantStatus", newValue.value)
            const QUERY_APPLICANTSTATUS = {
                query: `mutation MyMutation {
                  updateApplicantStatus (
                      jaID: "${props.jaID}", 
                      status: "${newValue.value}"
                     ) 
                  }
                   `,
                variables: null,
                operationName: "MyMutation",
            };
            gqlquery(QUERY_APPLICANTSTATUS, null)
                .then((res) => res.json())
                .then((data) => console.log("applicantStatus", data))
            // .finally((e) =>  console.log("Successful 3"));
            console.log("after applicantStatus", newValue.value)
        }
        setUpdateResult(pre => !pre);
        console.log(newValue, actionMeta)
    };
    const handleInputChangeStatus = (inputValue, actionMeta) => {
        setUpdateResult(pre => !pre);
    };

    const handleChangeInterest = (newValue, actionMeta) => {
        if (newValue.value !== "") {
            const QUERY_APPLICANTINTERESTEDSTATUS = {
                query: `mutation MyMutation {
                updateApplicantInterestedStatus (
                    jaID: "${props.jaID}", 
                    interested: "${newValue.value}"
                   ) 
                }
                 `,
                variables: null,
                operationName: "MyMutation",
            };
            gqlquery(QUERY_APPLICANTINTERESTEDSTATUS, null)
                .then((res) => res.json())
                .then((data) => console.log("applicantInterestedStatus", data))
            // .finally((e) =>  console.log("Successful 3"));
        }
        setUpdateResult(pre => !pre);
        console.log(newValue, actionMeta)
    };
    const handleInputChangeInterest = (inputValue, actionMeta) => {
        setUpdateResult(pre => !pre);
    };

    const handleChangeCall = (newValue, actionMeta) => {
        if (newValue.value !== "") {
            const QUERY_APPLICANTCALLSTATUS = {
                query: `mutation MyMutation {
                updateApplicantCallStatus (
                    jaID: "${props.jaID}", 
                    callStatus: "${newValue.value}"
                    ) 
                }
                 `,
                variables: null,
                operationName: "MyMutation",
            };
            gqlquery(QUERY_APPLICANTCALLSTATUS, null)
                .then((res) => res.json())
                .then((data) => console.log("applicantCallStatus", data))
            // .finally((e) => console.log("Successful 4"));
        }
        setUpdateResult(pre => !pre);
        console.log(newValue, actionMeta)
    };
    const handleInputChangeCall = (inputValue, actionMeta) => {
        setUpdateResult(pre => !pre);
    };

    useEffect(() => {
        const QUERY_GETAPPLICANTBYID = {
            query: `query MyQuery {
                getApplicantByID (jaID: "${props.jaID}") {
                    appliedAt
                    jaID
                    name
                    status
                    interested
                    callStatus
                }
            }`
        };
        gqlquery(QUERY_GETAPPLICANTBYID, null)
            .then((res) => res.json())
            .then((data) => setApplicantByID(data?.data?.getApplicantByID))
        // .finally((e) =>
        //     console.log("getApplicantByID inner one", applicantByID)
        // );
    }, [props.jaID, updateResult]);

    return (
        <Container maxWidth="lg" sx={{ mx: "auto" }}>
            <Card sx={{ bgcolor: "#F2F2F2", p: 2 }}>
                <Typography sx={{ color: "#6F7482", fontWeight: 500 }}>
                    Add Tags for {props?.vacancyTitle}
                </Typography>
                <Box sx={{ backgroundColor: "#FFFFFF", display: "flex", gap: 2, py: 1, pl: 2 }}>
                    <Box>
                        <FormControl fullWidth sx={{ height: "" }}>
                            <CreatableSelect
                                isClearable
                                onChange={handleChangeStatus}
                                onInputChange={handleInputChangeStatus}
                                options={statusOptions}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                menuPosition={'absolute'}
                                placeholder={(applicantByID?.status !== "" && applicantByID?.status !== null && applicantByID?.status !== undefined) ? `${applicantByID?.status}` : "Status"}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ minWidth: 96 }}>
                            <CreatableSelect
                                isClearable
                                onChange={handleChangeInterest}
                                onInputChange={handleInputChangeInterest}
                                options={interestStatusOptions}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                menuPosition={'absolute'}
                                placeholder={(applicantByID?.status !== "" && applicantByID?.status !== null && applicantByID?.status !== undefined) ? `${applicantByID?.interested}` : "Interest"}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ minWidth: 96 }}>
                            <CreatableSelect
                                isClearable
                                onChange={handleChangeCall}
                                onInputChange={handleInputChangeCall}
                                options={callStatusOptions}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                menuPosition={'absolute'}
                                placeholder={(applicantByID?.status !== "" && applicantByID?.status !== null && applicantByID?.status !== undefined) ? `${applicantByID?.callStatus}` : "Call Status"}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
};

export default AddTags;
