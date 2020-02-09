/*import React from 'react';
import './index.css';
import Button from '@material-ui/core/Button';

const MenuCard = (props) => {
    return  (
        <section className='btn' onClick={props.handleClick} > 
        <Button variant="contained" color="primary">
            <p>{props.name}</p>
            <p>{props.price.toLocaleString()}</p>
        </Button>
        </section>
        
    )
}

export default MenuCard;
*/
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
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Paper>
        <Card className={classes.root} onClick={props.handleClick}>
            <CardActionArea>
                <CardContent>
                    <Typography variant='h5' component='h2'>
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