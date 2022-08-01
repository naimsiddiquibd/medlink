import React from 'react';
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';

const FAQMini = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        console.log(expanded);
    };

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
                    FAQ
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
                <Container>
     
   
        

        {expanded === "panel1" ? <Accordion sx={{backgroundColor: '#E4EEF5'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "32px", width: "32px", color: "white", padding:"9px",  borderRadius: "100px"}} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            
          >
            <Typography sx={{ width: '15%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '35px' }}>
              01
            </Typography>
            <Typography sx={{ color: '#395987', fontSize: '20px', fontWeight: 'bold', mt: '10px'  }}>Alright, but what exactly do you do?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: '50px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
            As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.
            </Typography>
          </AccordionDetails>
        </Accordion> :
                    <Accordion sx={{backgroundColor: '#ffff'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                      expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "32px", width: "32px", color: "white", padding:"9px",  borderRadius: "100px"}} />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    
                    >
                      <Typography sx={{ width: '15%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '35px' }}>
                        01
                      </Typography>
                      <Typography sx={{ color: '#395987', fontSize: '20px', fontWeight: 'bold', mt: '10px'  }}>Alright, but what exactly do you do?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ ml: '48px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
                      As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>}


                  {expanded === "panel2" ?  <Accordion sx={{backgroundColor: '#E4EEF5'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "32px", width: "32px", color: "white", padding:"9px",  borderRadius: "100px"}} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
           
          >
            <Typography sx={{ width: '15%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '35px' }}>
              02
            </Typography>
            <Typography sx={{ color: '#395987', fontSize: '20px', fontWeight: 'bold', mt: '10px'  }}>
            I don't need a brand strategist but I need help executing an upcoming campaign. Can we still work together?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: '50px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
              varius pulvinar diam eros in elit. Pellentesque convallis laoreet
              laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion> :
                     <Accordion sx={{backgroundColor: '#ffff'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                     <AccordionSummary
                       expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "32px", width: "32px", color: "white", padding:"9px",  borderRadius: "100px"}} />}
                       aria-controls="panel2bh-content"
                       id="panel2bh-header"
                  
                     >
                       <Typography sx={{ width: '15%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '35px' }}>
                         02
                       </Typography>
                       <Typography sx={{ color: '#395987', fontSize: '20px', fontWeight: 'bold', mt: '10px'  }}>
                       I don't need a brand strategist but I need help executing an upcoming campaign. Can we still work together?
                       </Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                       <Typography sx={{ ml: '48px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
                         Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                         varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                         laoreet.
                       </Typography>
                     </AccordionDetails>
                   </Accordion>}
                  

        {expanded === "panel3" ? <Accordion sx={{backgroundColor: '#E4EEF5'}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "32px", width: "32px", color: "white", padding:"9px",  borderRadius: "100px"}} />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
         
          >
          <Typography sx={{ width: '15%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '35px' }}>
              03
            </Typography>
            <Typography sx={{ color: '#395987', fontSize: '20px', fontWeight: 'bold', mt: '10px'  }}>
            Are your rates competitive?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: '50px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>:
        <Accordion sx={{backgroundColor: '#ffff'}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "32px", width: "32px", color: "white", padding:"9px",  borderRadius: "100px"}} />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
     
        >
        <Typography sx={{ width: '15%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '35px' }}>
            03
          </Typography>
          <Typography sx={{ color: '#395987', fontSize: '20px', fontWeight: 'bold', mt: '10px'  }}>
          Are your rates competitive?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '50px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
        }

{expanded === "panel4" ? <Accordion sx={{backgroundColor: '#E4EEF5'}} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "32px", width: "32px", color: "white", padding:"9px",  borderRadius: "100px"}} />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
        
          >
          <Typography sx={{ width: '15%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '35px' }}>
              04
            </Typography>
            <Typography sx={{ color: '#395987', fontSize: '20px', fontWeight: 'bold', mt: '10px'  }}>
            Are your rates competitive?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: '50px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>:
        <Accordion sx={{backgroundColor: '#ffff'}} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "32px", width: "32px", color: "white", padding:"9px",  borderRadius: "100px"}} />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
    
        >
        <Typography sx={{ width: '15%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '35px' }}>
            04
          </Typography>
          <Typography sx={{ color: '#395987', fontSize: '20px', fontWeight: 'bold', mt: '10px'  }}>
          Are your rates competitive?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '50px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
        }
     
      
        </Container>
            </Box>
        </Box>
    );
};

export default FAQMini;