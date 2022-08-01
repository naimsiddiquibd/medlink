import { Box, Button, Card, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import EditIcon from "@mui/icons-material/Edit";

const AboutUsMini = () => {
    return (
        <Box sx={{ mx: "auto", mb: 4 }} maxWidth="sm">
            <Box
                sx={{
                    bgcolor: "#E0E0E0",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    py: 2,
                    pl: 1,
                }}
            >
                <Button
                    variant="text"
                    sx={{
                        color: "#323232",
                    }}
                >
                    <ArrowBackIosNewRoundedIcon fontSize="medium" />
                </Button>
                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    About Us
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    px: 2,
                    pt: 2,
                    pb: 4,
                }}
            >
                

                <Container sx={{mb: '10px'}}>
            
            
            <Paper sx={{p: '20px', mt: '5px'}}>
                <Typography sx={{fontSize: '18px', color: '#395987', weight: '1000px'}} gutterBottom component="div">
                Heading Goes Here
                </Typography>
                <Typography sx={{fontSize: '16px', weight: '10px', lineHeight: '28px', color: '#4F4F4F', mt: '20px'}} gutterBottom component="div">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum est sed commodo cras. Eu pretium ultricies ut massa. Turpis quam tellus, faucibus ac nunc, elementum velit egestas nunc. Tortor suscipit elit id in non eu nisl tristique. Nulla commodo ut ut facilisi nunc feugiat sapien commodo. Sed mi consequat aliquam erat praesent. Sit fermentum adipiscing senectus sagittis. Erat mattis dignissim eu fringilla ipsum lacinia pharetra. Volutpat et, lorem iaculis faucibus quis quam sapien.
Libero metus metus nunc, vestibulum. Accumsan sollicitudin maecenas pulvinar ullamcorper rhoncus sed. Dignissim euismod adipiscing eu viverra sollicitudin pellentesque bibendum amet, arcu. Tempus, mattis lobortis diam, arcu. Lectus dignissim pretium congue nulla proin duis ut duis vehicula. Lectus lacinia sollicitudin ultrices ipsum pellentesque semper auctor. Amet suspendisse at nisl sit turpis. Morbi vel dis aliquam faucibus urna magna semper lorem eget. Purus proin id sit egestas adipiscing et id. Ullamcorper viverra mauris vitae nulla.
Nisl venenatis, mattis placerat sociis ipsum. Quam sed volutpat malesuada elementum. Nec vitae consectetur dignissim ipsum enim. Nam urna semper sed mauris mauris viverra leo feugiat orci. Integer pellentesque pulvinar mauris, vel nisi, tellus nunc molestie. Eu, vitae lorem suscipit neque, eu vel ac sit. Sed nulla tellus tincidunt cursus arcu quis elit. Venenatis, nam nisl sit bibendum volutpat arcu diam vel.
In libero at elit ultricies pharetra id. Congue faucibus in sit sit duis. Commodo laoreet lectus morbi sit dignissim senectus adipiscing sit fermentum. Pretium tempus duis dui phasellus imperdiet tempus, nec. Facilisi cras tincidunt pellentesque consequat. Vitae lorem suspendisse elementum quam cursus quis volutpat et tincidunt. Eget maecenas arcu sagittis arcu dictum vitae. Suspendisse euismod proin quis semper vitae pellentesque in vitae lectus. Nisl id integer nibh placerat risus. Sit sem feugiat donec purus molestie. Feugiat varius semper neque etiam. Eu, id auctor donec diam tellus id tellus convallis cursus. Sed vel mauris, natoque egestas sagittis montes. Justo, sed pellentesque eget quis bibendum fringilla nisl porttitor et. Neque, arcu senectus varius lectus tellus tristique.
Id suspendisse tristique gravida erat. Maecenas ullamcorper porttitor varius odio fringilla risus vel tellus. Sed in urna varius quam lobortis lorem sollicitudin venenatis aenean. Tincidunt auctor lobortis faucibus lorem id integer. Risus turpis metus, et, bibendum vitae blandit. Cursus gravida condimentum urna vulputate. Nulla facilisi justo vel amet. Neque, tincidunt sed est id sodales. Morbi est viverra fermentum proin.
                </Typography>
                <Typography sx={{fontSize: '18px', weight: '600px', color: '#395987', mt: '40px'}} variant="h6" gutterBottom component="div">
                Heading Goes Here
                </Typography>
                <Typography sx={{fontSize: '16px', color: '#4F4F4F', mt: '20px'}} gutterBottom component="div">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum est sed commodo cras. Eu pretium ultricies ut massa. Turpis quam tellus, faucibus ac nunc, elementum velit egestas nunc. Tortor suscipit elit id in non eu nisl tristique. Nulla commodo ut ut facilisi nunc feugiat sapien commodo. Sed mi consequat aliquam erat praesent. Sit fermentum adipiscing senectus sagittis. Erat mattis dignissim eu fringilla ipsum lacinia pharetra. Volutpat et, lorem iaculis faucibus quis quam sapien.
Libero metus metus nunc, vestibulum. Accumsan sollicitudin maecenas pulvinar ullamcorper rhoncus sed. Dignissim euismod adipiscing eu viverra sollicitudin pellentesque bibendum amet, arcu. Tempus, mattis lobortis diam, arcu. Lectus dignissim pretium congue nulla proin duis ut duis vehicula. Lectus lacinia sollicitudin ultrices ipsum pellentesque semper auctor. Amet suspendisse at nisl sit turpis. Morbi vel dis aliquam faucibus urna magna semper lorem eget. Purus proin id sit egestas adipiscing et id. Ullamcorper viverra mauris vitae nulla.
                </Typography>

                <Grid container spacing={1} sx={{p: '10px'}}>
                <Grid item xs={12}>
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9109475031933!2d77.6494563148214!3d12.913444890894139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1482cdcd9c37%3A0x9b8e07dfe1013332!2sIgnitarium%20Technology%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sbd!4v1653802064430!5m2!1sen!2sbd" width="375" height="288" style={{border: 0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                </Grid>
                <Grid item xs={12}>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                }}>
                                                        <Box>
                            <Typography sx={{fontSize: '14px', weight: '600px', color: '#395987'}} variant="h6" gutterBottom component="div">
                            Central Office
                                </Typography>
                            <Typography sx={{fontSize: '10px', weight: '400px', maxWidth: '252px', lineHeight: '15px', color: '#333333'}} gutterBottom component="div">
                            2615, 3rd Floor, 
                            27th Main Rd, 1st Sector, Kormangala, 
                            Bengaluru, Karnataka 560102
                                </Typography>
                                </Box>
                                <Box>
                            <Typography sx={{fontSize: '14px', weight: '600px', color: '#395987'}} variant="h6" gutterBottom component="div">
                            Regional Office
                                </Typography>
                            <Typography sx={{fontSize: '10px', weight: '400px', maxWidth: '252px', lineHeight: '15px', color: '#333333'}} gutterBottom component="div">
                            2615, 3rd Floor, 
                            27th Main Rd, 1st Sector, HSR Layout, 
                            Bengaluru, Karnataka 560102
                                </Typography>
                                </Box> 
                        </Box>     
                </Grid>
                </Grid>
            </Paper>
            <Grid container sx={{mt: '5px'}}>
                    
                    <Grid item xs={12} md={12}>
                    <Typography sx={{fontSize: '14px', fontWeight: 'bold', color: '#333333', mt: '20px'}} variant="h6" gutterBottom component="div">
                        Jobs by Locations
                        </Typography>
                    <Typography sx={{fontSize: '14px', weight: '100px', color: '#4F4F4F', mt: '10px'}} gutterBottom component="div">
                    Jobs in Bangalore  |  Jobs in Delhi  |  Jobs in Mumbai  |  Jobs in Chennai  |  Jobs in Hyderabad  |  Jobs in Kolkata  |  Jobs in Pune  |  Jobs in Chandigarh
                        </Typography>

                        <Typography sx={{fontSize: '14px', fontWeight: 'bold', color: '#333333', mt: '20px'}} variant="h6" gutterBottom component="div">
                        Jobs by Skill - Non IT
                        </Typography>
                        <Typography sx={{fontSize: '14px', weight: '100px', color: '#4F4F4F', mt: '10px'}} gutterBottom component="div">
                        ccounting   |  JobsBPO  |   JobsCall Center  |   JobsCivil Engineering  |   JobsContent Writing  |   JobsElectrical Engineering   |  JobsEvent Management
                        </Typography>

                        <Typography sx={{fontSize: '14px', fontWeight: 'bold', color: '#333333', mt: '20px'}} variant="h6" gutterBottom component="div">
                        Jobs by Role
                        </Typography>
                        <Typography sx={{fontSize: '14px', weight: '100px', color: '#4F4F4F', mt: '10px'}} gutterBottom component="div">
                        Air Hostess Jobs  |  Accountant Jobs  |  Assistant Professor Jobs
                        </Typography>

                        <Typography sx={{fontSize: '14px', fontWeight: 'bold', color: '#333333', mt: '20px'}} variant="h6" gutterBottom component="div">
                        International Jobs
                        </Typography>
                        <Typography sx={{fontSize: '14px', weight: '100px', color: '#4F4F4F', mt: '10px'}} gutterBottom component="div">
                        obs in Gulf  I  Jobs in Singapore  I  Jobs in Malaysia  I  Jobs in Philippines  I  Jobs in Hong Kong  I  Jobs in Vietnam  I  Jobs in Indonesia  I  Jobs in Thailand
                        </Typography>
                    </Grid>
                    </Grid>
            
            </Container>



            </Box>
        </Box>
    );
};

export default AboutUsMini;