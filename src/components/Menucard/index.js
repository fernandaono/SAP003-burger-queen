import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, Typography, Paper} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 10,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12
    },
});

export default function Menucard(props) {
    const classes = useStyles();
    // eslint-disable-next-line
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Paper>
        <Card className={classes.root} onClick={props.handleClick}>
            <CardActionArea>
                <CardContent>
                    <Typography variant='h6' component='h2'>
                        {props.name}
                    </Typography>
                    <Typography variant='body2' component='p'>
                        R$ {props.price.toFixed(2).replace(/\d(?=(d{3})+\.)/g, '$&,').replace('.',',')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </Paper>

    );
}