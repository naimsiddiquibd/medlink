import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';



const FAQ = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        console.log(expanded);
    };

    return (
        <>
        <Container>
        <Typography gutterBottom component="div" sx={{color: '#395987', fontSize: '14px', mt: '15px'}}>
        Home / FAQ
      </Typography>
        <Typography variant="h6" gutterBottom component="div" sx={{color: '#395987', mt: '24px'}}>
        Frequently Asked Questions
      </Typography>
        <Box sx={{px:5, mt: '88px', mb: '123px'}}>

        {expanded === "panel1" ? <Accordion sx={{backgroundColor: '#E4EEF5'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "48px", width: "48px", color: "white", padding:"14px",  borderRadius: "100px"}} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            
          >
            <Typography sx={{ width: '7%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '45px' }}>
              01
            </Typography>
            <Typography sx={{ color: '#395987', fontSize: '24px', fontWeight: 'bold', mt: '20px'  }}>Alright, but what exactly do you do?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: '70px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
            As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.
            </Typography>
          </AccordionDetails>
        </Accordion> :
                    <Accordion sx={{backgroundColor: '#ffff'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                      expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "48px", width: "48px", color: "white", padding:"14px",  borderRadius: "100px"}} />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    
                    >
                      <Typography sx={{ width: '7%', flexShrink: 0, color: '#a0b3c9', fontWeight: 'bold', fontSize: '45px' }}>
                        01
                      </Typography>
                      <Typography sx={{ color: '#395987', fontSize: '24px', fontWeight: 'bold', mt: '20px'  }}>Alright, but what exactly do you do?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ ml: '70px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
                      As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>}


                  {expanded === "panel2" ?  <Accordion sx={{backgroundColor: '#E4EEF5'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "48px", width: "48px", color: "white", padding:"14px",  borderRadius: "100px"}} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
           
          >
            <Typography sx={{ width: '7%', flexShrink: 0, color: '#a0b3c9', fontSize: '45px', fontWeight: 'bold' }}>
              02
            </Typography>
            <Typography sx={{ color: '#395987', fontSize: '24px', fontWeight: 'bold', mt: '20px'  }}>
            I don't need a brand strategist but I need help executing an upcoming campaign. Can we still work together?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: '70px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
              varius pulvinar diam eros in elit. Pellentesque convallis laoreet
              laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion> :
                     <Accordion sx={{backgroundColor: '#ffff'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                     <AccordionSummary
                       expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "48px", width: "48px", color: "white", padding:"14px",  borderRadius: "100px"}} />}
                       aria-controls="panel2bh-content"
                       id="panel2bh-header"
                  
                     >
                       <Typography sx={{ width: '7%', flexShrink: 0, color: '#a0b3c9', fontSize: '45px', fontWeight: 'bold' }}>
                         02
                       </Typography>
                       <Typography sx={{ color: '#395987', fontSize: '24px', fontWeight: 'bold', mt: '20px'  }}>
                       I don't need a brand strategist but I need help executing an upcoming campaign. Can we still work together?
                       </Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                       <Typography sx={{ ml: '70px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
                         Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                         varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                         laoreet.
                       </Typography>
                     </AccordionDetails>
                   </Accordion>}
                  

        {expanded === "panel3" ? <Accordion sx={{backgroundColor: '#E4EEF5'}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "48px", width: "48px", color: "white", padding:"14px",  borderRadius: "100px"}} />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
         
          >
          <Typography sx={{ width: '7%', flexShrink: 0, color: '#a0b3c9', fontSize: '45px', fontWeight: 'bold' }}>
              03
            </Typography>
            <Typography sx={{ color: '#395987', fontSize: '24px', fontWeight: 'bold', mt: '20px' }}>
            Are your rates competitive?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: '70px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>:
        <Accordion sx={{backgroundColor: '#ffff'}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "48px", width: "48px", color: "white", padding:"14px",  borderRadius: "100px"}} />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
     
        >
        <Typography sx={{ width: '7%', flexShrink: 0, color: '#a0b3c9', fontSize: '45px', fontWeight: 'bold' }}>
            03
          </Typography>
          <Typography sx={{ color: '#395987', fontSize: '24px', fontWeight: 'bold', mt: '20px' }}>
          Are your rates competitive?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '70px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
        }

{expanded === "panel4" ? <Accordion sx={{backgroundColor: '#E4EEF5'}} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "48px", width: "48px", color: "white", padding:"14px",  borderRadius: "100px"}} />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
        
          >
          <Typography sx={{ width: '7%', flexShrink: 0, color: '#a0b3c9', fontSize: '45px', fontWeight: 'bold' }}>
              04
            </Typography>
            <Typography sx={{ color: '#395987', fontSize: '24px', fontWeight: 'bold', mt: '20px' }}>
            Are your rates competitive?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: '70px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>:
        <Accordion sx={{backgroundColor: '#ffff'}} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<AddIcon style={{backgroundColor: "#5A98F2", height: "48px", width: "48px", color: "white", padding:"14px",  borderRadius: "100px"}} />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
    
        >
        <Typography sx={{ width: '7%', flexShrink: 0, color: '#a0b3c9', fontSize: '45px', fontWeight: 'bold' }}>
            04
          </Typography>
          <Typography sx={{ color: '#395987', fontSize: '24px', fontWeight: 'bold', mt: '20px' }}>
          Are your rates competitive?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ ml: '70px', fontSize: '18px', fontWeight: '400px', mb: '10px', lineHeight: '36px'  }}>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
        }

        </Box>
        </Container>
        </>
    );
};

export default FAQ;