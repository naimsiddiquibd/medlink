import * as React from 'react';
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Container, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";

const theme = createTheme();
const useStyles = makeStyles({
    wholecontainer: {
        backgroundColor: '#F2F2F2',
        borderRadius: '10px'
    },
    buynowgrid: {
        backgroundColor: '#828282',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    buynowtext: {
        color: 'white',
        fontWeight: 600,
        fontSize: '16px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        }
    },
});

export default function ToastTitle() {
    const classes = useStyles();

    return (
        <Container maxWidth="md" sx={{ flexGrow: 1, my: { xs: 4, sm: 8 }, mb: 8, px: 1 }} style={{ height: '60vh', }} variant='contained'>
            <Grid container className={classes.wholecontainer} style={{}}>
                <Grid xs={1}>
                    <AddCircleOutlineIcon sx={{ fontSize: '30px', ml: { xs: 0.7, sm: 3 }, mt: 2.3 }} />
                </Grid>
                <Grid sx={{ my: 1.5, ml: { xs: 0, sm: 0 }, pl: { xs: 1.4 } }} xs={9.5}>
                    <Typography sx={{ fontWeight: 700, fontSize: '16px', }}>
                        <p>Toast Title </p>
                    </Typography>
                    <Typography sx={{ fontSize: '12px', mt: 0.5 }}>
                        <p> Toast message goes here. </p>
                    </Typography>
                </Grid>
                <Grid xs={1.5} className={classes.buynowgrid}>
                    <Typography sx={{ pt: { xs: 2, sm: 2.8 }, ml: { xs: 1, sm: 2.7 }, borderRadius: 16, }}>
                        <p className={classes.buynowtext} >Buy Now</p>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}