import { Box, Button, Card, Container, TextField, Typography } from "@mui/material";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import React, { useEffect, useState } from "react";

export default function HRComment(props) {
    const [updateList, setUpdateList] = useState(false);
    const [hrComment, setHRComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleHRComment = (e) => {
        console.log(hrComment)
        const QUERY_POSTHRCOMMENT = {
            query: `mutation MyMutation {
                 addProfileComment (
                      vacancyID: ${Number(props.vacancyID)},
                      jaID: "${props.jaID}",
                      comment: "${hrComment}"
                      ) 
                    }
                `,
            variables: null,
            operationName: "MyMutation",
        };

        gqlquery(QUERY_POSTHRCOMMENT, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.addProfileComment === "SUCCESS") { 
                    setUpdateList(!updateList);
                    setHRComment("");
                }

            })
            .finally((e) => console.log("adding HR COMMENTS to database"));

        setHRComment("");
    };

    useEffect(() => {
        const QUERY_GETALLCOMMENTS = {
            query: `query MyQuery {
                getProfileComments(jaID : "${props.jaID}", vacancyID: ${Number(props.vacancyID)}) {
                    comment
                    commentedAt
                    jaID
                    pcID
                    vacancyID
                   }
                }`
        };
        gqlquery(QUERY_GETALLCOMMENTS, null)
            .then((res) => res.json())
            .then((datas) => { 
                setAllComments(datas.data?.getProfileComments);
            })
            .finally((e) => setIsLoading(false));
    }, [updateList]); 

    const date_diff_indays = function (dt1) {
        const dt2 = new Date();
        const days = Math.floor(
            (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
                Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
            (1000 * 60 * 60 * 24)
        );
        const month = Math.floor(days / 30);
        const day = days % 30;
        if (days >= 30) {
            return {
                month,
                day,
            };
        }
        return {
            days,
        };
    };

    return (
        <Container maxWidth="lg" sx={{ mx: "auto" }}>
            <Card sx={{ bgcolor: "#F2F2F2", }}>
                <Box sx={{ mb: 2, p: 2 }}>
                    <Typography sx={{ color: "gray", }}> Comment </Typography>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, },
                            display: "flex", gap: 2, alignItems: "center"
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="outlined-textarea"
                            // label="Comment"
                            placeholder="Write your comment here"
                            multiline
                            value={hrComment}
                            onChange={e => setHRComment(e.target.value)}
                            sx={{ backgroundColor: "white", flexGrow: 1 }}
                        />
                        <Button onClick={handleHRComment} variant="contained" sx={{ py: 2, px: 3, borderRadius: 2 }}>
                            Add Comment
                        </Button>
                    </Box>
                </Box>

                <hr style={{}} />
                <Box sx={{ my: 2, p: 2 }}>
                    <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
                        Previous Comments
                    </Typography>
                    {
                        allComments?.map(comment => (
                            <Box sx={{ mb: 4 }}>
                                <Typography sx={{ my: 1.5 }}>
                                    <span style={{ fontSize: "18px", fontWeight: "bold" }}> You </span>  <span style={{ color: "gray" }}>
                                        {date_diff_indays(new Date(`${comment?.commentedAt}`)).month ? (
                                            <>
                                                {date_diff_indays(new Date(`${comment?.commentedAt}`)).month}{" "}
                                                {date_diff_indays(new Date(`${comment?.commentedAt}`)).month ===
                                                    1
                                                    ? "month"
                                                    : "months"}{" "}
                                                {date_diff_indays(new Date(`${comment?.commentedAt}`)).day ? (
                                                    <>
                                                        {date_diff_indays(new Date(`${comment?.commentedAt}`)).day}{" "}
                                                        {date_diff_indays(new Date(`${comment?.commentedAt}`))
                                                            .day === 1
                                                            ? "day"
                                                            : "days"}{" "}
                                                        {"ago"}
                                                    </>
                                                ) : (
                                                    <> {"ago"}</>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {date_diff_indays(new Date(`${comment?.commentedAt}`)).days}{" "}
                                                {date_diff_indays(new Date(`${comment?.commentedAt}`)).days === 1
                                                    ? "day"
                                                    : "days"}{" "}
                                                {"ago"}
                                            </>
                                        )}
                                        {/* {comment?.commentedAt}  */}
                                    </span> <br />
                                </Typography>
                                <ReactReadMoreReadLess
                                    charLimit={200}
                                    readMoreText={"Read more"}
                                    readLessText={"Read less"}
                                    readMoreClassName="read-more-less--more"
                                    readLessClassName="read-more-less--less"
                                >
                                    {comment?.comment}
                                </ReactReadMoreReadLess>

                            </Box>
                        ))
                    }

                    {/* <Box sx={{ mb: 4 }}>
                        <Typography sx={{ mb: 1.5 }}>
                            <span style={{ fontSize: "18px", fontWeight: "bold" }}> HR Name </span>  <span style={{ color: "gray" }}>19-03-2022</span> <br />
                        </Typography> */}
                    {/* <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                            readMoreClassName="read-more-less--more"
                            readLessClassName="read-more-less--less"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat neque faucibus in dui, a. Integer sollicitudin eget nisl ac libero eu sed sollicitudin. Erat egestas malesuada dictum cursus amet. Amet cursus vel, porttitor enim. Erat egestas malesuada dictum cursus amet.
                        </ReactReadMoreReadLess> */}

                    {/* </Box> */}

                </Box>
            </Card>
        </Container>
    )
}